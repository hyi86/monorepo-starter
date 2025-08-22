import { Button } from '@monorepo-starter/ui/components/button';
import { signout } from '~/common/actions/signout-actions';
import { checkAuthorization } from '~/common/lib/check-auth';

export default async function ProtectPage() {
  const { isAuthenticated, payload } = await checkAuthorization();
  const signoutWithParams = signout.bind(null, '/example/auth');

  return (
    <div>
      <h1>인증: Protect 페이지</h1>
      {isAuthenticated ? <p>Welcome, User ID: {payload?.sub}</p> : <p>Unauthorized</p>}
      {isAuthenticated && (
        <form action={signoutWithParams}>
          <Button type="submit" variant={'outline'}>
            로그아웃
          </Button>
        </form>
      )}
    </div>
  );
}
