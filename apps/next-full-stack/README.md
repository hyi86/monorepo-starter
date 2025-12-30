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
