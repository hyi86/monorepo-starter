'use client';

import {
  autoUpdate,
  flip,
  FloatingOverlay,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { useState } from 'react';

export default function Floating04Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(10), flip(), shift()],
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
      <h2 className="mb-4 text-xl font-bold">Modal/Overlay</h2>
      <button
        ref={refs.setReference}
        onClick={() => setIsOpen(true)}
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        모달 열기
      </button>

      {isOpen && (
        <>
          <FloatingOverlay
            className="z-10 flex items-center justify-center bg-black/50 bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="z-50 mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            {...getFloatingProps()}
            tabIndex={-1}
          >
            <h3 className="mb-4 text-lg font-bold">모달 제목</h3>
            <p className="mb-4 text-gray-600">
              이것은 floating-ui를 사용한 모달입니다. 배경을 클릭하거나 닫기 버튼을 눌러서 닫을 수 있습니다.
              <br />
              <span className="text-sm text-gray-500">ESC 키로도 닫을 수 있습니다.</span>
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
              >
                취소
              </button>
              <button
                onClick={() => {
                  alert('확인 클릭됨!');
                  setIsOpen(false);
                }}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                확인
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
