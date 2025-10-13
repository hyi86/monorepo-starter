'use client';

import { Checkbox } from '@monorepo-starter/ui/components/checkbox';
import { Label } from '@monorepo-starter/ui/components/label';
import { useState } from 'react';

export default function FormCheckboxPage() {
  const gridSize = 10; // 10x10 그리드
  const data = Array.from({ length: gridSize * gridSize }, (_, index) => index);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null);

  const getRow = (index: number) => Math.floor(index / gridSize);
  const getCol = (index: number) => index % gridSize;

  const handleCheckboxClick = (index: number, event: React.MouseEvent) => {
    if (event.shiftKey && lastClickedIndex !== null) {
      // Shift + Click: 2D 그리드 범위 선택
      const newCheckedItems = new Set(checkedItems);

      // 마지막 클릭된 항목의 상태를 기준으로 범위 내 모든 항목을 동일한 상태로 설정
      const lastClickedState = checkedItems.has(lastClickedIndex);

      const startRow = Math.min(getRow(lastClickedIndex), getRow(index));
      const endRow = Math.max(getRow(lastClickedIndex), getRow(index));
      const startCol = Math.min(getCol(lastClickedIndex), getCol(index));
      const endCol = Math.max(getCol(lastClickedIndex), getCol(index));

      // 사각형 범위 내 모든 항목을 선택/해제
      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          const itemIndex = row * gridSize + col;
          if (lastClickedState) {
            newCheckedItems.add(itemIndex);
          } else {
            newCheckedItems.delete(itemIndex);
          }
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
      <p className="mb-4 text-sm text-gray-600">💡 Shift + Click으로 2D 그리드 범위 선택이 가능합니다</p>
      <div className="grid w-fit grid-cols-10 gap-4">
        {data.map((item) => (
          <div className="flex items-center justify-between gap-2 bg-amber-50" key={item}>
            <Checkbox
              id={`checkbox-${item}`}
              checked={checkedItems.has(item)}
              onClick={(event) => handleCheckboxClick(item, event)}
            />
            <Label htmlFor={`checkbox-${item}`}>{item}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
