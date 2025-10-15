# Git Commit Convention

참조: [https://www.conventionalcommits.org/ko/v1.0.0/](https://www.conventionalcommits.org/ko/v1.0.0/)

## 개요

이 문서는 프로젝트에서 사용하는 Git 커밋 메시지 컨벤션을 정의합니다. 일관된 커밋 메시지 형식을 통해 프로젝트 히스토리를 명확하고 이해하기 쉽게 유지합니다.

## 커밋 메시지 구조

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Type (필수)

- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 변경
- **style**: 코드 포맷팅, 세미콜론 누락 등 (기능 변경 없음)
- **refactor**: 코드 리팩토링 (기능 변경 없음)
- **test**: 테스트 코드 추가 또는 수정
- **chore**: 빌드 프로세스, 보조 도구 변경 (기능 변경 없음)
- **perf**: 성능 개선
- **ci**: CI/CD 설정 변경
- **build**: 빌드 시스템 또는 외부 의존성 변경
- **revert**: 이전 커밋 되돌리기

### Scope (선택사항)

변경사항이 영향을 미치는 범위를 명시합니다.

- **auth**: 인증 관련
- **ui**: 사용자 인터페이스
- **api**: API 관련
- **db**: 데이터베이스
- **config**: 설정 파일
- **deps**: 의존성
- **types**: 타입 정의
- **utils**: 유틸리티 함수

### Description (필수)

변경사항을 간결하고 명확하게 설명합니다.

- 현재형 동사 사용 (예: "추가", "수정", "개선")
- 첫 글자는 소문자
- 마침표로 끝내지 않음
- 50자 이내로 작성

## Examples

### 기본 예시

#### 🚀 feat: 새로운 기능 추가

```bash
# 사용자 인증 관련
git commit -m "feat(auth): 이메일 인증 코드 발송 기능 구현"
git commit -m "feat(auth): 소셜 로그인 (Google, GitHub) 연동"
git commit -m "feat(auth): 2단계 인증(2FA) 지원 추가"
git commit -m "feat(auth): 비밀번호 강도 검증 규칙 적용"

# UI/UX 관련
git commit -m "feat(ui): 반응형 네비게이션 메뉴 구현"
git commit -m "feat(ui): 다크/라이트 모드 테마 전환 기능"
git commit -m "feat(ui): 무한 스크롤 데이터 로딩 구현"
git commit -m "feat(ui): 드래그 앤 드롭 파일 업로드 지원"
git commit -m "feat(ui): 실시간 알림 토스트 시스템 추가"

# API 관련
git commit -m "feat(api): 사용자 프로필 CRUD API 엔드포인트"
git commit -m "feat(api): 파일 업로드 멀티파트 처리 지원"
git commit -m "feat(api): 실시간 채팅 WebSocket 연결"
git commit -m "feat(api): 데이터 내보내기 Excel/CSV 다운로드"

# 데이터베이스 관련
git commit -m "feat(db): 사용자 활동 로그 테이블 스키마 추가"
git commit -m "feat(db): 데이터베이스 인덱스 최적화 적용"
git commit -m "feat(db): 데이터 백업 자동화 스크립트"

# 유틸리티/도구 관련
git commit -m "feat(utils): 날짜 포맷팅 유틸리티 함수 추가"
git commit -m "feat(utils): 이메일 템플릿 엔진 통합"
git commit -m "feat(utils): 이미지 리사이징 및 압축 기능"
```

#### 🐛 fix: 버그 수정

```bash
# API 관련 버그
git commit -m "fix(api): 페이지네이션에서 마지막 페이지 누락 오류 수정"
git commit -m "fix(api): 파일 업로드 시 메모리 누수 문제 해결"
git commit -m "fix(api): CORS 설정으로 인한 프리플라이트 요청 실패 수정"
git commit -m "fix(api): JWT 토큰 만료 시 무한 리다이렉트 루프 해결"

# 인증 관련 버그
git commit -m "fix(auth): 로그아웃 후 세션 쿠키 미삭제 문제 수정"
git commit -m "fix(auth): 비밀번호 재설정 링크 중복 사용 가능한 보안 취약점"
git commit -m "fix(auth): 소셜 로그인 콜백 URL 불일치 오류 해결"

# UI 관련 버그
git commit -m "fix(ui): 모바일에서 모달 배경 스크롤 방지 기능 추가"
git commit -m "fix(ui): 테이블 정렬 시 헤더 클릭 영역 오류 수정"
git commit -m "fix(ui): 다국어 지원에서 RTL 언어 레이아웃 깨짐 현상"
git commit -m "fix(ui): 이미지 로딩 실패 시 플레이스홀더 표시 누락"

# 데이터베이스 관련 버그
git commit -m "fix(db): 외래키 제약조건으로 인한 삭제 실패 오류 수정"
git commit -m "fix(db): 트랜잭션 롤백 시 연결 풀 고갈 문제 해결"
git commit -m "fix(db): 대용량 데이터 조회 시 타임아웃 오류 수정"

# 성능 관련 버그
git commit -m "fix(perf): 메모리 누수로 인한 서버 크래시 문제 해결"
git commit -m "fix(perf): 이미지 최적화 없이 원본 파일 서빙 문제 수정"
```

#### 📚 docs: 문서 변경

```bash
# 프로젝트 문서
git commit -m "docs: README 설치 및 실행 가이드 업데이트"
git commit -m "docs: API 엔드포인트 사용법 예시 추가"
git commit -m "docs: 환경 변수 설정 방법 상세 설명"
git commit -m "docs: 배포 프로세스 단계별 가이드 작성"

# 코드 문서화
git commit -m "docs(api): JSDoc 주석으로 함수 설명 추가"
git commit -m "docs(utils): 유틸리티 함수 사용 예시 문서화"
git commit -m "docs(db): 데이터베이스 스키마 ERD 다이어그램 추가"
git commit -m "docs(ui): 컴포넌트 Props 인터페이스 문서화"
```

#### 🎨 style: 코드 스타일 변경

```bash
# 코드 포맷팅
git commit -m "style: Prettier 설정에 따른 전체 코드 포맷팅"
git commit -m "style(ui): 컴포넌트 import 순서 ESLint 규칙 적용"
git commit -m "style(api): 함수 매개변수 줄바꿈 정리"
git commit -m "style(utils): 변수명 camelCase 규칙 통일"

# 코드 정리
git commit -m "style: 사용하지 않는 import 문 제거"
git commit -m "style(ui): CSS 클래스명 BEM 방법론 적용"
git commit -m "style(api): 주석 스타일 통일 (JSDoc 형식)"
```

#### 🔧 refactor: 리팩토링

```bash
# 코드 구조 개선
git commit -m "refactor(auth): JWT 토큰 검증 로직을 미들웨어로 분리"
git commit -m "refactor(ui): 공통 모달 컴포넌트 추상화"
git commit -m "refactor(api): RESTful API 설계 원칙에 따른 엔드포인트 재구성"
git commit -m "refactor(utils): 날짜 처리 함수들을 별도 모듈로 분리"

# 성능 개선을 위한 리팩토링
git commit -m "refactor(db): N+1 쿼리 문제 해결을 위한 조인 쿼리 최적화"
git commit -m "refactor(ui): React.memo를 활용한 불필요한 리렌더링 방지"
git commit -m "refactor(api): 비동기 처리 로직을 async/await 패턴으로 통일"
```

#### 🧪 test: 테스트 관련

```bash
# 단위 테스트
git commit -m "test(auth): 로그인 성공/실패 시나리오 단위 테스트 추가"
git commit -m "test(api): 사용자 CRUD API 엔드포인트 테스트 케이스"
git commit -m "test(utils): 날짜 포맷팅 함수 엣지 케이스 테스트"
git commit -m "test(ui): 컴포넌트 렌더링 및 사용자 상호작용 테스트"

# 통합 테스트
git commit -m "test: 데이터베이스 연결 및 트랜잭션 테스트"
git commit -m "test: 외부 API 연동 모킹 테스트 추가"
git commit -m "test: 인증 플로우 전체 E2E 테스트 시나리오"

# 테스트 설정
git commit -m "test: Jest 설정 파일 환경별 분리"
git commit -m "test: 테스트 데이터베이스 마이그레이션 스크립트"
```

#### 🔨 chore: 기타 작업

```bash
# 의존성 관리
git commit -m "chore: React 18.2.0으로 업그레이드"
git commit -m "chore: TypeScript 5.0 버전 업데이트"
git commit -m "chore: ESLint 규칙 업데이트 및 설정 조정"
git commit -m "chore: 개발 의존성 정리 및 불필요한 패키지 제거"

# CI/CD 관련
git commit -m "chore(ci): GitHub Actions 워크플로우 최적화"
git commit -m "chore(ci): Docker 이미지 빌드 캐시 전략 개선"
git commit -m "chore(ci): 자동 배포 파이프라인 설정 수정"

# 개발 환경
git commit -m "chore: VSCode 워크스페이스 설정 파일 추가"
git commit -m "chore: Git hooks 설정 (pre-commit, pre-push)"
git commit -m "chore: 환경 변수 템플릿 파일(.env.example) 생성"
```

#### ⚡ perf: 성능 개선

```bash
# API 성능
git commit -m "perf(api): 데이터베이스 쿼리 인덱스 최적화로 응답 속도 50% 개선"
git commit -m "perf(api): Redis 캐싱으로 반복 조회 성능 향상"
git commit -m "perf(api): API 응답 압축(gzip) 적용으로 전송 크기 70% 감소"

# 프론트엔드 성능
git commit -m "perf(ui): 이미지 lazy loading으로 초기 로딩 시간 단축"
git commit -m "perf(ui): 코드 스플리팅으로 번들 크기 30% 감소"
git commit -m "perf(ui): 가상 스크롤링으로 대용량 리스트 렌더링 최적화"
git commit -m "perf(ui): 메모이제이션으로 불필요한 컴포넌트 리렌더링 방지"

# 빌드 성능
git commit -m "perf(build): Webpack 설정 최적화로 빌드 시간 40% 단축"
git commit -m "perf(build): 병렬 빌드 설정으로 개발 서버 시작 속도 개선"
```

#### 🏗️ build: 빌드 관련

```bash
# 빌드 시스템
git commit -m "build: Webpack 5 마이그레이션 및 설정 최적화"
git commit -m "build: TypeScript 컴파일 옵션 strict 모드 적용"
git commit -m "build: 소스맵 생성 설정으로 디버깅 환경 개선"

# Docker 관련
git commit -m "build: 멀티스테이지 Docker 빌드로 이미지 크기 60% 감소"
git commit -m "build: Docker Compose 개발 환경 설정 최적화"
git commit -m "build: 프로덕션 Docker 이미지 보안 스캔 설정"

# 배포 관련
git commit -m "build: 환경별 빌드 설정 분리 (dev, staging, prod)"
git commit -m "build: 정적 자산 CDN 배포 설정 추가"
git commit -m "build: 빌드 아티팩트 캐싱 전략 구현"
```

### 상세한 커밋 메시지 (Body 포함)

```bash
git commit -m "feat(auth): OAuth 소셜 로그인 지원

- Google, GitHub, Kakao 소셜 로그인 구현
- JWT 토큰 기반 인증 시스템 구축
- 사용자 프로필 정보 자동 동기화

Closes #123"
```

### Breaking Changes 표시

```bash
git commit -m "feat(api)!: 사용자 인증 방식 변경

BREAKING CHANGE: JWT 토큰 만료 시간이 1시간에서 30분으로 단축됨
기존 토큰은 무효화되며 재로그인이 필요합니다."
```

## 모범 사례

### ✅ 좋은 예시

```bash
git commit -m "feat(ui): 반응형 네비게이션 메뉴 구현"
git commit -m "fix(auth): 토큰 갱신 로직 오류 수정"
git commit -m "docs: API 사용법 예시 추가"
git commit -m "refactor(utils): 날짜 포맷팅 함수 개선"
```

### ❌ 피해야 할 예시

```bash
# 너무 모호함
git commit -m "수정"
git commit -m "업데이트"
git commit -m "버그 수정"

# 과도한 정보
git commit -m "feat: 새로운 기능을 추가했고, 버그도 수정하고, 성능도 개선했음"

# 영어와 한국어 혼용
git commit -m "feat: add new feature"
```

## Jira 연동

### Jira 티켓 번호 포함 커밋 메시지

Jira 티켓 번호를 커밋 메시지에 포함하여 이슈 추적과 자동 링크를 활용할 수 있습니다.

#### 기본 형식

```bash
<type>(<scope>): [JIRA-123] <description>
```

#### 실제 사용 예시

```bash
# Jira 티켓 번호 포함
git commit -m "feat(auth): [PROJ-123] 소셜 로그인 연동"
git commit -m "fix(ui): [PROJ-456] 모달 스크롤 이슈 해결"
git commit -m "perf(api): [PROJ-789] 데이터베이스 쿼리 최적화"

# 여러 티켓 연관
git commit -m "feat(ui): [PROJ-123, PROJ-124] 사용자 대시보드 구현"

# 티켓 해결 표시
git commit -m "fix(auth): [PROJ-234] JWT 토큰 만료 처리"
git commit -m "feat(api): [PROJ-345] 파일 업로드 API 구현"
```

#### 상세한 커밋 메시지 (Jira 포함)

```bash
git commit -m "feat(auth): [PROJ-123] OAuth 소셜 로그인 지원

- Google, GitHub, Kakao 소셜 로그인 구현
- JWT 토큰 기반 인증 시스템 구축
- 사용자 프로필 정보 자동 동기화

Resolves: PROJ-123"
```

#### GitHub 이슈 자동 닫기

```bash
# 버그 수정 시 이슈 자동 닫기
git commit -m "fix(auth): JWT 토큰 만료 처리 오류 해결

- 토큰 갱신 로직 개선
- 만료된 토큰 자동 갱신 기능 추가

Fixes #123"

# 기능 구현 완료 시 이슈 닫기
git commit -m "feat(ui): 다크 모드 토글 기능 구현

- 테마 전환 애니메이션 추가
- 사용자 설정 저장 기능

Closes #456"

# 여러 이슈 한번에 닫기
git commit -m "feat(api): 사용자 인증 시스템 완전 개편

- JWT 토큰 기반 인증
- 소셜 로그인 연동
- 2FA 지원

Closes #123, #456, #789"

# 이슈 참조 (닫지 않음)
git commit -m "docs: API 사용법 가이드 업데이트

- 인증 엔드포인트 예시 추가
- 에러 코드 설명 보완

Refs #234"

# Jira + GitHub 이슈 동시 연동
git commit -m "feat(ui): [PROJ-123] 반응형 네비게이션 메뉴 구현

- 모바일 햄버거 메뉴 추가
- 접근성 키보드 네비게이션 지원
- 다국어 메뉴 라벨 지원

Closes #456
Resolves: PROJ-123"
```

#### GitHub 이슈 자동 닫기 키워드

```bash
# 이슈를 닫는 키워드들
Fixes #123        # 버그 수정
Closes #123       # 기능 구현 완료
Resolves #123     # 문제 해결

# 이슈를 참조하는 키워드들 (닫지 않음)
Refs #123         # 참조만
Relates to #123   # 관련 이슈
See also #123     # 참고 이슈

# 실제 사용 예시
git commit -m "fix(api): 페이지네이션 오류 수정

Fixes #123"

git commit -m "feat(ui): 사용자 대시보드 구현

Closes #456"

git commit -m "docs: README 설치 가이드 업데이트

Refs #234"
```

### Jira 자동 링크 설정

#### 1. Jira 커밋 메시지 훅 설정

```bash
# .gitmessage 템플릿 생성
echo "# <type>(<scope>): [JIRA-XXX] <description>

# 예시:
# feat(auth): [PROJ-123] 소셜 로그인 연동
# fix(ui): [PROJ-456] 모달 스크롤 이슈 해결

# 변경사항 설명 (선택사항):
# - 구체적인 변경 내용
# - 해결된 문제점
# - 추가된 기능

# Jira 티켓 번호 (필수):
# [PROJ-XXX]" > .gitmessage

# Git 설정에 메시지 템플릿 적용
git config commit.template .gitmessage
```

#### 2. 커밋 메시지 검증 스크립트

```bash
# scripts/validate-commit.js 생성
cat > scripts/validate-commit.js << 'EOF'
#!/usr/bin/env node

const commitMsg = require('fs').readFileSync(process.argv[2], 'utf8');
const jiraPattern = /\[[A-Z]+-\d+\]/;

if (!jiraPattern.test(commitMsg)) {
  console.error('❌ 커밋 메시지에 Jira 티켓 번호가 포함되어야 합니다.');
  console.error('예시: feat(auth): [PROJ-123] 로그인 기능 추가');
  process.exit(1);
}

console.log('✅ Jira 티켓 번호가 포함된 유효한 커밋 메시지입니다.');
EOF

chmod +x scripts/validate-commit.js
```

#### 3. Husky 설정으로 자동 검증

```bash
# Husky 설치 및 설정
pnpm add -D husky lint-staged

# .husky/commit-msg 파일 생성
mkdir -p .husky
cat > .husky/commit-msg << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Jira 티켓 번호 검증
node scripts/validate-commit.js $1
EOF

chmod +x .husky/commit-msg
```

### Jira 워크플로우 자동화

#### 1. 커밋 → Jira 자동 업데이트

```bash
# Jira API 연동 스크립트 (scripts/jira-sync.js)
cat > scripts/jira-sync.js << 'EOF'
#!/usr/bin/env node

const https = require('https');

// Jira 설정
const JIRA_BASE_URL = process.env.JIRA_BASE_URL || 'https://your-company.atlassian.net';
const JIRA_USERNAME = process.env.JIRA_USERNAME;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;

function updateJiraTicket(ticketId, commitMessage) {
  const data = JSON.stringify({
    update: {
      comment: [{
        add: {
          body: `커밋: ${commitMessage}`
        }
      }]
    }
  });

  const options = {
    hostname: JIRA_BASE_URL.replace('https://', ''),
    port: 443,
    path: `/rest/api/3/issue/${ticketId}`,
    method: 'PUT',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${JIRA_USERNAME}:${JIRA_API_TOKEN}`).toString('base64')}`,
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = https.request(options, (res) => {
    if (res.statusCode === 204) {
      console.log(`✅ Jira 티켓 ${ticketId} 업데이트 완료`);
    } else {
      console.error(`❌ Jira 업데이트 실패: ${res.statusCode}`);
    }
  });

  req.write(data);
  req.end();
}

// 커밋 메시지에서 Jira 티켓 번호 추출
const commitMessage = process.argv[2];
const jiraMatch = commitMessage.match(/\[([A-Z]+-\d+)\]/g);

if (jiraMatch) {
  jiraMatch.forEach(match => {
    const ticketId = match.replace(/[\[\]]/g, '');
    updateJiraTicket(ticketId, commitMessage);
  });
}
EOF

chmod +x scripts/jira-sync.js
```

