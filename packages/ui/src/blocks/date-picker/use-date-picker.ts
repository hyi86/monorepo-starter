import { useCallback, useMemo, useState } from 'react';

/**
 * 제어/비제어 컴포넌트를 지원하는 공통 훅
 */
export function useControlledValue<T>({
  value,
  onChange,
  initialValue,
}: {
  value?: T;
  onChange?: (value: T | undefined) => void;
  initialValue?: T;
}) {
  const isControlled = value !== undefined;
  const [localValue, setLocalValue] = useState<T | undefined>(initialValue);

  const displayValue = useMemo(() => (isControlled ? value : localValue), [isControlled, value, localValue]);

  const updateValue = useCallback(
    (newValue: T | undefined) => {
      if (!isControlled) {
        setLocalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  return { displayValue, updateValue, isControlled };
}
