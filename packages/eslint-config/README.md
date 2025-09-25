# `@monorepo-starter/eslint-config`

각 워크스페이스에서 사용하는 eslint 설정을 모아둔 패키지 입니다.

## Getting Started

워크스페이스의 유형별로 사용하는 설정 파일이 다릅니다.

| 워크스페이스 유형         | 설정 파일명          |
| ------------------------- | -------------------- |
| Node.js based apps        | `base.js`            |
| React based frontend apps | `react-internal.js`  |
| Next.js based apps        | `next.js`            |
| Next.js + FSD             | `next-fsd.js`        |

각 설정파일은 상속 관계를 가지고 있습니다.

`base.js` -> `react-internal.js` -> `next.js` -> `next-fsd.js`

먼저, 각 워크스페이스에서 패키지를 설치 합니다.

```bash
pnpm add -D @monorepo-starter/eslint-config
```

### base.js

node.js 를 기반으로 하는 워크스페이스에서 사용하는 설정 파일 입니다.  
일반적으로 CLI 프로그램, 웹서버 등에 사용되고, 주의할 점은 JSX 사용 시에는 `react-internal.js` 를 사용해야 합니다.

`eslint.config.mjs` 파일을 워크스페이스 루트에 생성하고, 다음과 같이 작성합니다.

```js
import { config } from '@monorepo-starter/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default config;
```

### react-internal.js

react 기반, 또는 JSX 를 사용하는 워크스페이스에서 사용하는 설정 파일 입니다.  
주로 기본 React CSR 기반, react router, tanstack router 등을 사용하는 워크스페이스에서도 사용됩니다.

`eslint.config.mjs` 파일을 워크스페이스 루트에 생성하고, 다음과 같이 작성합니다.

```js
import { config } from '@monorepo-starter/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default config;
```

### next.js

next.js 기반 워크스페이스에서 사용하는 설정 파일 입니다.  
주로 Next.js 14 이상을 사용하는 워크스페이스에서 사용됩니다.

`eslint.config.mjs` 파일을 워크스페이스 루트에 생성하고, 다음과 같이 작성합니다.

```js
import { config } from '@monorepo-starter/eslint-config/next';

/** @type {import("eslint").Linter.Config} */
export default config;
```

### next-fsd.js

next.js 기반, FSD(Feature-Sliced Design) 아키텍처를 사용하는 워크스페이스에서 사용하는 설정 파일 입니다.  

`eslint.config.mjs` 파일을 워크스페이스 루트에 생성하고, 다음과 같이 작성합니다.

```js
import { config } from '@monorepo-starter/eslint-config/next-fsd';

/** @type {import("eslint").Linter.Config} */
export default config;
```