# Git Commit Convention

참조: [https://www.conventionalcommits.org/ko/v1.0.0](https://www.conventionalcommits.org/ko/v1.0.0)

## 개요

이 문서는 프로젝트에서 사용하는 Git 커밋 메시지 컨벤션을 정의합니다.  
일관된 커밋 메시지 형식을 통해 프로젝트 히스토리를 명확하고 이해하기 쉽게 유지합니다.

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
# 창고 관리 관련
git commit -m "feat(warehouse): 창고 재고 실시간 추적 시스템 구현"
git commit -m "feat(warehouse): 창고별 구역 관리 기능 추가"
git commit -m "feat(warehouse): 재고 부족 알림 시스템 구축"
git commit -m "feat(warehouse): 창고 온도/습도 모니터링 기능"

# 배송 관리 관련
git commit -m "feat(delivery): 배송 경로 최적화 알고리즘 구현"
git commit -m "feat(delivery): 실시간 배송 추적 시스템 추가"
git commit -m "feat(delivery): 배송 상태 자동 업데이트 기능"
git commit -m "feat(delivery): 배송 기사 앱 연동 API 개발"

# 주문 관리 관련
git commit -m "feat(order): 주문 처리 자동화 워크플로우 구현"
git commit -m "feat(order): 주문 취소/변경 관리 시스템 추가"
git commit -m "feat(order): 주문 이력 추적 및 분석 기능"
git commit -m "feat(order): 대량 주문 일괄 처리 기능"

# 재고 관리 관련
git commit -m "feat(inventory): 재고 수준 자동 재주문 시스템"
git commit -m "feat(inventory): 재고 이동 이력 추적 기능"
git commit -m "feat(inventory): 재고 손실 감지 및 알림 시스템"
git commit -m "feat(inventory): 재고 회전율 분석 대시보드"

# 고객 관리 관련
git commit -m "feat(customer): 고객 등급별 배송 정책 관리"
git commit -m "feat(customer): 고객 주문 패턴 분석 기능"
git commit -m "feat(customer): 고객 문의 자동 분류 시스템"
git commit -m "feat(customer): VIP 고객 우선 처리 기능"

# 공급업체 관리 관련
git commit -m "feat(supplier): 공급업체 성과 평가 시스템"
git commit -m "feat(supplier): 공급업체 주문 자동 발주 기능"
git commit -m "feat(supplier): 공급업체 계약 관리 시스템"
git commit -m "feat(supplier): 공급업체 품질 검수 관리"

# UI/UX 관련
git commit -m "feat(ui): 물류 대시보드 실시간 모니터링 화면"
git commit -m "feat(ui): 창고 레이아웃 3D 시각화 기능"
git commit -m "feat(ui): 배송 경로 지도 표시 기능"
git commit -m "feat(ui): 재고 현황 차트 및 그래프 표시"
git commit -m "feat(ui): 모바일 창고 관리 앱 인터페이스"

# API 관련
git commit -m "feat(api): 물류 데이터 통합 API 엔드포인트"
git commit -m "feat(api): 외부 배송업체 API 연동 기능"
git commit -m "feat(api): 재고 데이터 실시간 동기화 API"
git commit -m "feat(api): 물류 리포트 생성 및 내보내기 API"

# 데이터베이스 관련
git commit -m "feat(db): 물류 트랜잭션 로그 테이블 스키마"
git commit -m "feat(db): 창고별 재고 수준 인덱스 최적화"
git commit -m "feat(db): 배송 이력 데이터 파티셔닝 적용"

# 유틸리티/도구 관련
git commit -m "feat(utils): 물류 계산 유틸리티 함수 (배송비, 세금 등)"
git commit -m "feat(utils): 바코드/QR코드 생성 및 스캔 기능"
git commit -m "feat(utils): 물류 데이터 검증 및 정제 도구"
```

#### 🐛 fix: 버그 수정

```bash
# 창고 관리 관련 버그
git commit -m "fix(warehouse): 재고 수량 동기화 지연 문제 해결"
git commit -m "fix(warehouse): 창고 구역별 권한 설정 오류 수정"
git commit -m "fix(warehouse): 재고 부족 알림 중복 발송 문제 해결"
git commit -m "fix(warehouse): 창고 온도 센서 데이터 누락 오류 수정"

# 배송 관리 관련 버그
git commit -m "fix(delivery): 배송 경로 계산 알고리즘 오류 수정"
git commit -m "fix(delivery): 배송 상태 업데이트 지연 문제 해결"
git commit -m "fix(delivery): 배송 기사 앱 GPS 위치 동기화 오류 수정"
git commit -m "fix(delivery): 배송 완료 처리 시 재고 차감 누락 문제"

# 주문 관리 관련 버그
git commit -m "fix(order): 주문 취소 시 재고 복구 로직 오류 수정"
git commit -m "fix(order): 대량 주문 처리 시 타임아웃 오류 해결"
git commit -m "fix(order): 주문 상태 변경 권한 검증 누락 문제 수정"
git commit -m "fix(order): 주문 이력 조회 성능 저하 문제 해결"

# 재고 관리 관련 버그
git commit -m "fix(inventory): 재고 이동 이력 중복 기록 문제 해결"
git commit -m "fix(inventory): 재고 손실 감지 알고리즘 오류 수정"
git commit -m "fix(inventory): 재고 회전율 계산 공식 오류 수정"
git commit -m "fix(inventory): 재고 수준 임계값 알림 미발송 문제 해결"

# 고객 관리 관련 버그
git commit -m "fix(customer): 고객 등급별 배송 정책 적용 오류 수정"
git commit -m "fix(customer): VIP 고객 우선 처리 로직 오류 해결"
git commit -m "fix(customer): 고객 문의 자동 분류 정확도 문제 수정"
git commit -m "fix(customer): 고객 주문 패턴 분석 데이터 누락 문제"

# 공급업체 관리 관련 버그
git commit -m "fix(supplier): 공급업체 성과 평가 점수 계산 오류 수정"
git commit -m "fix(supplier): 자동 발주 시스템 중복 주문 문제 해결"
git commit -m "fix(supplier): 공급업체 계약 만료 알림 미발송 문제"
git commit -m "fix(supplier): 품질 검수 결과 저장 오류 수정"

# UI 관련 버그
git commit -m "fix(ui): 물류 대시보드 실시간 데이터 업데이트 지연 문제"
git commit -m "fix(ui): 창고 레이아웃 3D 시각화 렌더링 오류 수정"
git commit -m "fix(ui): 배송 경로 지도 마커 표시 오류 해결"
git commit -m "fix(ui): 재고 현황 차트 데이터 동기화 문제 수정"
git commit -m "fix(ui): 모바일 창고 관리 앱 터치 이벤트 오류 수정"

# API 관련 버그
git commit -m "fix(api): 물류 데이터 통합 API 응답 지연 문제 해결"
git commit -m "fix(api): 외부 배송업체 API 연동 타임아웃 오류 수정"
git commit -m "fix(api): 재고 데이터 동기화 중복 처리 문제 해결"
git commit -m "fix(api): 물류 리포트 생성 시 메모리 누수 문제 수정"

# 데이터베이스 관련 버그
git commit -m "fix(db): 물류 트랜잭션 로그 테이블 인덱스 오류 수정"
git commit -m "fix(db): 창고별 재고 수준 조회 성능 저하 문제 해결"
git commit -m "fix(db): 배송 이력 데이터 파티셔닝 오류 수정"
git commit -m "fix(db): 재고 이동 이력 외래키 제약조건 오류 해결"

# 성능 관련 버그
git commit -m "fix(perf): 대용량 재고 데이터 조회 시 메모리 누수 문제 해결"
git commit -m "fix(perf): 배송 경로 계산 알고리즘 성능 최적화"
git commit -m "fix(perf): 물류 대시보드 실시간 업데이트 성능 개선"
```

#### 📚 docs: 문서 변경

```bash
# 프로젝트 문서
git commit -m "docs: 물류 시스템 설치 및 실행 가이드 업데이트"
git commit -m "docs: 창고 관리 API 엔드포인트 사용법 예시 추가"
git commit -m "docs: 배송 추적 시스템 환경 변수 설정 방법 상세 설명"
git commit -m "docs: 물류 시스템 배포 프로세스 단계별 가이드 작성"

# 물류 도메인 문서화
git commit -m "docs(warehouse): 창고 관리 시스템 사용자 매뉴얼 작성"
git commit -m "docs(delivery): 배송 추적 API 사용법 가이드 추가"
git commit -m "docs(inventory): 재고 관리 워크플로우 문서화"
git commit -m "docs(order): 주문 처리 프로세스 플로우차트 작성"

# 코드 문서화
git commit -m "docs(api): 물류 API JSDoc 주석으로 함수 설명 추가"
git commit -m "docs(utils): 물류 계산 유틸리티 함수 사용 예시 문서화"
git commit -m "docs(db): 물류 데이터베이스 스키마 ERD 다이어그램 추가"
git commit -m "docs(ui): 물류 대시보드 컴포넌트 Props 인터페이스 문서화"

# 운영 문서화
git commit -m "docs(ops): 창고 운영 매뉴얼 및 절차서 작성"
git commit -m "docs(ops): 배송 기사 앱 사용 가이드 추가"
git commit -m "docs(ops): 재고 관리 표준 운영 절차(SOP) 문서화"
git commit -m "docs(ops): 물류 시스템 장애 대응 매뉴얼 작성"
```

#### 🎨 style: 코드 스타일 변경

```bash
# 코드 포맷팅
git commit -m "style: 물류 시스템 전체 코드 Prettier 포맷팅 적용"
git commit -m "style(warehouse): 창고 관리 컴포넌트 import 순서 ESLint 규칙 적용"
git commit -m "style(delivery): 배송 API 함수 매개변수 줄바꿈 정리"
git commit -m "style(inventory): 재고 관리 유틸리티 변수명 camelCase 규칙 통일"

# 물류 도메인 코드 정리
git commit -m "style: 물류 시스템 사용하지 않는 import 문 제거"
git commit -m "style(ui): 물류 대시보드 CSS 클래스명 BEM 방법론 적용"
git commit -m "style(api): 물류 API 주석 스타일 통일 (JSDoc 형식)"
git commit -m "style(warehouse): 창고 관리 함수명 물류 도메인 용어로 통일"
git commit -m "style(delivery): 배송 관련 상수명 대문자 스네이크 케이스 적용"
git commit -m "style(inventory): 재고 관리 타입 정의 인터페이스 정리"
```

#### 🔧 refactor: 리팩토링

```bash
# 물류 도메인 코드 구조 개선
git commit -m "refactor(warehouse): 창고 재고 검증 로직을 서비스 레이어로 분리"
git commit -m "refactor(delivery): 배송 추적 공통 컴포넌트 추상화"
git commit -m "refactor(order): 주문 처리 API를 도메인별 엔드포인트로 재구성"
git commit -m "refactor(inventory): 재고 계산 함수들을 별도 유틸리티 모듈로 분리"

# 물류 시스템 성능 개선을 위한 리팩토링
git commit -m "refactor(db): 물류 트랜잭션 N+1 쿼리 문제 해결을 위한 조인 쿼리 최적화"
git commit -m "refactor(ui): 물류 대시보드 React.memo를 활용한 불필요한 리렌더링 방지"
git commit -m "refactor(api): 배송 경로 계산 비동기 처리 로직을 async/await 패턴으로 통일"

# 물류 도메인 아키텍처 개선
git commit -m "refactor(warehouse): 창고 관리 도메인 모델 DDD 패턴 적용"
git commit -m "refactor(delivery): 배송 추적 이벤트 기반 아키텍처로 전환"
git commit -m "refactor(inventory): 재고 관리 CQRS 패턴 적용으로 읽기/쓰기 분리"
git commit -m "refactor(order): 주문 처리 상태 머신 패턴으로 리팩토링"
```

#### 🧪 test: 테스트 관련

```bash
# 물류 도메인 단위 테스트
git commit -m "test(warehouse): 창고 재고 검증 성공/실패 시나리오 단위 테스트 추가"
git commit -m "test(delivery): 배송 경로 계산 API 엔드포인트 테스트 케이스"
git commit -m "test(inventory): 재고 계산 유틸리티 함수 엣지 케이스 테스트"
git commit -m "test(order): 주문 처리 컴포넌트 렌더링 및 사용자 상호작용 테스트"

# 물류 시스템 통합 테스트
git commit -m "test: 물류 데이터베이스 연결 및 트랜잭션 테스트"
git commit -m "test: 외부 배송업체 API 연동 모킹 테스트 추가"
git commit -m "test: 창고 관리 플로우 전체 E2E 테스트 시나리오"
git commit -m "test: 배송 추적 시스템 전체 워크플로우 테스트"

# 물류 도메인 테스트 설정
git commit -m "test: 물류 시스템 Jest 설정 파일 환경별 분리"
git commit -m "test: 물류 테스트 데이터베이스 마이그레이션 스크립트"
git commit -m "test: 창고 관리 테스트 데이터 시드 스크립트 추가"
git commit -m "test: 배송 추적 모의 데이터 생성 도구 구현"

# 성능 테스트
git commit -m "test(perf): 대용량 재고 데이터 조회 성능 테스트 추가"
git commit -m "test(perf): 배송 경로 계산 알고리즘 성능 벤치마크 테스트"
git commit -m "test(perf): 물류 대시보드 실시간 업데이트 부하 테스트"
```

#### 🔨 chore: 기타 작업

```bash
# 물류 시스템 의존성 관리
git commit -m "chore: 물류 대시보드 React 18.2.0으로 업그레이드"
git commit -m "chore: 물류 API TypeScript 5.0 버전 업데이트"
git commit -m "chore: 물류 시스템 ESLint 규칙 업데이트 및 설정 조정"
git commit -m "chore: 물류 관련 개발 의존성 정리 및 불필요한 패키지 제거"

# 물류 시스템 CI/CD 관련
git commit -m "chore(ci): 물류 시스템 GitHub Actions 워크플로우 최적화"
git commit -m "chore(ci): 물류 시스템 Docker 이미지 빌드 캐시 전략 개선"
git commit -m "chore(ci): 물류 시스템 자동 배포 파이프라인 설정 수정"
git commit -m "chore(ci): 창고 관리 시스템 스테이징 환경 배포 자동화"

# 물류 시스템 개발 환경
git commit -m "chore: 물류 시스템 VSCode 워크스페이스 설정 파일 추가"
git commit -m "chore: 물류 시스템 Git hooks 설정 (pre-commit, pre-push)"
git commit -m "chore: 물류 시스템 환경 변수 템플릿 파일(.env.example) 생성"
git commit -m "chore: 창고 관리 시스템 개발 환경 Docker Compose 설정"

# 물류 도메인 도구 및 설정
git commit -m "chore: 물류 데이터베이스 마이그레이션 스크립트 정리"
git commit -m "chore: 배송 추적 시스템 로깅 설정 개선"
git commit -m "chore: 재고 관리 시스템 모니터링 도구 설정"
git commit -m "chore: 물류 시스템 백업 및 복구 스크립트 추가"
```

#### ⚡ perf: 성능 개선

```bash
# 물류 시스템 API 성능
git commit -m "perf(api): 물류 데이터베이스 쿼리 인덱스 최적화로 응답 속도 50% 개선"
git commit -m "perf(api): 재고 조회 Redis 캐싱으로 반복 조회 성능 향상"
git commit -m "perf(api): 물류 API 응답 압축(gzip) 적용으로 전송 크기 70% 감소"
git commit -m "perf(api): 배송 경로 계산 API 응답 시간 60% 단축"

# 물류 대시보드 프론트엔드 성능
git commit -m "perf(ui): 물류 차트 이미지 lazy loading으로 초기 로딩 시간 단축"
git commit -m "perf(ui): 물류 시스템 코드 스플리팅으로 번들 크기 30% 감소"
git commit -m "perf(ui): 대용량 재고 리스트 가상 스크롤링으로 렌더링 최적화"
git commit -m "perf(ui): 물류 대시보드 메모이제이션으로 불필요한 리렌더링 방지"

# 물류 시스템 빌드 성능
git commit -m "perf(build): 물류 시스템 Webpack 설정 최적화로 빌드 시간 40% 단축"
git commit -m "perf(build): 물류 시스템 병렬 빌드 설정으로 개발 서버 시작 속도 개선"

# 물류 도메인 특화 성능 개선
git commit -m "perf(warehouse): 창고 재고 조회 쿼리 최적화로 응답 시간 80% 단축"
git commit -m "perf(delivery): 배송 경로 계산 알고리즘 개선으로 처리 속도 3배 향상"
git commit -m "perf(inventory): 재고 이동 이력 조회 페이지네이션 최적화"
git commit -m "perf(order): 대량 주문 처리 배치 최적화로 처리량 5배 증가"
```

#### 🏗️ build: 빌드 관련

```bash
# 물류 시스템 빌드 시스템
git commit -m "build: 물류 시스템 Webpack 5 마이그레이션 및 설정 최적화"
git commit -m "build: 물류 API TypeScript 컴파일 옵션 strict 모드 적용"
git commit -m "build: 물류 대시보드 소스맵 생성 설정으로 디버깅 환경 개선"

# 물류 시스템 Docker 관련
git commit -m "build: 물류 시스템 멀티스테이지 Docker 빌드로 이미지 크기 60% 감소"
git commit -m "build: 물류 시스템 Docker Compose 개발 환경 설정 최적화"
git commit -m "build: 물류 시스템 프로덕션 Docker 이미지 보안 스캔 설정"
git commit -m "build: 창고 관리 시스템 컨테이너 리소스 최적화"

# 물류 시스템 배포 관련
git commit -m "build: 물류 시스템 환경별 빌드 설정 분리 (dev, staging, prod)"
git commit -m "build: 물류 대시보드 정적 자산 CDN 배포 설정 추가"
git commit -m "build: 물류 시스템 빌드 아티팩트 캐싱 전략 구현"
git commit -m "build: 배송 추적 시스템 마이크로서비스 빌드 파이프라인 구축"
```

### 상세한 커밋 메시지 (Body 포함)

```bash
git commit -m "feat(warehouse): 창고 재고 실시간 추적 시스템 구현

- RFID/바코드 스캔을 통한 재고 자동 등록
- 재고 수준 임계값 기반 자동 알림 시스템
- 창고별 구역별 재고 현황 실시간 모니터링
- 재고 이동 이력 자동 추적 및 로깅

Closes #123"
```

### Breaking Changes 표시

```bash
git commit -m "feat(warehouse)!: 창고 재고 관리 API 구조 변경

BREAKING CHANGE: 재고 조회 API 엔드포인트가 /api/inventory에서 /api/warehouse/inventory로 변경됨
기존 클라이언트 코드는 새로운 엔드포인트로 업데이트가 필요합니다."
```

## 모범 사례

### ✅ 좋은 예시

```bash
git commit -m "feat(warehouse): 창고 재고 실시간 추적 시스템 구현"
git commit -m "fix(delivery): 배송 경로 계산 알고리즘 오류 수정"
git commit -m "docs: 물류 API 사용법 예시 추가"
git commit -m "refactor(inventory): 재고 계산 함수 개선"
```

### ❌ 피해야 할 예시

```bash
# 너무 모호함
git commit -m "수정"
git commit -m "업데이트"
git commit -m "버그 수정"

# 과도한 정보
git commit -m "feat: 창고 시스템을 개선하고, 배송도 최적화하고, 재고도 자동화했음"

# 영어와 한국어 혼용
git commit -m "feat: add warehouse feature"
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
git commit -m "feat(warehouse): [LOG-123] 창고 재고 실시간 추적 시스템 구현"
git commit -m "fix(delivery): [LOG-456] 배송 경로 계산 알고리즘 오류 수정"
git commit -m "perf(inventory): [LOG-789] 재고 조회 쿼리 최적화"

# 여러 티켓 연관
git commit -m "feat(ui): [LOG-123, LOG-124] 물류 대시보드 및 모니터링 화면 구현"

# 티켓 해결 표시
git commit -m "fix(order): [LOG-234] 주문 처리 로직 오류 수정"
git commit -m "feat(api): [LOG-345] 배송 추적 API 구현"
```

#### 상세한 커밋 메시지 (Jira 포함)

```bash
git commit -m "feat(warehouse): [LOG-123] 창고 재고 실시간 추적 시스템 구현

- RFID/바코드 스캔을 통한 재고 자동 등록
- 재고 수준 임계값 기반 자동 알림 시스템
- 창고별 구역별 재고 현황 실시간 모니터링
- 재고 이동 이력 자동 추적 및 로깅

Resolves: LOG-123"
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
