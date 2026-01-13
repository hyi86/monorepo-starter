import { Button } from '@monorepo-starter/ui-base/components/button';
import { format } from 'date-fns';
import { LogOutIcon } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { verifyTokens } from '~/shared/auth/auth.utils';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '~/shared/cookie/cookie.config';

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_NAME)?.value;

  if (!accessToken || !refreshToken) {
    return <div>No access token or refresh token</div>;
  }

  const { decodedAccessToken, decodedRefreshToken } = await verifyTokens(accessToken, refreshToken);

  return (
    <div>
      <main>Main</main>
      <div>
        <pre>{decodedAccessToken?.exp && format(new Date(decodedAccessToken.exp * 1000), 'yyyy-MM-dd HH:mm:ss')}</pre>
        <pre>{decodedRefreshToken?.exp && format(new Date(decodedRefreshToken.exp * 1000), 'yyyy-MM-dd HH:mm:ss')}</pre>
      </div>
      <Button
        variant="destructive"
        nativeButton={false}
        render={
          <Link href={'?signout'}>
            <LogOutIcon /> Logout
          </Link>
        }
      />
    </div>
  );
}
