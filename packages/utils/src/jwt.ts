import { SignJWT, jwtVerify } from 'jose'; // Edge runtime OK

/**
 * 코드를 인코딩해서 반환
 */
function encodeSecret(secret: string) {
  return new TextEncoder().encode(secret);
}

/**
 * jose JWT 기반의 토큰 생성
 * @example
 * const token = await generateToken({ userId: '123', expiresIn: '1h', secret: 'secret' });
 */
export async function generateToken({
  userId,
  expiresIn,
  secret,
  payload = {},
}: {
  userId: string;
  expiresIn: string;
  secret: string;
  payload?: Record<string, any>;
}) {
  return new SignJWT({ userId, ...payload })
    .setSubject(userId)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresIn)
    .sign(encodeSecret(secret));
}

/**
 * jose JWT 기반의 토큰 검증
 * @example
 * const payload = await verifyToken({ token: 'token', secret: 'secret' });
 */
export async function verifyToken({ token, secret }: { token: string; secret: string }) {
  const { payload } = await jwtVerify(token, encodeSecret(secret));
  return payload;
}
