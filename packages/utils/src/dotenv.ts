/**
 * 환경변수 문자열을 JSON 객체로 변환
 */
export function parseEnvToJson(raw: string) {
  const lines = raw.split('\n');
  const result: Record<string, string> = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (key) {
      result[key] = rest.join('=').replace(/^['"]|['"]$/g, '');
    }
  }

  return result;
}

/**
 * JSON 객체를 환경변수 문자열로 변환
 */
export function convertJsonToEnv(json: Record<string, string>) {
  const lines = Object.entries(json).map(([key, value]) => `${key}=${String(value)}`);
  return lines.join('\n');
}
