import { Button } from '@monorepo-starter/ui/components/button';
import { generateToken } from '@monorepo-starter/utils/jwt';
import { Route } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { env } from '~/env';

export default async function SigninPage({ searchParams }: PageProps<'/signin'>) {
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
