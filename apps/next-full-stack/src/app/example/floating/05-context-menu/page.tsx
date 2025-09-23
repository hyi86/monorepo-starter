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
  useTransitionStyles,
} from '@floating-ui/react';
import { useRef, useState } from 'react';

export default function Floating05ContextMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(4), flip(), shift()],
    transform: false,
    strategy: 'fixed',
  });
  const { isMounted, styles } = useTransitionStyles(context, {
    duration: {
      open: 300,
      close: 200,
    },
  });

  // ESC 키나 외부 클릭으로 floating 요소를 닫는 기능
  const dismiss = useDismiss(context);

  // floating 요소의 포커스 관리를 위한 기능
  const focus = useFocus(context);

  // 접근성을 위한 ARIA 역할과 속성을 제공
  const role = useRole(context);

  // 여러 인터랙션 훅들을 통합하여 DOM props로 변환
  const { getFloatingProps } = useInteractions([dismiss, focus, role]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  const contextMenuItems = [
    { label: '복사', icon: '📋', action: () => alert('복사됨!') },
    { label: '붙여넣기', icon: '📄', action: () => alert('붙여넣기됨!') },
    { label: '잘라내기', icon: '✂️', action: () => alert('잘라내기됨!') },
    { label: '삭제', icon: '🗑️', action: () => alert('삭제됨!') },
  ];

  return (
    <div className="p-8">
      <h2 className="mb-4 text-xl font-bold">Context Menu</h2>
      <div
        ref={containerRef}
        onContextMenu={handleContextMenu}
        className="cursor-pointer rounded-lg border-2 border-dashed border-yellow-400 bg-yellow-100 p-8 text-center hover:bg-yellow-200"
      >
        <p className="font-medium text-yellow-800">이 영역에서 마우스 우클릭을 해보세요!</p>
        <p className="mt-2 text-sm text-yellow-600">우클릭하면 컨텍스트 메뉴가 나타납니다. (ESC로 닫기)</p>
      </div>

      {isMounted && (
        <div
          ref={refs.setFloating}
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            ...styles,
          }}
          className="z-50 min-w-[150px] rounded border border-gray-300 bg-white py-2 shadow-lg"
          {...getFloatingProps()}
          tabIndex={-1}
        >
          {contextMenuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.action();
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-gray-100"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
