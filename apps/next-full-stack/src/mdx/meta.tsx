export function parseRawMeta(meta?: string): Record<string, string | number | boolean> {
  if (!meta) return {};

  // 1️⃣ 먼저 { ... } 부분 제거
  let cleanedMeta = meta.replace(/\{.*?\}/g, '');

  cleanedMeta = cleanedMeta.replace(/\s+\/\w+\/\s+/, '');

  const result: Record<string, string | number | boolean> = {};

  // 3️⃣ 기존 패턴 parse
  const regex = /(\w+)(?:=(?:"([^"]+)"|'([^']+)'|([^\s]+)))?/g;
  let match;

  while ((match = regex.exec(cleanedMeta)) !== null) {
    const key = match[1];
    const value = match[2] ?? match[3] ?? match[4];

    console.log(key, value);

    if (value === undefined) {
      // flag only → boolean true
      result[key as keyof typeof result] = true;
    } else if (/^\d+$/.test(value)) {
      // 숫자 정수 → number 변환
      result[key as keyof typeof result] = Number(value);
    } else if (/^\d+\.\d+$/.test(value)) {
      // 숫자 소수 → number 변환
      result[key as keyof typeof result] = parseFloat(value);
    } else if (value === 'true') {
      result[key as keyof typeof result] = true;
    } else if (value === 'false') {
      result[key as keyof typeof result] = false;
    } else {
      // 그 외는 string
      result[key as keyof typeof result] = value;
    }
  }

  return result;
}
