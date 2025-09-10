/**
 * value 가 최소값 이하일 경우 최소값으로, 최대값 이상은 최대값으로 처리
 * @example
 * clamp(120, 50, 100); // 100
 * clamp(10, 15, 20);   // 15
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
