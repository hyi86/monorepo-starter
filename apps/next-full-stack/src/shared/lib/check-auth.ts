import { devLog } from '@henry-hong/common-utils/console';
import { verifyToken } from '@henry-hong/common-utils/jwt';
import { cookies } from 'next/headers';
import { env } from '~/shared/config/env';

export async function checkAuthorization(): Promise<{
  isAuthenticated: boolean;
  payload?: Awaited<ReturnType<typeof verifyToken>>;
}> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access-token')?.value;

  if (!accessToken) {
    return { isAuthenticated: false };
  }

  try {
    const decoded = await verifyToken({ token: accessToken, secret: env.ACCESS_TOKEN_SECRET });
    return { isAuthenticated: true, payload: decoded };
  } catch (error) {
    devLog('error', error);
    return { isAuthenticated: false };
  }
}

export type AuthorizationPayload = Awaited<ReturnType<typeof checkAuthorization>>['payload'];
