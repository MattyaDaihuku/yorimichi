# ==============================================================================
# GitChat 開発用 Dockerfile
# ==============================================================================
# 責務: Node.js 実行環境の提供
# ==============================================================================

FROM mcr.microsoft.com/devcontainers/javascript-node:22

# コンテナ起動時に実行するコマンド
# 1. npm install       : 依存関係をインストール・同期
# 2. prisma generate   : DB用クライアント生成 (ファイルがある場合のみ)
# 3. npm run dev       : Next.js 開発サーバー起動
# CMD sh -c 'npm install && \
#    if [ -f src/prisma/schema.prisma ]; then npx prisma generate --schema=src/prisma/schema.prisma; fi && \
#    sleep infinity'
