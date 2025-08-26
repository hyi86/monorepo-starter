export default function ContentVisibilityDemo() {
  return (
    <div
      style={{
        maxWidth: 480,
        margin: '0 auto',
        padding: 16,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1>content-visibility Demo</h1>
      <p>
        아래 카드들은 <code>content-visibility: auto</code>를 사용합니다. 화면에 보이지 않을 땐 렌더링을 건너뛰어 성능을
        최적화합니다.
      </p>

      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="card"
          style={{
            margin: '16px 0',
            padding: 24,
            background: 'white',
            borderRadius: 12,
            border: '1px solid #eee',
            boxShadow: '0 1px 3px rgba(0,0,0,.08)',
            minHeight: 120,

            // 핵심 속성
            contentVisibility: 'auto',
            containIntrinsicSize: '120px', // 미리 공간 확보 (안 하면 높이가 collapse됨)
          }}
        >
          <h2>Card {i + 1}</h2>
          <p>이 카드는 실제로 뷰포트에 나타나기 전까지는 브라우저가 렌더링하지 않습니다.</p>
        </div>
      ))}
    </div>
  );
}
