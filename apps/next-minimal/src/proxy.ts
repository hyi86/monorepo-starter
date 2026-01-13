import { decodeToken } from '@monorepo-starter/utils/jwt';
import { type NextRequest, NextResponse } from 'next/server';
import { blueBright, dim, green, red, yellow } from 'picocolors';
import { updateAccessToken } from '~/shared/auth/auth.utils';
import { cookieOptions } from '~/shared/cookie/cookie.utils';
import { AvailableLocales, getAvailableLocales, getLocaleInHeaders } from '~/shared/i18n/i18n.utils';
import { makeLoggerPath } from '~/shared/logger/logger.utils';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from './shared/cookie/cookie.config';

/**
 * Next Middleware
 *
 * 추가 searchParams 파라미터
 * - locale={locale} - 언어 수동 설정
 * - signout - 로그아웃 처리
 *
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/proxy Proxy}
 */
export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const nextUrl = request.nextUrl;

  console.log(` ┌ Start ${green('proxy.ts')} ${makeLoggerPath(nextUrl)}`);

  /**
   * 다국어 처리
   * 1) cookie 에 locale 값이 없으면, 시스템 기본 언어 설정 후, cookie에 저장
   * 2) ?locale={locale} 요청 시, 지정된 locale 설정 후, 리다이렉트(요청 재실행)
   */

  // 1) 언어 자동 설정
  if (!request.cookies.get('locale')) {
    console.log(` │ Set ${yellow('auto locale')}`);
    response.cookies.set('locale', getLocaleInHeaders(request), cookieOptions({ maxAge: 60 * 60 * 24 }));
  }

  // 2) 언어 수동 설정 (?locale=ko) 요청 시, 지정된 locale 설정 후, 리다이렉트(요청 재실행)
  if (nextUrl.searchParams.has('locale')) {
    console.log(` │ Set ${yellow('manual locale')}`);
    const availableLocales = getAvailableLocales();
    const locale = nextUrl.searchParams.get('locale');
    if (locale && availableLocales.includes(locale as AvailableLocales)) {
      response.cookies.set('locale', locale, cookieOptions({ maxAge: 60 * 60 * 24 }));

      // locale searchParams를 제거한 새로운 URL 생성
      const newUrl = nextUrl.clone();
      newUrl.searchParams.delete('locale');

      // searchParams가 제거된 URL로 리다이렉트 (쿠키 포함)
      console.log(` └ Redirect to ${blueBright(makeLoggerPath(newUrl))}`);
      return NextResponse.redirect(newUrl, { headers: response.headers });
    }
  }

  /**
   * 로그아웃 처리
   * searchParams 에 signout 값이 있으면, 로그아웃 처리
   */
  if (nextUrl.searchParams.has('signout')) {
    console.log(` │ Delete ${red(ACCESS_TOKEN_NAME)} and ${red(REFRESH_TOKEN_NAME)}`);
    response.cookies.delete(ACCESS_TOKEN_NAME);
    response.cookies.delete(REFRESH_TOKEN_NAME);

    // signout searchParams를 제거한 새로운 URL 생성
    const newUrl = nextUrl.clone();
    newUrl.searchParams.delete('signout');

    console.log(` │ Logout to ${red(makeLoggerPath(newUrl))}`);
    return NextResponse.redirect(newUrl, { headers: response.headers });
  }

  const isAllowedPath = nextUrl.pathname.match(/^\/(signin|signup)$/);

  /**
   * 인증 확인
   */

  if (!isAllowedPath) {
    /**
     * 엑세스 토큰 검증
     * 1) 엑세스 토큰 검증 후, 응답 리턴
     * 2) 엑세스 토큰 없는 상태에서, 리프레시 토큰 검증 후, 새로운 엑세스 토큰 생성, 쿠키에 저장 후 응답
     * 3) 모든 토큰이 없거나 비정상인 상태면 로그인 페이지로 리다이렉트
     */

    // 1) 엑세스 토큰 검증
    const accessToken = request.cookies.get(ACCESS_TOKEN_NAME)?.value;
    if (accessToken) {
      console.log(` │ Verify ${yellow('access token')} ${dim(accessToken.slice(0, 20))}...`);
      // 엑세스 토큰 검증 후, 정상이면 응답 리턴
      const accessTokenValue = decodeToken(accessToken);
      if (accessTokenValue) {
        console.log(` └ ${green('Valid access token')}`);
        return response;
      } else {
        response.cookies.delete(ACCESS_TOKEN_NAME);
        console.log(` │ ${red('Invalid access token')}`);
      }
    } else {
      console.log(` │ ${yellow('No access token')}`);
    }

    // 2) 리프레시 토큰 검증
    const refreshToken = request.cookies.get(REFRESH_TOKEN_NAME)?.value;
    if (refreshToken) {
      console.log(` │ Verify ${yellow('refresh token')} ${dim(refreshToken.slice(0, 20))}...`);
      // 리프레시 토큰 검증 후, 정상이면 새로운 엑세스 토큰 생성 후, 쿠키에 저장 후 응답 리턴
      const refreshTokenValue = decodeToken(refreshToken);
      if (refreshTokenValue) {
        const { newAccessToken, accessTokenExpiresIn } = await updateAccessToken(refreshTokenValue);
        if (newAccessToken && accessTokenExpiresIn) {
          response.cookies.set(ACCESS_TOKEN_NAME, newAccessToken, cookieOptions({ maxAge: accessTokenExpiresIn }));
          console.log(
            ` └ Valid ${yellow('refresh token')}, update ${green('access token')} ${makeLoggerPath(nextUrl)}`,
          );
          return response;
        }
      }
    } else {
      console.log(` │ ${yellow('No refresh token')}`);
    }

    // 3) 나머지는 모두 로그인 페이지로 리다이렉트
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/signin';
    loginUrl.searchParams.set('callback', nextUrl.pathname + nextUrl.search);
    console.log(` └ Redirect to ${blueBright(makeLoggerPath(loginUrl))}`);
    return NextResponse.redirect(loginUrl, { headers: response.headers });
  }

  /**
   * 허용된 경로
   * /signin, /signup 등 인증이 필요 없는 경로
   */
  console.log(` └ Allowed path ${green('response')} ${makeLoggerPath(nextUrl)}`);
  return response;
}

export const config = {
  /**
   * 다음 경로를 제외
   * - /api/* (API routes)
   * - /_next/static (static files)
   * - /_next/image (image optimization files)
   * - /.well-known (well-known files)
   * - robots.txt, sitemap.xml, manifest.webmanifest
   * - service-worker.js
   * - *.png, *.jpg, *.jpeg, *.gif, *.svg, *.webp, *.ico
   */
  matcher: [
    '/((?!api|_next/static|_next/image|.well-known|robots.txt|sitemap.xml|manifest.webmanifest|service-worker.js|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)',
  ],
};
