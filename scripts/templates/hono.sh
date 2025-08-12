#!/bin/bash
source "$(dirname "${BASH_SOURCE[0]}")/../ui-utils.sh"

# ------------------------------------------------------------
# create hono based api
# ------------------------------------------------------------
cd apps
pnpm create hono@latest --pm=pnpm --template=nodejs --install $INPUT
cd $INPUT

pnpm pkg set scripts.check-types="tsc --noEmit"
pnpm pkg set devDependencies.@types/node="catalog:"
pnpm pkg set devDependencies.typescript="catalog:"
pnpm install

pnpm add --workspace -D @monorepo-starter/eslint-config @monorepo-starter/typescript-config

echo "$(color.success "Created $INPUT")"
echo "$(color.magenta "run: cd apps/$INPUT && pnpm dev")"
