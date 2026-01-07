import type { NextConfig } from 'next';
import '~/env';

const nextConfig: NextConfig = {
  /** allowedDevOrigins: 개발 모드에서 허용할 추가 오리진 (기본값: localhost만 허용) */
  allowedDevOrigins: [],

  /** assetPrefix: 정적 자산(JS/CSS)을 CDN에서 제공하기 위한 프리픽스 (/_next/static/만 적용, Vercel은 자동 설정) */
  // assetPrefix: undefined,

  /** basePath: 서브패스 호스팅을 위한 경로 프리픽스 (빌드 타임 설정, next/link에 자동 적용) */
  // basePath: '',

  /** cacheComponents: 데이터 페칭을 프리렌더링에서 제외하고 런타임에 실행 (use cache와 함께 사용) */
  cacheComponents: true,

  /** cacheHandlers: use cache 지시어를 위한 커스텀 캐시 핸들러 설정 */
  // cacheHandlers: {},

  /** cacheLife: use cache와 함께 사용하여 캐시 수명 설정 */
  // cacheLife: {},

  /** compress: gzip 압축 활성화 (서버 타겟에서만 작동) */
  // compress: true,

  /** crossOrigin: next/script로 생성된 script 태그에 crossOrigin 속성 추가 */
  // crossOrigin: 'anonymous',

  /** devIndicators: 개발 중 화면 표시 인디케이터 설정 */
  // devIndicators: {},

  /** distDir: 기본 .next 대신 사용할 커스텀 빌드 디렉토리 */
  // distDir: '.next',

  /** expireTime: ISR 활성화 페이지의 stale-while-revalidate 만료 시간 커스터마이징 */
  // expireTime: 60,

  /** generateBuildId: 빌드 ID 설정 (현재 빌드를 식별하는 데 사용) */
  // generateBuildId: async () => '',

  /** generateEtags: 페이지별 etag 생성 (기본값: true) */
  // generateEtags: true,

  /** headers: 커스텀 HTTP 헤더 추가 */
  // async headers() { return []; },

  /** htmlLimitedBots: 차단 메타데이터를 받을 사용자 에이전트 목록 지정 */
  // htmlLimitedBots: [],

  /** httpAgentOptions: HTTP Keep-Alive 설정 (기본값: 자동 사용) */
  // httpAgentOptions: {},

  /** images: next/image 로더 커스텀 설정 */
  // images: {},

  /** cacheHandler: 외부 서비스(Redis, Memcached 등)를 사용한 Next.js 캐시 설정 */
  // cacheHandler: '',

  /** logging: 개발 모드에서 데이터 페칭 로깅 방식 설정 */
  // logging: {},

  /** onDemandEntries: 개발 중 생성된 페이지의 메모리 처리 방식 설정 */
  // onDemandEntries: {},

  /** output: 애플리케이션 배포를 위한 파일 추적 설정 */
  output: process.env.STANDALONE === '1' ? 'standalone' : undefined,

  /** pageExtensions: Pages Router에서 페이지 해석 시 사용할 기본 페이지 확장자 확장 */
  // pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  /** poweredByHeader: x-powered-by 헤더 제거 (기본값: 추가됨) */
  // poweredByHeader: false,

  /** productionBrowserSourceMaps: 프로덕션 빌드 중 브라우저 소스맵 생성 활성화 */
  // productionBrowserSourceMaps: true,

  /** reactCompiler: React Compiler 활성화 (컴포넌트 렌더링 자동 최적화) */
  // reactCompiler: true,

  /** reactMaxHeadersLength: React에서 생성되어 응답에 추가되는 헤더의 최대 길이 */
  // reactMaxHeadersLength: 8192,

  /** reactStrictMode: React Strict Mode 활성화 */
  // reactStrictMode: false,

  /** redirects: 리다이렉트 추가 */
  // async redirects() { return []; },

  /** rewrites: URL 재작성 추가 */
  // async rewrites() { return []; },

  /** sassOptions: Sass 옵션 설정 */
  // sassOptions: {},

  /** serverActions: Server Actions 동작 설정 */
  // serverActions: {},

  /** serverExternalPackages: Server Components 번들링에서 제외할 의존성 (네이티브 Node.js require 사용) */
  // serverExternalPackages: [],

  /** trailingSlash: 페이지가 trailing slash로 해석되는지 여부 설정 */
  // trailingSlash: false,

  /** transpilePackages: 로컬 패키지 또는 외부 의존성의 자동 트랜스파일 및 번들링 */
  transpilePackages: ['@monorepo-starter/ui', '@monorepo-starter/utils', '@t3-oss/env-nextjs'],

  /** turbopack: Turbopack 옵션 설정 */
  // experimental: { turbopack: {} },

  /** typedRoutes: 정적으로 타입이 지정된 링크 지원 활성화 */
  typedRoutes: true,

  /** typescript: 프로덕션 빌드 중 TypeScript 오류 처리 및 커스텀 tsconfig 파일 지정 */
  // typescript: {},

  /** webpack: Next.js에서 사용하는 webpack 설정 커스터마이징 */
  // webpack: (config, { isServer }) => config,
};

export default nextConfig;
