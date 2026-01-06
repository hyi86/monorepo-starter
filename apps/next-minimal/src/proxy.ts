import { delay } from '@monorepo-starter/utils/fn';
import { type NextFetchEvent, type NextRequest, NextResponse } from 'next/server';
import { gray, green } from 'picocolors';
import { serverCookieBaseOptions } from './shared/cookies/config';
import { getLocale } from './shared/i18n/locale';

/**
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/proxy Proxy}
 */
export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const response = NextResponse.next();

  // 현재 페이지 URL 정보를 쿠키에 저장 (세션 쿠키 활용)
  response.cookies.set('next-host', request.nextUrl.host, serverCookieBaseOptions); // localhost:3000
  response.cookies.set('next-hostname', request.nextUrl.hostname, serverCookieBaseOptions); // localhost
  response.cookies.set('next-pathname', request.nextUrl.pathname, serverCookieBaseOptions);
  response.cookies.set('next-search', request.nextUrl.search, serverCookieBaseOptions);

  // 언어 설정
  const locale = getLocale(request);
  response.cookies.set('locale', locale, { ...serverCookieBaseOptions, maxAge: 60 * 60 * 24 }); // 1 days

  // waitUntil은 응답 반환 후에도 백그라운드 작업을 계속 실행할 수 있게 함
  // 데이터 외부 전송, 캐시 업데이트 등
  event.waitUntil(
    (async () => {
      try {
        console.log(`○ waitUntil ${gray('running...')}`);
        await delay(3000);
        console.log(`✓ waitUntil ${green('done')}`);
      } catch (error) {
        console.error('[Proxy] waitUntil failed:', error);
      }
    })(),
  );

  return response;
}

export const config = {
  /**
   * 다음 경로를 제외
   * - /api/* (API routes)
   * - /_next/static (static files)
   * - /_next/image (image optimization files)
   * - robots.txt, sitemap.xml, manifest.webmanifest
   * - service-worker.js
   * - *.png, *.jpg, *.jpeg, *.gif, *.svg, *.webp, *.ico
   */
  matcher: [
    '/((?!api|_next/static|_next/image|robots.txt|sitemap.xml|manifest.webmanifest|service-worker.js|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)',
  ],
};
