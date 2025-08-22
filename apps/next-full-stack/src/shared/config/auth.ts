/**
 * 접근 제한 경로
 * - 정규식
 * - 문자열(startsWith로 판단)
 */
export const protectedPaths = [
  /^\/(protect|private|mypage)(\/.*)?$/, // regExp
  '/example/auth/protect', // string(startsWith)
];

/**
 * 접근 제한 경로 확인
 */
export function isProtectedPath(pathValue: string) {
  return protectedPaths.some((path) => (typeof path === 'string' ? pathValue.startsWith(path) : path.test(pathValue)));
}
