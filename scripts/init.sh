#!/bin/bash

# ------------------------------------------------------------
# init pnpm
# ------------------------------------------------------------
pnpm install

# ------------------------------------------------------------
# init hono-api
# ------------------------------------------------------------
if [ -d "apps/hono-api" ]; then
  cd apps/hono-api && cp .env.example .env
  rm -rf database drizzle
  mkdir -p database drizzle
  pnpm db:generate && pnpm db:migrate
  cd ../..
fi

# ------------------------------------------------------------
# init next-full-stack
# ------------------------------------------------------------
if [ -d "apps/next-full-stack" ]; then
  cd apps/next-full-stack && cp .env.example .env

  sed -i '' "s|^ACCESS_TOKEN_SECRET=.*|ACCESS_TOKEN_SECRET=$(pnpx nanoid -s 32)|" .env
  sed -i '' "s|^REFRESH_TOKEN_SECRET=.*|REFRESH_TOKEN_SECRET=$(pnpx nanoid -s 32)|" .env

  VAPID_KEYS=$(pnpx web-push generate-vapid-keys --json)
  VAPID_PUBLIC=$(jq -r '.publicKey' <<< "$VAPID_KEYS")
  VAPID_PRIVATE=$(jq -r '.privateKey' <<< "$VAPID_KEYS")

  sed -i '' "s|^NEXT_PUBLIC_VAPID_PUBLIC_KEY=.*|NEXT_PUBLIC_VAPID_PUBLIC_KEY=$VAPID_PUBLIC|" .env
  sed -i '' "s|^NEXT_PUBLIC_VAPID_PRIVATE_KEY=.*|NEXT_PUBLIC_VAPID_PRIVATE_KEY=$VAPID_PRIVATE|" .env

  rm -rf database drizzle
  mkdir -p database drizzle
  pnpm db:generate && pnpm db:migrate

  cd ../..
fi

# ------------------------------------------------------------
# init next-ready-stack
# ------------------------------------------------------------
if [ -d "apps/next-ready-stack" ]; then
  cd apps/next-ready-stack && cp .env.example .env

  sed -i '' "s|^ACCESS_TOKEN_SECRET=.*|ACCESS_TOKEN_SECRET=$(pnpx nanoid -s 32)|" .env
  sed -i '' "s|^REFRESH_TOKEN_SECRET=.*|REFRESH_TOKEN_SECRET=$(pnpx nanoid -s 32)|" .env

  VAPID_KEYS=$(pnpx web-push generate-vapid-keys --json)
  VAPID_PUBLIC=$(jq -r '.publicKey' <<< "$VAPID_KEYS")
  VAPID_PRIVATE=$(jq -r '.privateKey' <<< "$VAPID_KEYS")

  sed -i '' "s|^NEXT_PUBLIC_VAPID_PUBLIC_KEY=.*|NEXT_PUBLIC_VAPID_PUBLIC_KEY=$VAPID_PUBLIC|" .env
  sed -i '' "s|^NEXT_PUBLIC_VAPID_PRIVATE_KEY=.*|NEXT_PUBLIC_VAPID_PRIVATE_KEY=$VAPID_PRIVATE|" .env

  cd ../..
fi

# ------------------------------------------------------------
# build 
# ------------------------------------------------------------
pnpm --filter @monorepo-starter/utils run build
