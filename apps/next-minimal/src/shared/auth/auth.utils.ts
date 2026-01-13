import 'server-only';

import { decodeToken, generateToken, verifyToken } from '@monorepo-starter/utils/jwt';
import { cookies } from 'next/headers';
import parseDuration from 'parse-duration';
import { env } from '~/env';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../cookie/cookie.config';

const ACCESS_TOKEN_EXPIRES_IN = '5s';
const REFRESH_TOKEN_EXPIRES_IN = '1d';

/**
 * refresh token 으로 access token 갱신
 * @param refreshTokenPayload - 리프레시 토큰에서 디코딩된 페이로드
 * @returns 새로운 액세스 토큰 또는 null (실패 시)
 */
export async function updateAccessToken(refreshToken: NonNullable<ReturnType<typeof decodeToken>>) {
  try {
    const newAccessToken = await generateToken({
      userId: refreshToken.sub as string,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      secret: env.TOKEN_SECRET_KEY,
    });
    return { newAccessToken, accessTokenExpiresIn: parseDuration(ACCESS_TOKEN_EXPIRES_IN, 's')! };
  } catch (error) {
    console.error(' ✗ updateAccessToken failed:', error);
    return { newAccessToken: null, accessTokenExpiresIn: null };
  }
}

/**
 * 토큰 생성
 */
export async function createTokensAndSetCookies(userId: string) {
  const newAccessToken = await generateToken({
    userId,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    secret: env.TOKEN_SECRET_KEY,
  });

  const newRefreshToken = await generateToken({
    userId,
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    secret: env.TOKEN_SECRET_KEY,
  });

  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_NAME, newAccessToken, {
    maxAge: parseDuration(ACCESS_TOKEN_EXPIRES_IN, 's')!,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });

  cookieStore.set(REFRESH_TOKEN_NAME, newRefreshToken, {
    maxAge: parseDuration(REFRESH_TOKEN_EXPIRES_IN, 's')!,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });
}

/**
 * 토큰 검증
 */
export async function verifyTokens(accessToken: string, refreshToken: string) {
  try {
    const decodedAccessToken = await verifyToken({ token: accessToken, secret: env.TOKEN_SECRET_KEY });
    const decodedRefreshToken = await verifyToken({ token: refreshToken, secret: env.TOKEN_SECRET_KEY });
    return { decodedAccessToken, decodedRefreshToken };
  } catch (error) {
    console.error(' ✗ verifyTokens failed:', error);
    return { decodedAccessToken: null, decodedRefreshToken: null };
  }
}
