import type { NextResponse } from 'next/server';

type ResponseCookie = NonNullable<Parameters<NextResponse['cookies']['set']>[2]>;

export const serverCookieBaseOptions: ResponseCookie = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
};
