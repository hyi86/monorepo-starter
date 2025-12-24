## 🚀 Getting Started

각각의 서비스에서,

```bash
pnpm add --workspace @monorepo-starter/shared
```

**1. Update `tsconfig.json`.**

```diff
{
  "compilerOptions": {
    ...
    "paths": {
      ...
+     "@monorepo-starter/shared/*": ["../../packages/shared/src/*"]
    }
  },
  ...
}
```

**2. Update `next.config.ts`.**

```diff
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  ...
+ transpilePackages: ['@monorepo-starter/shared'],
};

export default nextConfig;
```