#### 2. 환경 변수 설정

```bash
# .env.example에 Jira 설정 추가
cat >> .env.example << 'EOF'

# Jira 연동 설정
JIRA_BASE_URL=https://your-company.atlassian.net
JIRA_USERNAME=your-email@company.com
JIRA_API_TOKEN=your-api-token
EOF
```

#### 3. Git 훅에서 자동 실행

```bash
# .husky/post-commit 파일 생성
cat > .husky/post-commit << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Jira 티켓 자동 업데이트
node scripts/jira-sync.js "$(git log -1 --pretty=%B)"
EOF

chmod +x .husky/post-commit
```

### Jira 커밋 메시지 템플릿

#### 1. VSCode 스니펫 설정

```json
// .vscode/snippets.json
{
  "git-commit-jira": {
    "prefix": "git-commit-jira",
    "body": [
      "${1:type}(${2:scope}): [${4:PROJ-XXX}] ${3:description}",
      "",
      "${5:변경사항 설명:}",
      "- ${6:구체적인 변경 내용}",
      "- ${7:해결된 문제점}",
      "",
      "Resolves: ${4:PROJ-XXX}"
    ],
    "description": "Jira 티켓 번호가 포함된 Git 커밋 메시지"
  }
}
```

#### 2. 커밋 메시지 생성 도구

