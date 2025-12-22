import FixedMasonryVertical from './masonry';

export default function FixedMasonryVerticalPage() {
  // 서버 컴포넌트에서는 결정론적인 방법으로 데이터 생성 (인덱스 기반)
  const rows = new Array(100_000).fill(true).map((_, index) => {
    // 결정론적인 해시 함수를 사용하여 랜덤처럼 보이는 값 생성
    const hash = (index * 2654435761) % 2 ** 32;
    return 25 + Math.round((hash / 2 ** 32) * 50);
  });
  return (
    <div>
      <h1>Tanstack Virtual Fixed Masonry Vertical</h1>
      <FixedMasonryVertical rows={rows} />
    </div>
  );
}
