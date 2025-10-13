'use client';

import { Checkbox } from '@monorepo-starter/ui/components/checkbox';
import { Label } from '@monorepo-starter/ui/components/label';
import { useState } from 'react';

export default function FormCheckboxPage() {
  const data = Array.from({ length: 100 }, (_, index) => index);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null);

  const handleCheckboxClick = (index: number, event: React.MouseEvent) => {
    if (event.shiftKey && lastClickedIndex !== null) {
      // Shift + Click: 범위 선택
      const start = Math.min(lastClickedIndex, index);
      const end = Math.max(lastClickedIndex, index);
      const newCheckedItems = new Set(checkedItems);

      // 마지막 클릭된 항목의 상태를 기준으로 범위 내 모든 항목을 동일한 상태로 설정
      const lastClickedState = checkedItems.has(lastClickedIndex);

      for (let i = start; i <= end; i++) {
        if (lastClickedState) {
          newCheckedItems.add(i);
        } else {
          newCheckedItems.delete(i);
        }
      }

      setCheckedItems(newCheckedItems);
    } else {
      // 일반 클릭: 단일 항목 토글
      const newCheckedItems = new Set(checkedItems);
      if (newCheckedItems.has(index)) {
        newCheckedItems.delete(index);
      } else {
        newCheckedItems.add(index);
      }
      setCheckedItems(newCheckedItems);
      setLastClickedIndex(index);
    }
  };

  return (
    <div>
      <h1>FormCheckboxPage</h1>
      <p>React Hook Form, Zod, Shadcn/UI, Next Server Action with Checkbox</p>
      <p className="mb-4 text-sm text-gray-600">💡 Shift + Click으로 범위 선택이 가능합니다</p>
      <div className="flex flex-col gap-2">
        {data.map((item) => (
          <div className="flex gap-2" key={item}>
            <Checkbox
              id={`checkbox-${item}`}
              checked={checkedItems.has(item)}
              onClick={(event) => handleCheckboxClick(item, event)}
            />
            <Label htmlFor={`checkbox-${item}`}>Checkbox {item}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
