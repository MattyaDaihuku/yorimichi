
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { ACTIVE_MODEL } from './ai-active-model';

export type ChatMessage = {
    role: 'user' | 'assistant' | 'system';
    content: string;
};

// Error Types
export class RateLimitError extends Error {
    public isRateLimitError = true;
    constructor(public limitType: 'DAILY' | 'MINUTE') {
        super(`Rate limit exceeded: ${limitType}`);
        this.name = 'RateLimitError';
    }
}

// ... (apiKeys, MODEL_PRIORITY, state, getGoogleProvider, rotateApiKey, rotateModel) ...
// The tool works best with contiguous blocks. I will replace the class and then edit the function separately if needed,
// or I can replace the whole file if I'm careful.
// Let's replace the class definition first.

// Wait, replace_file_content needs contiguous block. I cannot replace scattered parts.
// I'll update the class definition first.


// API Key Rotation Logic (Supports up to 20 keys)
const apiKeys = [
    process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    // Add keys _2 through _20
    ...Array.from({ length: 19 }, (_, i) => process.env[`GOOGLE_GENERATIVE_AI_API_KEY_${i + 2}`])
].filter(Boolean) as string[];

// Model Priority List (Fallback order)
const MODEL_PRIORITY = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-3-flash-preview",
    "gemma-3-27b-it"
];

// State (Module-level, persists in memory for server instance)
let currentKeyIndex = 0;
// Initialize with ACTIVE_MODEL, fallback to first in priority if not found
let currentModel = ACTIVE_MODEL;

function normalizeAiError(error: unknown): { status: number; message: string } {
    const defaultMessage = "AI応答の取得に失敗しました。しばらく時間をおいて再度お試しください。";

    if (!error || typeof error !== "object") {
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
        (typeof maybe.cause === "object" && maybe.cause
            ? (maybe.cause as { status?: number; statusCode?: number }).status ??
              (maybe.cause as { status?: number; statusCode?: number }).statusCode
            : undefined);

    const message = String(maybe.message ?? "").toLowerCase();
    const isRateLimited =
        status === 429 ||
        message.includes("429") ||
        message.includes("rate limit") ||
        message.includes("quota") ||
        message.includes("resource exhausted");

    if (isRateLimited) {
        return {
            status: 429,
            message: "利用が集中しています。しばらく時間をおいて再度お試しください。",
        };
    }

    return {
        status: typeof status === "number" ? status : 500,
        message: defaultMessage,
    };
}

/**
 * Returns a Google provider instance with the current API key
 */
function getGoogleProvider() {
    if (apiKeys.length === 0) {
        throw new Error("No Google API keys found in environment variables.");
    }
    const selectedKey = apiKeys[currentKeyIndex];
    return createGoogleGenerativeAI({
        apiKey: selectedKey,
    });
}

/**
 * Rotate the API Key to the next available one.
 */
function rotateApiKey() {
    const previousIndex = currentKeyIndex;
    currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
    console.log(`[Chat] Rotated API Key from index ${previousIndex} to ${currentKeyIndex}`);
}

/**
 * Rotate the Model to the next priority.
 */
function rotateModel() {
    let currentIndex = MODEL_PRIORITY.indexOf(currentModel);
    if (currentIndex === -1) {
        // Current model not in priority list, fallback to first
        currentModel = MODEL_PRIORITY[0];
        console.log(`[Chat] Unknown model ${ACTIVE_MODEL}, falling back to ${currentModel}`);
        return;
    }

    if (currentIndex < MODEL_PRIORITY.length - 1) {
        const previousModel = currentModel;
        currentModel = MODEL_PRIORITY[currentIndex + 1];
        console.log(`[Chat] Rotated Model from ${previousModel} to ${currentModel}`);
    } else {
        // Wrap back to first model? Or stay on last?
        // User asked to prioritize from top to bottom. If all fail, maybe wrap to top?
        // Let's wrap to top to allow continuous retry if quota resets.
        currentModel = MODEL_PRIORITY[0];
        console.log(`[Chat] Rotated Model back to start: ${currentModel}`);
    }
}

/**
 * Geminiに問い合わせてストリームを返し、完了後にBlockに保存する共通関数
 */
export async function processChatInteraction(
    branchId: string,
    messages: ChatMessage[],
    blockId?: string // Optional block ID for update
) {
    try {
        const lastUserMessage = messages[messages.length - 1];
        if (lastUserMessage?.role !== 'user') {
            console.error("Last message must be from user");
        }

        const google = getGoogleProvider();

        // Attempt to call the API
        // If it fails with Rate Limit, we throw RateLimitError
        // The calling route should catch it and return 429

        try {


            const result = streamText({
                model: google(currentModel), // Use current dynamic model
                messages,
                maxRetries: 0,
                onFinish: async ({ text }) => {
                    // AIの応答完了後にDBに保存
                    try {
                        console.log(`[Chat] Saving block for branch: ${branchId} with model: ${currentModel}`);

                        if (blockId) {
                            // Update existing block or insert if missing (upsert)
                            await prisma.block.upsert({
                                where: { block_id: blockId },
                                update: {
                                    ai_content: text,
                                },
                                create: {
                                    block_id: blockId,
                                    branch_id: branchId,
                                    user_content: lastUserMessage.content,
                                    ai_content: text
                                }
                            });
                        } else {
                            // Fallback create
                            await prisma.block.create({
                                data: {
                                    branch_id: branchId,
                                    user_content: lastUserMessage.content,
                                    ai_content: text,
                                }
                            });
                        }
                    } catch (dbError) {
                        console.error("Failed to save block:", dbError);
                    }
                },
            });

            // @ts-ignore
            return result.toTextStreamResponse();

        } catch (streamError: any) {
            const errorMessage = streamError?.message || JSON.stringify(streamError);
            const isRateLimit = errorMessage.includes('429') || errorMessage.includes('Resource has been exhausted');

            if (isRateLimit) {
                console.warn(`[Chat] Rate Limit Encountered. Key Index: ${currentKeyIndex}, Model: ${currentModel}`);

                // Determine logic for rotation
                // Always rotate key first
                const oldKeyIndex = currentKeyIndex;
                rotateApiKey();

                // If we wrapped around keys (index went from N to 0), consider rotating model
                if (currentKeyIndex === 0 && oldKeyIndex === apiKeys.length - 1) {
                    rotateModel();
                } else if (apiKeys.length === 1) {
                    // Only 1 key available, so must rotate model immediately
                    rotateModel();
                }

                // Identify if it's Daily or Minute
                const isDaily = errorMessage.toLowerCase().includes('quota') || errorMessage.toLowerCase().includes('daily');
                const limitType = isDaily ? 'DAILY' : 'MINUTE';

                throw new RateLimitError(limitType);
            }

            throw streamError;
        }

    } catch (error: any) {
        if (error instanceof RateLimitError || error?.isRateLimitError) {
            throw error; // Re-throw for route handler
        }
        console.error("[ProcessChatInteraction]", error);

        if (blockId) {
            try {
                await prisma.block.deleteMany({ where: { block_id: blockId } });
            } catch (deleteError) {
                console.error("[ProcessChatInteraction][CleanupFailed]", deleteError);
            }
        }

        const normalized = normalizeAiError(error);
        return NextResponse.json({ error: normalized.message }, { status: normalized.status });
    }
}
