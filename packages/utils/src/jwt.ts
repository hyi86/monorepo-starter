import { SignJWT, jwtVerify } from 'jose';

function encodeSecret(secret: string) {
  return new TextEncoder().encode(secret);
}

export async function generateToken({
  userId,
  expiresIn,
  secret,
}: {
  userId: string;
  expiresIn: string;
  secret: string;
}) {
  return new SignJWT({ userId })
    .setSubject(userId)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresIn)
    .sign(encodeSecret(secret));
}

export async function verifyToken({ token, secret }: { token: string; secret: string }) {
  const { payload } = await jwtVerify(token, encodeSecret(secret));
  return payload;
}
