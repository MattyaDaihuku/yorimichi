
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { ACTIVE_MODEL } from './ai-active-model';

export type ChatMessage = {
    role: 'user' | 'assistant' | 'system';
    content: string;
};

// API Key Rotation Logic (Supports up to 20 keys)
const apiKeys = [
    process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    // Add keys _2 through _20
    ...Array.from({ length: 19 }, (_, i) => process.env[`GOOGLE_GENERATIVE_AI_API_KEY_${i + 2}`])
].filter(Boolean) as string[];

// API Key Rotation State (Sequential)
let currentKeyIndex = 0;

/**
 * Returns a Google provider instance with a sequentially selected API key
 */
function getGoogleProvider() {
    if (apiKeys.length === 0) {
        throw new Error("No Google API keys found in environment variables.");
    }

    // Select key sequentially
    const selectedKey = apiKeys[currentKeyIndex];

    // Increment and wrap around
    currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;

    return createGoogleGenerativeAI({
        apiKey: selectedKey,
    });
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

        const result = streamText({
            model: google(ACTIVE_MODEL),
            messages,
            onFinish: async ({ text }) => {
                // AIの応答完了後にDBに保存
                try {
                    console.log(`[Chat] Saving/Updating block for branch: ${branchId} with model: ${ACTIVE_MODEL}`);
                    if (blockId) {
                        // Update existing block
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
                        // Create new block
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

    } catch (error) {
        console.error("[ProcessChatInteraction]", error);
        return new NextResponse("Internal AI Error", { status: 500 });
    }
}
