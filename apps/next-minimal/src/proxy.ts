import { match as matchLocale } from '@formatjs/intl-localematcher';
import { decodeToken, generateToken } from '@monorepo-starter/utils/jwt';
import Negotiator from 'negotiator';
import { type NextRequest, NextResponse } from 'next/server';
import { blueBright, dim, green, red, underline, yellow } from 'picocolors';

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
    const locale = getLocale(request);
    response.cookies.set('locale', locale, setCookieOptions({ maxAge: 60 * 60 * 24 }));
  }

  // 2) 언어 수동 설정 (?locale=ko) 요청 시, 지정된 locale 설정 후, 리다이렉트(요청 재실행)
  if (nextUrl.searchParams.has('locale')) {
    const availableLocales = getAvailableLocales();
    console.log(` │ Set ${yellow('manual locale')}`);
    const locale = nextUrl.searchParams.get('locale');
    if (locale && availableLocales.includes(locale as ReturnType<typeof getAvailableLocales>[number])) {
      response.cookies.set('locale', locale, setCookieOptions({ maxAge: 60 * 60 * 24 }));

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
    response.cookies.delete('access-token');
    response.cookies.delete('refresh-token');

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
    const accessToken = request.cookies.get('access-token')?.value;
    if (accessToken) {
      console.log(` │ Verify ${yellow('access token')} ${dim(accessToken.slice(0, 20))}...`);
      // 엑세스 토큰 검증 후, 정상이면 응답 리턴
      const accessTokenValue = decodeToken(accessToken);
      if (accessTokenValue) {
        console.log(` └ Valid ${green('access token')}`);
        return response;
      } else {
        response.cookies.delete('access-token');
        console.log(` │ Invalid ${red('access token')}`);
      }
    } else {
      console.log(` │ No ${dim('access token')}`);
    }

    // 2) 리프레시 토큰 검증
    const refreshToken = request.cookies.get('refresh-token')?.value;
    if (refreshToken) {
      console.log(` │ Verify ${yellow('refresh token')} ${dim(refreshToken.slice(0, 20))}...`);
      // 리프레시 토큰 검증 후, 정상이면 새로운 엑세스 토큰 생성 후, 쿠키에 저장 후 응답 리턴
      const refreshTokenValue = decodeToken(refreshToken);
      if (refreshTokenValue) {
        const newAccessToken = await updateAccessToken(refreshTokenValue);
        if (newAccessToken) {
          response.cookies.set('access-token', newAccessToken, setCookieOptions({ maxAge: 60 * 15 })); // 15분
          console.log(` └ Valid ${green('refresh token')}, update ${green('access token')} ${makeLoggerPath(nextUrl)}`);
          return response;
        }
      }
    } else {
      console.log(` │ No ${dim('refresh token')}`);
    }

    // 3) 나머지는 모두 로그인 페이지로 리다이렉트
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/signin';
    loginUrl.searchParams.set('callback', nextUrl.pathname + nextUrl.search);
    console.log(` └ Redirect to ${blueBright('login page')} ${makeLoggerPath(loginUrl)}`);
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

/**
 * 사용 가능한 언어 목록
 */
function getAvailableLocales() {
  return ['ko', 'en', 'ja'] as const;
}

/**
 * 언어 자동 설정(다국어 처리) - 쿠키에 설정된 언어가 없으면 자동으로 언어 설정 후, 쿠키에 저장
 */
function getLocale(request: NextRequest) {
  const availableLocales = getAvailableLocales();
  // headers 객체를 일반 객체로 변환
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  // 사용 가능한 언어 목록
  const locales = Array.from(availableLocales);
  // 가장 적합한 언어 선택
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);
  // 기본 언어 선택
  const locale = matchLocale(languages, locales, availableLocales[0]);

  return locale;
}

type ResponseCookie = NonNullable<Parameters<NextResponse['cookies']['set']>[2]>;

/**
 * proxy 내에서 setcookie 처리
 */
function setCookieOptions(options?: ResponseCookie) {
  return {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    ...options,
  } as ResponseCookie;
}

/**
 * proxy 내에서 경로
 */
function makeLoggerPath(url: NextRequest['nextUrl'] | URL) {
  return dim(`${url.pathname}${underline(url.search)}`);
}

/**
 * refresh token 으로 access token 갱신
 * @param refreshTokenPayload - 리프레시 토큰에서 디코딩된 페이로드
 * @returns 새로운 액세스 토큰 또는 null (실패 시)
 */
async function updateAccessToken(refreshToken: NonNullable<ReturnType<typeof decodeToken>>) {
  try {
    const newAccessToken = await generateToken({
      userId: refreshToken.sub as string,
      expiresIn: '15m',
      secret: 'secret',
    });
    return newAccessToken;
  } catch (error) {
    console.error(' ✗ updateAccessToken failed:', error);
    return null;
  }
}
