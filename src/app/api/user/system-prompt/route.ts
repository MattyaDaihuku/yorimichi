import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth-utils';

const postSchema = z.object({
    systemPrompt: z.string().max(4000),
    enabled: z.boolean().optional(),
});

export async function GET(req: Request) {
    try {
        const userId = await getAuthUserId(req);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await prisma.users.findUnique({
            where: { user_id: userId },
            select: { system_prompt: true, system_prompt_enabled: true },
        });

        return NextResponse.json({
            systemPrompt: data?.system_prompt ?? '',
            enabled: data?.system_prompt_enabled ?? false,
        });
    } catch (err) {
        console.error('[GET /api/user/system-prompt]', err);
        return NextResponse.json({ error: 'Failed to fetch system prompt' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const userId = await getAuthUserId(req);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const validation = postSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid request', details: validation.error.format() },
                { status: 400 }
            );
        }

        const { systemPrompt, enabled } = validation.data;
        const trimmedPrompt = systemPrompt.trim();

        if (trimmedPrompt.length === 0) {
            await prisma.users.update({
                where: { user_id: userId },
                data: {
                    system_prompt: null,
                    system_prompt_enabled: false,
                },
            });
            return NextResponse.json({ success: true, systemPrompt: '', enabled: false });
        }

        const updatedUser = await prisma.users.update({
            where: { user_id: userId },
            data: {
                system_prompt: trimmedPrompt,
                system_prompt_enabled: enabled ?? true,
            },
            select: {
                system_prompt: true,
                system_prompt_enabled: true,
            },
        });

        return NextResponse.json({
            success: true,
            systemPrompt: updatedUser.system_prompt,
            enabled: updatedUser.system_prompt_enabled,
        });
    } catch (err) {
        console.error('[POST /api/user/system-prompt]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