```bash
# scripts/commit-with-jira.sh 생성
cat > scripts/commit-with-jira.sh << 'EOF'
#!/bin/bash

echo "🚀 Jira 연동 커밋 메시지 생성기"
echo ""

# Jira 티켓 번호 입력
read -p "Jira 티켓 번호 (예: PROJ-123): " JIRA_TICKET

# 커밋 타입 선택
echo "커밋 타입을 선택하세요:"
echo "1) feat - 새로운 기능"
echo "2) fix - 버그 수정"
echo "3) docs - 문서 변경"
echo "4) style - 코드 스타일"
echo "5) refactor - 리팩토링"
echo "6) test - 테스트"
echo "7) chore - 기타 작업"
read -p "선택 (1-7): " TYPE_CHOICE

case $TYPE_CHOICE in
  1) TYPE="feat" ;;
  2) TYPE="fix" ;;
  3) TYPE="docs" ;;
  4) TYPE="style" ;;
  5) TYPE="refactor" ;;
  6) TYPE="test" ;;
  7) TYPE="chore" ;;
  *) echo "잘못된 선택입니다."; exit 1 ;;
esac

# 스코프 입력
read -p "스코프 (예: auth, ui, api): " SCOPE

# 설명 입력
read -p "변경사항 설명: " DESCRIPTION

# 커밋 메시지 생성
COMMIT_MSG="${TYPE}(${SCOPE}): [${JIRA_TICKET}] ${DESCRIPTION}"

echo ""
echo "생성된 커밋 메시지:"
echo "📝 ${COMMIT_MSG}"
echo ""

read -p "커밋을 실행하시겠습니까? (y/N): " CONFIRM
if [[ $CONFIRM =~ ^[Yy]$ ]]; then
  git commit -m "$COMMIT_MSG"
  echo "✅ 커밋이 완료되었습니다!"
else
  echo "❌ 커밋이 취소되었습니다."
fi
EOF

chmod +x scripts/commit-with-jira.sh
```

