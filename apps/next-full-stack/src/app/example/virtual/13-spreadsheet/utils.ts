// 인덱스를 A, B, C... Z, AA, AB... ZZ 형태로 변환하는 함수
export function indexToColumnLabel(index: number) {
  let result = '';
  while (index >= 0) {
    result = String.fromCharCode(65 + (index % 26)) + result;
    index = Math.floor(index / 26) - 1;
  }
  return result;
}
