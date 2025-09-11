import { devLog } from '@henry-hong/common-utils/console';
import { generateToken, verifyToken } from '@henry-hong/common-utils/jwt';
import { type NextRequest, NextResponse } from 'next/server';
import parseDuration from 'parse-duration';
import { isProtectedPath } from '~/shared/config/auth';
import { env } from '~/shared/config/env';

/**
 * 인증관련 설정 - 접근 제한 페이지
 */
export async function authMiddleware(request: NextRequest, response: NextResponse) {
  const { pathname, search } = request.nextUrl;

  // 접근 제한 페이지가 아니면, 리턴
  if (!isProtectedPath(pathname)) {
    return response;
  }

  const accessToken = request.cookies.get('access-token')?.value;
  const refreshToken = request.cookies.get('refresh-token')?.value;
  const signinUrl = new URL(`${env.SIGNIN_PATH}?callbackUrl=${encodeURIComponent(pathname + search)}`, request.url);

  // 엑세스 토큰이 있으면, 엑세스 토큰 검증
  if (accessToken) {
    try {
      await verifyToken({ token: accessToken, secret: env.ACCESS_TOKEN_SECRET });
      return response;
    } catch (error) {
      devLog('error', 'Access token verification failed:', error);

      // 토큰 만료인 경우에만 리프레시 토큰 확인
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        response.cookies.delete('access-token');
        // 리프레시 토큰 확인으로 넘어감
      } else {
        // 다른 오류(서명 불일치, 형식 오류 등)는 즉시 리다이렉트
        const redirectResponse = NextResponse.redirect(signinUrl);
        redirectResponse.cookies.delete('access-token');
        redirectResponse.cookies.delete('refresh-token');
        return redirectResponse;
      }
    }
  }

  // 리프레시 토큰이 있으면, 리프레시 토큰 검증 > 새로운 엑세스 토큰 생성 > 쿠키에 저장 후 리턴
  if (refreshToken) {
    try {
      const { sub } = await verifyToken({ token: refreshToken, secret: env.REFRESH_TOKEN_SECRET });
      const newAccessToken = await generateToken({
        userId: sub!,
        expiresIn: env.ACCESS_TOKEN_SECRET_TIME,
        secret: env.ACCESS_TOKEN_SECRET,
      });
      const maxAge = parseDuration(env.ACCESS_TOKEN_SECRET_TIME, 's') || 60 * 15;
      response.cookies.set('access-token', newAccessToken, { httpOnly: true, secure: true, maxAge });
      return response;
    } catch (error) {
      devLog('error', error);
      const redirectResponse = NextResponse.redirect(signinUrl);
      redirectResponse.cookies.delete('refresh-token');
      return redirectResponse;
    }
  }

  // 엑세스 토큰과 리프레시 토큰이 없으면, 로그인 페이지로 리다이렉트
  return NextResponse.redirect(signinUrl);
}
