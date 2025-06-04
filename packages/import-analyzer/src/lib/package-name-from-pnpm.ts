export function getPackageNameFromPnpmPath(pnpmFullPath: string) {
  const match = pnpmFullPath.match(/\.pnpm\/(.+?)@/);
  if (!match) return null;

  return decodeURIComponent(match[1]!.replace(/\+/g, '/'));
}
