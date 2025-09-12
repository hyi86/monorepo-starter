import { SignJWT, jwtVerify } from 'jose';

/**
 * 인코드 시크릿
 */
function encodeSecret(secret: string) {
  return new TextEncoder().encode(secret);
}

/**
 * jose JWT 기반의 토큰 생성
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
 */
export async function verifyToken({ token, secret }: { token: string; secret: string }) {
  const { payload } = await jwtVerify(token, encodeSecret(secret));
  return payload;
}
