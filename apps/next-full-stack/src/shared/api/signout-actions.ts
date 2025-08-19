'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { utils } from '~/shared/config/env';

/**
 * 공통 로그아웃 Action
 */
export async function signout(redirectPath?: string) {
  const cookieStore = await cookies();

  cookieStore.delete('access-token');
  cookieStore.delete('refresh-token');

  if (redirectPath) {
    redirect(redirectPath);
  }

  // const pathname = '/';
  let pathname = cookieStore.get('next-pathname')?.value || '/';
  const search = cookieStore.get('next-search')?.value || '';

  if (utils.isProtectedPath(pathname)) {
    pathname = '/';
  }

  const callbackUrl = (pathname + search) as string;
  redirect(callbackUrl);
}
