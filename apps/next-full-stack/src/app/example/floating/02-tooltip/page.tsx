'use client';

import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { useState } from 'react';

export default function Floating02Tooltip() {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift()],
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
      <h2 className="mb-4 text-xl font-bold">Tooltip</h2>
      <button
        ref={refs.setReference}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        마우스를 올려보세요
      </button>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="z-50 rounded bg-gray-800 px-3 py-2 text-sm text-white shadow-lg"
          {...getFloatingProps()}
          tabIndex={-1}
        >
          이것은 툴팁입니다! (ESC로 닫기)
        </div>
      )}
    </div>
  );
}
