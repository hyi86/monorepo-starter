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

export default function Floating03Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(4), flip(), shift()],
  });

  // ESC 키나 외부 클릭으로 floating 요소를 닫는 기능
  const dismiss = useDismiss(context);

  // floating 요소의 포커스 관리를 위한 기능
  const focus = useFocus(context);

  // 접근성을 위한 ARIA 역할과 속성을 제공
  const role = useRole(context);

  // 여러 인터랙션 훅들을 통합하여 DOM props로 변환
  const { getFloatingProps } = useInteractions([dismiss, focus, role]);

  const menuItems = [
    { label: '프로필', icon: '👤' },
    { label: '설정', icon: '⚙️' },
    { label: '도움말', icon: '❓' },
    { label: '로그아웃', icon: '🚪' },
  ];

  return (
    <div className="p-8">
      <h2 className="mb-4 text-xl font-bold">Dropdown 메뉴</h2>
      <button
        ref={refs.setReference}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
      >
        메뉴 <span className="text-sm">▼</span>
      </button>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="z-50 min-w-[150px] rounded border border-gray-300 bg-white py-2 shadow-lg"
          {...getFloatingProps()}
          tabIndex={-1}
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                alert(`${item.label} 클릭됨!`);
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
