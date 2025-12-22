import FixedMasonryHorizontal from './masonry';

export default function FixedMasonryHorizontalPage() {
  // 서버 컴포넌트에서는 결정론적인 방법으로 데이터 생성 (인덱스 기반)
  const columns = new Array(100_000).fill(true).map((_, index) => {
    // 결정론적인 해시 함수를 사용하여 랜덤처럼 보이는 값 생성
    const hash = (index * 2654435761) % 2 ** 32;
    return 100 + Math.round((hash / 2 ** 32) * 50);
  });
  return (
    <div>
      <h1>Tanstack Virtual Fixed Masonry Horizontal</h1>
      <FixedMasonryHorizontal columns={columns} />
    </div>
  );
}
