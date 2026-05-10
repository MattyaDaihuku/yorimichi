import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await prisma.$queryRaw<Array<{ ok: number }>>`SELECT 1 AS ok`;

    return NextResponse.json(
      {
        message: 'Hello, Supabase is available',
        ok: result[0]?.ok === 1,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      },
    );
  } catch (error) {
    console.error('[KEEPALIVE]', error);

    return NextResponse.json(
      {
        message: 'Keepalive failed',
      },
      {
        status: 500,
      },
    );
  }
}