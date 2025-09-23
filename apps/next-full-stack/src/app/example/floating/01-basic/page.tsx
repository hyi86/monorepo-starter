'use client';

import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { useRef, useState } from 'react';

const ARROW_HEIGHT = 8;
const GAP = 2;

export default function Floating01Basic() {
  const arrowRef = useRef<SVGSVGElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(ARROW_HEIGHT + GAP), flip(), shift(), arrow({ element: arrowRef })],
  });

  // ESC 키나 외부 클릭으로 floating 요소를 닫는 기능
  const dismiss = useDismiss(context);

  // floating 요소의 포커스 관리를 위한 기능
  const focus = useFocus(context);

  // 접근성을 위한 ARIA 역할과 속성을 제공
  const role = useRole(context);

  // 여러 인터랙션 훅들을 통합하여 DOM props로 변환
  const { getFloatingProps } = useInteractions([dismiss, focus, role]);

  return (
    <div className="p-8">
      <h2 className="mb-4 text-xl font-bold">기본 Floating</h2>
      <button
        ref={refs.setReference}
        onClick={() => setIsOpen(!isOpen)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        {isOpen ? '닫기' : '열기'}
      </button>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="z-50 rounded border bg-white p-4 shadow-lg"
          {...getFloatingProps()}
        >
          <FloatingArrow
            ref={arrowRef}
            context={context}
            className="[&>path:first-of-type]:stroke-muted-foreground z-0 size-3 fill-white"
          />
          <p>이것은 기본 floating 요소입니다!</p>
          <p className="mt-2 text-sm text-gray-500">ESC 키로 닫을 수 있습니다</p>
        </div>
      )}
    </div>
  );
}
