# `@monorepo-starter/eslint-config`

각 워크스페이스에서 사용하는 eslint 설정을 모아둔 패키지 입니다.

## Getting Started

워크스페이스의 유형별로 사용하는 설정 파일이 다릅니다.

| 워크스페이스 유형         | 설정 파일명          |
| ------------------------- | -------------------- |
| Node.js based apps        | `base.js`            |
| React based frontend apps | `react-internal.js`  |
| Next.js based apps        | `next.js`            |
| Next.js Extended apps     | `next-extend.js`     |

먼저, 각 워크스페이스에서 패키지를 설치 합니다.

```bash
pnpm add -D @monorepo-starter/eslint-config
cd apps/$PROJECT_NAME
```

### base.js

node.js 를 기반으로 하는 워크스페이스에서 사용하는 설정 파일 입니다.  
일반적으로 CLI 프로그램, 웹서버 등에 사용됩니다.

> ⚠️ JSX 사용 시에는 `react-internal.js` 를 사용해야 합니다

```bash
touch eslint.config.mjs
```

```js
import { config } from '@monorepo-starter/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default config;
```

### react-internal.js

react 기반, 또는 JSX 를 사용하는 워크스페이스에서 사용하는 설정 파일 입니다.  
주로 기본 React CSR 기반, react router, tanstack router 등을 사용하는 워크스페이스에서도 사용됩니다.

```bash
touch eslint.config.mjs
```

```js
import { config } from '@monorepo-starter/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default config;
```

### next.js

next.js 기본

```bash
touch eslint.config.mjs
```

```js
import { config } from '@monorepo-starter/eslint-config/next';

/** @type {import("eslint").Linter.Config} */
export default config;
```

### next-extend.js

next.js 확장

```bash
touch eslint.config.mjs
```

```js
import { config } from '@monorepo-starter/eslint-config/next-extend';

/** @type {import("eslint").Linter.Config} */
export default config;
```