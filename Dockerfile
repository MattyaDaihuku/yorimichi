# ==============================================================================
# GitChat 開発用 Dockerfile
# ==============================================================================
# 責務: Node.js 実行環境の提供
# ==============================================================================

FROM node:22-alpine

WORKDIR /app

EXPOSE 3000

# コンテナ起動時に実行するコマンド
# 1. npm install       : 依存関係をインストール・同期
# 2. prisma generate   : DB用クライアント生成 (ファイルがある場合のみ)
# 3. npm run dev       : Next.js 開発サーバー起動
CMD sh -c 'npm install && \
    if [ -f prisma/schema.prisma ]; then npx prisma generate; fi && \
    sleep infinity'
