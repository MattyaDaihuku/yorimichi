import { PrismaClient } from '../generated/prisma/client';

import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('テストデータの投入を開始します...');

  // 1. ユーザーの作成 (モデル名は小文字の 'users')
  const user = await prisma.users.create({
    data: {
      name: 'テスト太郎',
      email: 'test@example.com',
    },
  });

  // 2. チャットリストの作成
  const chat = await prisma.chatlist.create({
    data: {
      user_id: user.user_id,
      chat_title: 'Prismaについての相談',
      is_pinned: true,
    },
  });

  // 3. メインブランチの作成
  const mainBranch = await prisma.branches.create({
    data: {
      chat_id: chat.chat_id,
      branch_title: 'メインスレッド',
      status: 'active',
    },
  });

  // 4. チャットリストにメインブランチを紐付け (循環参照の解決)
  await prisma.chatlist.update({
    where: { chat_id: chat.chat_id },
    data: { main_branch_id: mainBranch.branch_id },
  });

  // 5. 会話ブロックの作成
  await prisma.block.create({
    data: {
      branch_id: mainBranch.branch_id,
      user_content: 'Prismaでテストデータを入れる方法は？',
      ai_content: 'seed.tsを作成して実行するのが一般的です。',
    },
  });

  console.log('データの投入が完了しました！');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());