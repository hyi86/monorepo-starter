#!/bin/bash

API="hono-api"
WEB="next-ready-stack"

# ------------------------------------------------------------
# init api
# ------------------------------------------------------------
cd apps/$API && cp .env.example .env
rm -rf database/*.db && rm -rf drizzle/*
pnpm db:generate && pnpm db:migrate

# to root
cd ../..

# ------------------------------------------------------------
# init web
# ------------------------------------------------------------
cd apps/$WEB && cp .env.example .env

sed -i '' "s|^ACCESS_TOKEN_SECRET=.*|ACCESS_TOKEN_SECRET=$(pnpx nanoid -s 32)|" .env
sed -i '' "s|^REFRESH_TOKEN_SECRET=.*|REFRESH_TOKEN_SECRET=$(pnpx nanoid -s 32)|" .env

VAPID_KEYS=$(pnpx web-push generate-vapid-keys --json)
VAPID_PUBLIC=$(jq -r '.publicKey' <<< "$VAPID_KEYS")
VAPID_PRIVATE=$(jq -r '.privateKey' <<< "$VAPID_KEYS")

sed -i '' "s|^NEXT_PUBLIC_VAPID_PUBLIC_KEY=.*|NEXT_PUBLIC_VAPID_PUBLIC_KEY=$VAPID_PUBLIC|" .env
sed -i '' "s|^NEXT_PUBLIC_VAPID_PRIVATE_KEY=.*|NEXT_PUBLIC_VAPID_PRIVATE_KEY=$VAPID_PRIVATE|" .env

rm -rf database/*.db && rm -rf drizzle/*
pnpm db:generate && pnpm db:migrate
