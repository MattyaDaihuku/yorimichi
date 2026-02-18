
import { PrismaClient } from '@/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool as NeonPool } from '@neondatabase/serverless';

const connectionString = `${process.env.DATABASE_URL}`;

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    const pool = new NeonPool({ connectionString });
    const adapter = new PrismaNeon(pool);
    prisma = new PrismaClient({ adapter });
} else {
    if (!globalForPrisma.prisma) {
        const pool = new Pool({ connectionString });
        const adapter = new PrismaPg(pool);
        globalForPrisma.prisma = new PrismaClient({ adapter });
    }
    prisma = globalForPrisma.prisma;
}

export default prisma;
