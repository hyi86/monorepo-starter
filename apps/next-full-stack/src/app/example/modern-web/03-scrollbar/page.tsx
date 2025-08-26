import { Badge } from '@monorepo-starter/ui/components/badge';

export default function ScrollbarDemo() {
  return (
    <div
      style={{
        width: 300,
        height: 200,
        border: '1px solid #ddd',
        borderRadius: 12,
        overflow: 'auto',

        // 스크롤바 관련 CSS
        scrollbarGutter: 'stable both-edges',
        scrollbarColor: '#444 #ccc', // thumb: 어두움, track: 밝음
      }}
      className="scrollable"
    >
      <div style={{ padding: 16 }}>
        <h2>
          Scrollbar Demo <Badge>Stable</Badge>
        </h2>
        <p>
          아래 박스는 <code>scrollbar-gutter</code>와<code>scrollbar-color</code>를 적용한 영역입니다.
        </p>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i}>Line {i + 1}: 스크롤 테스트용 텍스트입니다.</p>
        ))}
      </div>

      {/* Firefox/Chrome WebKit 계열 전용 커스터마이즈 (선택적) */}
      <style>{`
        .scrollable::-webkit-scrollbar {
          width: 10px;
        }
        .scrollable::-webkit-scrollbar-thumb {
          background-color: #444;
          border-radius: 8px;
        }
        .scrollable::-webkit-scrollbar-track {
          background-color: #ccc;
        }
      `}</style>
    </div>
  );
}
