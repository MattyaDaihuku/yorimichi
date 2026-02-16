# ==============================================================================
# GitChat 開発用 Dockerfile
# ==============================================================================
# 責務: Node.js 実行環境の提供
# - ソースコードはバインドマウントで同期
# - node_modules / .next は名前付きボリュームでコンテナ内にのみ保持
# ==============================================================================

FROM node:22-alpine

WORKDIR /app

# エントリポイントを Dockerfile 内に定義
# - npm install: 依存関係の同期 (差分がなければ高速スキップ)
# - prisma generate: スキーマがあればクライアント生成
# - exec "$@": CMD で渡されたコマンドを実行
RUN printf '#!/bin/sh\n\
    set -e\n\
    echo "📦 依存関係をインストール中..."\n\
    npm install\n\
    if [ -f prisma/schema.prisma ]; then\n\
    echo "🔧 Prisma クライアントを生成中..."\n\
    npx prisma generate\n\
    fi\n\
    echo "🎯 開発サーバーを起動: $*"\n\
    exec "$@"\n' > /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["entrypoint.sh"]
CMD ["npm", "run", "dev"]
