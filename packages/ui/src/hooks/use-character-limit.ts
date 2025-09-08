'use client';

import { ChangeEvent, useState } from 'react';

type UseCharacterLimitProps = {
  maxLength: number;
  initialValue?: string;
};

/**
 * 텍스트 입력 시 글자 수 제한을 관리하는 React 커스텀 Hook
 * 사용자가 입력할 수 있는 최대 글자 수를 설정하고,
 * 현재 입력된 글자 수를 실시간으로 추적해주는 기능을 제공
 */
export function useCharacterLimit({ maxLength, initialValue = '' }: UseCharacterLimitProps) {
  const [value, setValue] = useState(initialValue);
  const [characterCount, setCharacterCount] = useState(initialValue.length);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setValue(newValue);
      setCharacterCount(newValue.length);
    }
  };

  return {
    value,
    characterCount,
    handleChange,
    maxLength,
  };
}
