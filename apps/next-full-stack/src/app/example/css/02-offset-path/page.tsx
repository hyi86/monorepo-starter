'use client';

import { useState } from 'react';

/**
 * OffsetPathDemo
 * - 클릭으로 경로( SVG path )를 따라 원(circle)이 0% → 100% 이동
 * - CSS만으로 구현(자바스크립트는 토글 상태 관리만)
 * - 단일 파일 컴포넌트
 */
export default function OffsetPathDemo() {
  const [atEnd, setAtEnd] = useState(false);

  // 시각화용: CSS의 offset-path와 동일한 d 값을 SVG에 그려줍니다.
  const d = 'M 16,140 Q 160,16 304,140';

  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        display: 'grid',
        placeItems: 'center',
        minHeight: '70vh',
        padding: 16,
      }}
    >
      <div
        style={{
          width: 360,
          height: 200,
          position: 'relative',
          border: '1px solid #e5e5e5',
          borderRadius: 12,
          background: '#fafafa',
          overflow: 'hidden',
        }}
        onClick={() => setAtEnd((v) => !v)}
        role="button"
        aria-label="경로 애니메이션 토글"
        title="클릭하면 이동/되돌아옵니다"
      >
        {/* SVG로 경로를 살짝 보여줍니다(미니 가이드라인) */}
        <svg viewBox="0 0 320 160" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} aria-hidden>
          <path d={d} fill="none" stroke="#ddd" strokeWidth={2} />
        </svg>

        {/* 이동하는 요소 */}
        <div
          style={{
            // 핵심: offset-* 속성
            offsetPath: `path("${d}")`,
            offsetRotate: 'auto', // 진행방향으로 회전(원은 티 안 나지만 데모용으로 둠)
            // 진행률: 0% ↔ 100% (transition으로 부드럽게)
            // 표준 속성명은 offset-distance 입니다.
            offsetDistance: atEnd ? '100%' : '0%',

            // 모션
            transition: 'offset-distance 1200ms cubic-bezier(.22,.61,.36,1)',

            // 비주얼
            position: 'absolute',
            width: 18,
            height: 18,
            background: '#111',
            borderRadius: '50%',
            boxShadow: '0 2px 6px rgba(0,0,0,.15)',
            // 초기 위치 기준점(필요 시): offsetPosition 로 보정 가능
            // offsetPosition: "auto 0 0"  // 대부분은 기본값(auto)로 충분
          }}
        />

        {/* 안내 라벨 */}
        <div
          style={{
            position: 'absolute',
            left: 12,
            bottom: 12,
            padding: '6px 10px',
            fontSize: 12,
            color: '#555',
            background: 'rgba(255,255,255,.9)',
            border: '1px solid #eee',
            borderRadius: 8,
          }}
        >
          {atEnd ? '클릭: 처음으로' : '클릭: 끝까지 이동'}
        </div>
      </div>

      {/* 접근성: 모션 감소 선호 시 즉시 점프 */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [role="button"] > div[style*="offset-path"] {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
