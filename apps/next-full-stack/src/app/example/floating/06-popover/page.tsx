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

export default function Floating06Popover() {
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
      <h2 className="mb-4 text-xl font-bold">Popover</h2>
      <button
        ref={refs.setReference}
        onClick={() => setIsOpen(!isOpen)}
        className="rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
      >
        정보 보기
      </button>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="z-50 max-w-sm rounded-lg border border-gray-300 bg-white p-4 shadow-lg"
          {...getFloatingProps()}
          tabIndex={-1}
        >
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-blue-100 p-2">
              <span className="text-lg text-blue-600">ℹ️</span>
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-semibold text-gray-900">팝오버 제목</h3>
              <p className="mb-3 text-sm text-gray-600">
                이것은 floating-ui를 사용한 팝오버입니다. 다양한 정보를 표시할 수 있습니다.
                <br />
                <span className="text-xs text-gray-500">ESC 키로 닫을 수 있습니다.</span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
                >
                  닫기
                </button>
                <button
                  onClick={() => {
                    alert('더 알아보기 클릭됨!');
                    setIsOpen(false);
                  }}
                  className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                >
                  더 알아보기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
