## Getting Started

### Start Auto-Setup

자동실행 스크립트를 통해 프로젝트를 초기화하고, 개발 서버를 실행합니다.

```bash
cd $ROOT
make init
cd apps/next-full-stack
pnpm dev
```

### Start Manually

수동으로 프로젝트를 초기화하고, 개발 서버를 실행합니다.

```bash
cd apps/next-full-stack

# 1. `.env` 파일 생성
cp .env.example .env

# 2. Local SQLite Database 설정
pnpm db:generate # Generate SQL files in the `drizzle/` folder
pnpm db:migrate  # Run SQL files in the `drizzle/` folder

# 3. 웹푸시 설정
pnpx web-push generate-vapid-keys --json # 이 결과를 .env 파일에 추가
# .publicKey -> NEXT_PUBLIC_VAPID_PUBLIC_KEY
# .privateKey -> NEXT_PUBLIC_VAPID_PRIVATE_KEY

# 4. 개발 서버 실행
pnpm dev
```

### Start local tunnel (cloudflared)

`cloudflared`는 Cloudflare에서 제공하는 Tunnel Client 서비스입니다.


```bash
# homebrew를 통해 cloudflared 설치
brew install cloudflared

# 개발 서버 실행
pnpm dev # or pnpm start

# cloudflared tunnel 실행
cloudflared tunnel --url http://localhost:3001

# cloudflared tunnel --url http://localhost:3001
# 2025-08-29T08:13:18Z INF ...
# 2025-08-29T08:13:22Z INF +--------------------------------------------------------------------------------------------+
# 2025-08-29T08:13:22Z INF |  Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):  |
# 2025-08-29T08:13:22Z INF |  https://aaaa-aaaa.trycloudflare.com                                        |
# 2025-08-29T08:13:22Z INF +--------------------------------------------------------------------------------------------+
# 2025-08-29T08:13:22Z INF ....
```
여기서, 랜덤으로 생성된 https://aaaa-aaaa.trycloudflare.com 이 접속가능한 도메인입니다.


## Folder Structure & Rules

변형된 [FSD](https://feature-sliced.design/kr/docs/get-started/overview) 구조를 사용하고 있습니다.  
기본 FSD 구조에서 다음의 규칙을 추가하였습니다.

- `shared` 레이어는 `common` 레이어로 **이름만 변경** 해서 사용
- `pages`, `app` 레이어는 `app` 레이어로 통합해서 하나로 사용
- 기본적인 흐름은, `app` > `widgets` > `features` > `entities` > `common` 순으로 이동
자세한 내용은 별도의 [문서를](./GUIDES.md) 참조하세요.

