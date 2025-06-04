# @monorepo-starter/devtools

## `CLI` Usage

```bash
pnpm --filter @monorepo-starter/devtools run start apps/next-full-stack
# or Project Root (makefile)
make generate-all name=apps/next-full-stack
```

## `Component` Usage ( Next.js app router `development` mode)

`src/app/layout.tsx`

Add import top of the file
```tsx
import { DevTools } from '@monorepo-starter/devtools/devtools';
```

Add `DevTools` component to the component tree
```tsx
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body>
        ...
        {children}
+       <DevTools />
        ...
      </body>
    </html>
  );
}
```