### Jira 연동 모범 사례

#### ✅ 좋은 예시

```bash
# 명확한 티켓 번호와 설명
git commit -m "feat(auth): [PROJ-123] Google OAuth 로그인 구현"
git commit -m "fix(ui): [PROJ-456] 모바일 네비게이션 메뉴 오류 수정"
git commit -m "perf(api): [PROJ-789] 데이터베이스 쿼리 최적화로 응답속도 50% 개선"

# 여러 티켓 연관
git commit -m "feat(ui): [PROJ-123, PROJ-124] 사용자 대시보드 및 프로필 페이지 구현"
```

#### ❌ 피해야 할 예시

```bash
# 티켓 번호 누락
git commit -m "feat(auth): 소셜 로그인 추가"

# 티켓 번호 형식 오류
git commit -m "feat(auth): [123] 소셜 로그인 추가"
git commit -m "feat(auth): [proj-123] 소셜 로그인 추가"

# 모호한 설명
git commit -m "fix: [PROJ-123] 버그 수정"
```

## 자동화 도구

별도의 `Commitizen` 이나, `Husky` + `lint-staged` 를 사용하여 자동화할 수 있지만,  
여기선 사용하지 않습니다.

## 참고 자료

- [Conventional Commits](https://www.conventionalcommits.org/ko/v1.0.0/)
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Semantic Versioning](https://semver.org/lang/ko/)
