import { Button } from '@monorepo-starter/ui/components/button';
import { verifyToken } from '@monorepo-starter/utils/jwt';
import { LogOutIcon } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { env } from '~/env';

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access-token')?.value;
  const refreshToken = cookieStore.get('refresh-token')?.value;

  if (!accessToken || !refreshToken) {
    return <div>No access token or refresh token</div>;
  }

  const decodedAccessToken = await verifyToken({ token: accessToken, secret: env.ACCESS_TOKEN_SECRET });
  const decodedRefreshToken = await verifyToken({ token: refreshToken, secret: env.ACCESS_TOKEN_SECRET });

  return (
    <div>
      <main>Main</main>
      <div>
        <pre>{JSON.stringify({ decodedAccessToken, decodedRefreshToken }, null, 2)}</pre>
      </div>
      <Button asChild variant="destructive">
        <Link href={'?signout'}>
          <LogOutIcon /> Logout
        </Link>
      </Button>
    </div>
  );
}
