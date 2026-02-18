
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

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

/**
 * Returns a Google provider instance with a randomly selected API key
 */
function getGoogleProvider() {
    if (apiKeys.length === 0) {
        throw new Error("No Google API keys found in environment variables.");
    }
    const randomKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];
    // console.log(`[Chat] Using API Key: ...${randomKey.slice(-4)}`);
    return createGoogleGenerativeAI({
        apiKey: randomKey,
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
            model: google('gemini-2.5-flash'), // 固定モデル名
            messages,
            onFinish: async ({ text }) => {
                // AIの応答完了後にDBに保存
                try {
                    console.log(`[Chat] Saving/Updating block for branch: ${branchId}`);
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
                        // Create new block (legacy behavior if needed, or if ID not provided)
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
