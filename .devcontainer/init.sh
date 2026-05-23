#!/bin/bash

set -xe

sudo chown -R node:node /workspace
git config --global --add safe.directory /workspace
if [ ! -f /workspace/.env.local ]; then
    if [ -f /workspace/.env.example ]; then
        cp /workspace/.env.example /workspace/.env.local
        echo ".env.local was not found, so .env.example was copied. Update the values before starting the app."
    else
        echo "ERROR: .env.local was not found and .env.example is missing." >&2
        exit 1
    fi
fi
npm install --frozen-lockfile
if [ -f /workspace/src/prisma/schema.prisma ]; then
    npx prisma generate --schema=/workspace/src/prisma/schema.prisma
fi