import { Button } from '@monorepo-starter/ui-base/components/button';
import { Input } from '@monorepo-starter/ui-base/components/input';
import { Route } from 'next';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { createTokensAndSetCookies } from '~/shared/auth/auth.utils';

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

  async function createTokensAction(formData: FormData) {
    'use server';

    let userId = formData.get('username') as string;
    if (!userId) {
      userId = 'guest';
    }

    await createTokensAndSetCookies(userId);

    redirect(callback as Route);
  }
  return (
    <div>
      <Suspense fallback={<div>로딩 중...</div>}>
        <form action={createTokensAction} className="flex gap-1">
          <Input type="text" name="username" placeholder="User ID" className="w-fit" />
          <Button type="submit" variant="outline">
            Signin
          </Button>
        </form>
      </Suspense>
    </div>
  );
}
