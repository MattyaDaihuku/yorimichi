#!/bin/bash

set -xe

sudo chown -R node:node /workspace
git config --global --add safe.directory /workspace
npm install --frozen-lockfile
if [ -f src/prisma/schema.prisma ]; 
    then npx prisma generate --schema=src/prisma/schema.prisma; 
fi