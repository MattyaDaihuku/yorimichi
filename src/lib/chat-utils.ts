import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { ACTIVE_MODEL, type AiModel } from './ai-active-model';

type ApiKeys = {
    google?: string;
    openai?: string;
    anthropic?: string;
};

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

    if (message.includes('api_key_not_found')) {
        return {
            status: 400,
            message: 'APIキーが設定されていません。設定画面からAPIキーを登録してください。',
        };
    }

    if (status === 401 || message.includes('unauthorized') || message.includes('invalid api key')) {
        return {
            status: 401,
            message: 'APIキーが正しくないか、無効になっています。設定画面から正しいAPIキーを再登録してください。',
        };
    }

    if (status === 403 || message.includes('forbidden') || message.includes('permission denied')) {
        return {
            status: 403,
            message: 'このモデルを利用する権限がありません（無料枠の制限やAPI側の設定を確認してください）。',
        };
    }

    if (status === 404 || message.includes('model not found')) {
        return {
            status: 404,
            message: '指定されたモデルは存在しないか、現在プロバイダ側で提供されていません。',
        };
    }

    return {
        status: typeof status === 'number' ? status : 500,
        message: defaultMessage,
    };
}

function getProviderAndModel(model: AiModel, keys?: ApiKeys) {
    if (model.startsWith('gpt-')) {
        const apiKey = keys?.openai;
        if (!apiKey) {
            throw new Error('API_KEY_NOT_FOUND: OpenAI APIキーが設定されていません。設定画面から登録してください。');
        }
        return createOpenAI({ apiKey })(model);
    }
    
    if (model.startsWith('claude-')) {
        const apiKey = keys?.anthropic;
        if (!apiKey) {
            throw new Error('API_KEY_NOT_FOUND: Anthropic APIキーが設定されていません。設定画面から登録してください。');
        }
        return createAnthropic({ apiKey })(model);
    }

    // Default to Google
    const apiKey = keys?.google;
    if (!apiKey) {
        throw new Error('API_KEY_NOT_FOUND: Google APIキーが設定されていません。設定画面から登録してください。');
    }
    return createGoogleGenerativeAI({ apiKey })(model);
}

export async function processChatInteraction(
    branchId: string,
    messages: ChatMessage[],
    blockId?: string,
    model: AiModel = ACTIVE_MODEL,
    apiKeys?: ApiKeys
) {
    try {
        const lastUserMessage = messages[messages.length - 1];
        if (lastUserMessage?.role !== 'user') {
            console.error('Last message must be from user');
        }

        const providerModel = getProviderAndModel(model, apiKeys);

        let cancelled = false;

        const result = streamText({
            model: providerModel,
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
                            update: { ai_content: accText, is_stopped: true },
                            create: {
                                block_id: blockId,
                                branch_id: branchId,
                                user_content: lastUserMessage?.content ?? '',
                                ai_content: accText,
                                is_stopped: true,
                            },
                        });
                    } else if (blockId) {
                        // No AI content yet — mark as stopped with empty ai_content
                        await prisma.block.update({
                            where: { block_id: blockId },
                            data: { is_stopped: true },
                        });
                    }
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
        if (error instanceof Error && error.message.includes('API_KEY_NOT_FOUND')) {
            console.warn('[ProcessChatInteraction] API Key is missing. Returning 400.');
        } else {
            console.error('[ProcessChatInteraction]', error);
        }

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
