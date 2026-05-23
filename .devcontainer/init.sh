#!/bin/bash

set -xe

sudo chown -R node:node /workspace
git config --global --add safe.directory /workspace
npm install --frozen-lockfile
if [ -f /workspace/src/prisma/schema.prisma ]; then
    npx prisma generate --schema=/workspace/src/prisma/schema.prisma
fi