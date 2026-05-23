#!/bin/bash

set -xe

sudo chown -R node:node /workspace
sudo apt-get update
sudo apt-get -y install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb
git config --global --add safe.directory /workspace
if [ -f /workspace/package-lock.json ]; then
    npm ci
else
    npm install
fi

if [ -f /workspace/src/prisma/schema.prisma ]; then
    npx prisma generate --schema=/workspace/src/prisma/schema.prisma
fi