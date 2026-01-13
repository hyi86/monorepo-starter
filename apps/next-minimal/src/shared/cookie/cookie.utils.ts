import { NextResponse } from 'next/server';

/**
 * ResponseCookie 타입
 */
export type ResponseCookie = NonNullable<Parameters<NextResponse['cookies']['set']>[2]>;

/**
 * proxy 내에서 setcookie 처리
 */
export function cookieOptions(options?: ResponseCookie) {
  return {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    ...options,
  } as ResponseCookie;
}
