import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { ACTIVE_MODEL, type AiModel } from './ai-active-model';

export type ChatMessage = {
    role: 'user' | 'assistant' | 'system';
    content: string;
};

export class RateLimitError extends Error {
    public isRateLimitError = true;
    constructor(public limitType: 'DAILY' | 'MINUTE') {
        super(`Rate limit exceeded: ${limitType}`);
        this.name = 'RateLimitError';
    }
}

const apiKeys = [
    process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    ...Array.from({ length: 19 }, (_, i) => process.env[`GOOGLE_GENERATIVE_AI_API_KEY_${i + 2}`]),
].filter(Boolean) as string[];

let currentKeyIndex = 0;

function normalizeAiError(error: unknown): { status: number; message: string } {
    const defaultMessage = 'AI応答の取得に失敗しました。しばらく時間をおいて再度お試しください。';

    if (!error || typeof error !== 'object') {
        return { status: 500, message: defaultMessage };
    }

    const maybe = error as {
        status?: number;
        statusCode?: number;
        message?: string;
        cause?: unknown;
    };

    const status =
        maybe.status ??
        maybe.statusCode ??
        (typeof maybe.cause === 'object' && maybe.cause
            ? (maybe.cause as { status?: number; statusCode?: number }).status ??
              (maybe.cause as { status?: number; statusCode?: number }).statusCode
            : undefined);

    const message = String(maybe.message ?? '').toLowerCase();
    const isRateLimited =
        status === 429 ||
        message.includes('429') ||
        message.includes('rate limit') ||
        message.includes('quota') ||
        message.includes('resource exhausted');

    if (isRateLimited) {
        return {
            status: 429,
            message: '利用が集中しています。しばらく時間をおいて再度お試しください。',
        };
    }

    return {
        status: typeof status === 'number' ? status : 500,
        message: defaultMessage,
    };
}

function getGoogleProvider() {
    if (apiKeys.length === 0) {
        throw new Error('No Google API keys found in environment variables.');
    }

    const selectedKey = apiKeys[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;

    return createGoogleGenerativeAI({ apiKey: selectedKey });
}

export async function processChatInteraction(
    branchId: string,
    messages: ChatMessage[],
    blockId?: string,
    model: AiModel = ACTIVE_MODEL
) {
    try {
        const lastUserMessage = messages[messages.length - 1];
        if (lastUserMessage?.role !== 'user') {
            console.error('Last message must be from user');
        }

        const google = getGoogleProvider();

        let cancelled = false;

        const result = streamText({
            model: google(model),
            messages,
            onFinish: async ({ text, finishReason }) => {
                try {
                    // If cancelled by user, don't touch the DB — partial save is already handled in cancel()
                    if (cancelled) {
                        console.log(`[Chat] Skipping onFinish for cancelled block: ${blockId}`);
                        return;
                    }

                    if (!text.trim().length || finishReason === 'error') {
                        if (blockId) {
                            await prisma.block.deleteMany({ where: { block_id: blockId } });
                        }
                        return;
                    }

                    console.log(`[Chat] Saving/Updating block for branch: ${branchId} with model: ${model}`);
                    if (blockId) {
                        await prisma.block.upsert({
                            where: { block_id: blockId },
                            update: { ai_content: text },
                            create: {
                                block_id: blockId,
                                branch_id: branchId,
                                user_content: lastUserMessage.content,
                                ai_content: text,
                            },
                        });
                    } else {
                        await prisma.block.create({
                            data: {
                                branch_id: branchId,
                                user_content: lastUserMessage.content,
                                ai_content: text,
                            },
                        });
                    }
                } catch (dbError) {
                    console.error('Failed to save block:', dbError);
                }
            },
        });

        const encoder = new TextEncoder();
        let accText = '';

        const stream = new ReadableStream<Uint8Array>({
            async start(controller) {
                try {
                    for await (const part of result.fullStream) {
                        if (part.type === 'text-delta') {
                            accText += part.text;
                            controller.enqueue(encoder.encode(part.text));
                            continue;
                        }

                        if (part.type === 'error') {
                            const normalized = normalizeAiError(part.error);
                            controller.enqueue(encoder.encode(`[[ERROR:${normalized.status}]]`));
                        }
                    }
                } catch (streamError) {
                    const normalized = normalizeAiError(streamError);
                    controller.enqueue(encoder.encode(`[[ERROR:${normalized.status}]]`));
                } finally {
                    controller.close();
                }
            },
            async cancel() {
                // Client disconnected (user pressed Stop button)
                cancelled = true;
                console.log(`[Chat] Client disconnected for block: ${blockId}`);
                try {
                    if (blockId && accText.trim().length > 0) {
                        console.log(`[Chat] Saving partial response for block: ${blockId}`);
                        await prisma.block.upsert({
                            where: { block_id: blockId },
                            update: { ai_content: accText },
                            create: {
                                block_id: blockId,
                                branch_id: branchId,
                                user_content: lastUserMessage?.content ?? '',
                                ai_content: accText,
                            },
                        });
                    }
                    // If accText is empty, keep the block as-is (user prompt with empty ai_content)
                } catch (cancelError) {
                    console.error('[Chat] Failed to save partial response:', cancelError);
                }
            },
        });

        return new Response(stream, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
            },
        });
    } catch (error) {
        console.error('[ProcessChatInteraction]', error);

        if (blockId) {
            try {
                await prisma.block.deleteMany({ where: { block_id: blockId } });
            } catch (deleteError) {
                console.error('[ProcessChatInteraction][CleanupFailed]', deleteError);
            }
        }

        const normalized = normalizeAiError(error);
        return NextResponse.json({ error: normalized.message }, { status: normalized.status });
    }
}
