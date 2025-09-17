export const DOTS = 'dots';

/**
 * 페이지네이션 범위를 계산하는 유틸리티 함수
 * (서버 & 클라이언트 컴포넌트에서 사용 가능)
 *
 * @example
 * const paginationRange = calculatePaginationRange({
 *   total: 100,
 *   siblings: 1,
 *   boundaries: 1,
 *   activePage: 1,
 * });
 * console.log(paginationRange); // [1, 2, 3, 'dots', 8, 9, 10]
 */
export function calculatePaginationRange({
  total,
  siblings = 1,
  boundaries = 1,
  activePage,
}: {
  total: number;
  siblings?: number;
  boundaries?: number;
  activePage: number;
}): (number | 'dots')[] {
  const _total = Math.max(Math.trunc(total), 0);
  const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;

  if (totalPageNumbers >= _total) {
    return range(1, _total);
  }

  const leftSiblingIndex = Math.max(activePage - siblings, boundaries);
  const rightSiblingIndex = Math.min(activePage + siblings, _total - boundaries);

  const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
  const shouldShowRightDots = rightSiblingIndex < _total - (boundaries + 1);

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = siblings * 2 + boundaries + 2;
    return [...range(1, leftItemCount), DOTS, ...range(_total - (boundaries - 1), _total)];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = boundaries + 1 + 2 * siblings;
    return [...range(1, boundaries), DOTS, ...range(_total - rightItemCount, _total)];
  }

  return [
    ...range(1, boundaries),
    DOTS,
    ...range(leftSiblingIndex, rightSiblingIndex),
    DOTS,
    ...range(_total - boundaries + 1, _total),
  ];
}

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}
