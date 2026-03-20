import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth-utils';
import { encryptApiKey, decryptApiKey } from '@/lib/encryption';
import { z } from 'zod';

const postSchema = z.object({
  openai: z.string().optional(),
  anthropic: z.string().optional(),
  google: z.string().optional(),
});

export async function GET(req: Request) {
    try {
        const userId = await getAuthUserId(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const keys = await prisma.userApiKey.findMany({
            where: { user_id: userId }
        });

        const decryptedKeys: Record<string, string> = {
            openai: "",
            anthropic: "",
            google: ""
        };

        for (const k of keys) {
            try {
                const plaintext = decryptApiKey(k.encrypted_key, k.iv, k.auth_tag);
                if (k.provider === 'openai') decryptedKeys.openai = plaintext;
                if (k.provider === 'anthropic') decryptedKeys.anthropic = plaintext;
                if (k.provider === 'google') decryptedKeys.google = plaintext;
            } catch (err) {
                console.error(`Failed to decrypt key for provider ${k.provider}`, err);
            }
        }

        return NextResponse.json({ keys: decryptedKeys });
    } catch(err) {
        console.error("[GET /api/user/apikeys]", err);
        return NextResponse.json({ error: "Failed to fetch API keys" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const userId = await getAuthUserId(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const validation = postSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: "Invalid request", details: validation.error.format() }, { status: 400 });
        }

        const { openai, anthropic, google } = validation.data;

        // Perform upserts in a single transaction
        await prisma.$transaction(async (tx) => {
            const processKey = async (provider: string, keyVal?: string) => {
                if (keyVal === undefined) return; // skip if nothing was sent
                
                if (keyVal.trim() === '') {
                    // Empty string signifies "remove this key"
                    await tx.userApiKey.deleteMany({
                        where: { user_id: userId, provider }
                    });
                    return;
                }

                const { encrypted_key, iv, auth_tag } = encryptApiKey(keyVal);
                
                // use deleteMany to clear existing, then create, or use upsert
                // Since user_id+provider is unique, we can use upsert safely
                await tx.userApiKey.upsert({
                    where: {
                        user_id_provider: {
                            user_id: userId,
                            provider: provider,
                        }
                    },
                    update: { encrypted_key, iv, auth_tag },
                    create: {
                        user_id: userId,
                        provider,
                        encrypted_key,
                        iv,
                        auth_tag,
                    }
                });
            };

            await processKey('openai', openai);
            await processKey('anthropic', anthropic);
            await processKey('google', google);
        });

        return NextResponse.json({ success: true });
    } catch(err) {
        console.error("[POST /api/user/apikeys]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
