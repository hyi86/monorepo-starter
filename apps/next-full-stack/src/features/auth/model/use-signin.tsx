'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/**
 * 클라이언트 전용 로그인 Hook (callbackUrl 파라미터 추가해서 로그인 페이지 이동)
 */
export function useSigninUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  async function handleClickSignin() {
    const callbackUrl = new URL(pathname, window.location.origin);
    searchParams.forEach((value, key) => {
      callbackUrl.searchParams.append(key, value);
    });

    const loginUrl = new URL('/signin', window.location.origin);
    loginUrl.searchParams.append('callbackUrl', callbackUrl.toString());

    router.push(loginUrl.toString());
  }

  return { handleClickSignin };
}
