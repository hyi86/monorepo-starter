import createBundleAnalyzer from '@next/bundle-analyzer';
import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

/**
 * @see {@link https://nextjs.org/docs/app/api-reference/config/next-config-js NextConfig}
 */
const nextConfig: NextConfig = {
  devIndicators: {
    position: 'top-right',
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: false,
    },
  },
  output: process.env.STANDALONE === '1' ? 'standalone' : undefined,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  productionBrowserSourceMaps: false,
  /**
   * 서버 컴포넌트나 라우트 핸들러에서 사용하는 특정 패키지를 Next.js의 서버 번들에서 제외하고,
   * Node.js의 require를 통해 런타임에 로드하도록 설정.
   * 서버 전용 패키지로, 예를 들어 sharp, bcrypt, sqlite3 등과 같이 무거운 네이티브 패키지에 적합
   * @see {@link https://nextjs.org/docs/app/api-reference/config/next-config-js/serverExternalPackages Next.js 공식 문서}
   */
  serverExternalPackages: ['pino', 'pino-pretty'],
  /**
   * Next.js가 기본적으로 트랜스파일하지 않는 `node_modules` 내의 패키지를 트랜스파일 대상으로 지정하여,
   * 최신 JavaScript 문법이나 TypeScript로 작성된 패키지를 사용할 수 있도록 함.
   * ESM만 지원하거나 TypeScript로 작성된 패키지, 또는 모노레포 구조에서의 로컬 패키지 등에 사용
   * @see {@link https://nextjs.org/docs/app/api-reference/config/next-config-js/transpilePackages Next.js 공식 문서}
   */
  transpilePackages: ['@monorepo-starter/ui', '@t3-oss/env-nextjs', '@t3-oss/env-core'],
  experimental: {
    /**
     * 클라이언트 사이드에서 사용하지 않는 모듈을 제거하여 번들 크기를 줄이고 성능을 최적화
     * @see {@link https://nextjs.org/docs/app/api-reference/config/next-config-js/optimizePackageImports Next.js 공식 문서}
     */
    optimizePackageImports: ['@mantine/hooks'],
    /**
     * 서버 액션 요청 크기 제한
     * @see {@link https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions#bodysizelimit Next.js 공식 문서}
     */
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  /**
   * 라우트 파일에 대한 타입 생성
   * @see {@link https://nextjs.org/docs/app/api-reference/config/next-config-js/typedRoutes Next.js 공식 문서}
   */
  typedRoutes: true,

  /**
   * Next.js는 기본적으로 Webpack 캐시를 활성화하여 빌드 속도를 빠르게 함.
   * 빌드시, 메모리 + 파일 크기가 커지는 문제가 있어 비활성화.(`.next/cache/webpack/` 용량이 500MB 에서 0으로 감소)
   * 빌드 속도는 좀 느려질 수 있지만, 파일 크기 차이가 커서 비활성화
   * @see {@link https://nextjs.org/docs/app/guides/memory-usage#disable-webpack-cache Next.js 공식 문서}
   */
  webpack: (config, { dev }) => {
    if (config.cache && !dev) {
      config.cache = Object.freeze({
        type: 'memory',
      });
    }
    // Important: return the modified config
    return config;
  },

  // 서비스 워커 헤더 추가
  headers: async () => {
    return [
      // 모든 요청에 공통 적용되는 헤더
      {
        source: '/(.*)',
        headers: [
          // 스니핑은 악성 스크립트 삽입(XSS) 위험이 있으므로 막는 것이 안전
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // 페이지가 <iframe> 안에 로드되는 것을 완전히 금지
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // 링크를 클릭하거나 리다이렉트할 때 Referer 헤더에 출처(origin)까지만 전송
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      // 서비스 워커(service-worker.js) 전용 헤더
      {
        source: '/service-worker.js',
        headers: [
          // 서비스워커 파일을 자바스크립트로 명시적 선언
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          // 브라우저나 프록시 캐시에 저장하지 않도록 지시 (서비스워커는 변경 시 즉시 갱신되어야 하므로 캐시 금지 필수)
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          // 모든 리소스(default-src)와 스크립트(script-src)는 `동일 출처(‘self’)`에서만 로드 가능
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [['remark-gfm', { singleTilde: false }] as any, ['remark-frontmatter'], ['remark-mdx-frontmatter']],
    rehypePlugins: [['rehype-code-meta'] as any],
  },
});

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(withMDX(nextConfig));
