import { Button } from '@monorepo-starter/ui/components/button';
import { generateToken } from '@monorepo-starter/utils/jwt';
import { Route } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { env } from '~/env';

export default async function SigninPage({ searchParams }: PageProps<'/signin'>) {
  /**
   * connection() 이후의 코드는 프리렌더링에서 제외
   * - Math.random() 같은 랜덤 값 생성
   * - new Date() 같은 현재 시간 사용
   * - 외부 API 호출 결과가 매번 달라야 할 때
   * - 사용자별로 다른 콘텐츠를 보여줘야 할 때
   * - cookies(), headers(), searchParams 같은 Dynamic API를 이미 사용하는 경우는 ❌
   * - 서버 컴포넌트에서만 호출 가능
   */
  await connection();
  const callback = ((await searchParams).callback as string) || '/';

  const handleSubmitAction = async () => {
    'use server';

    const cookieStore = await cookies();
    const newAccessToken = await generateToken({
      userId: 'test',
      expiresIn: '15m',
      secret: env.ACCESS_TOKEN_SECRET,
    });

    const newRefreshToken = await generateToken({
      userId: 'test',
      expiresIn: '1d',
      secret: env.ACCESS_TOKEN_SECRET,
    });

    cookieStore.set('access-token', newAccessToken, { maxAge: 60 * 15 });
    cookieStore.set('refresh-token', newRefreshToken, { maxAge: 60 * 60 * 24 });

    redirect(callback as Route);
  };

  return (
    <div>
      <Suspense fallback={<div>로딩 중...</div>}>
        <form action={handleSubmitAction}>
          <Button type="submit" variant="outline">
            Signin
          </Button>
        </form>
      </Suspense>
    </div>
  );
}
