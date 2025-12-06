'use client';

import { Badge } from '@monorepo-starter/ui/components/badge';
import { Button } from '@monorepo-starter/ui/components/button';
import { Calendar } from '@monorepo-starter/ui/components/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { formatISO9075 } from 'date-fns';
import { CalendarIcon, XIcon } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useControlledValue } from './use-date-picker';

type MultipleDatePickerProps = {
  value?: Date[];
  onChange?: (value: Date[]) => void;
  maxDisplayCount?: number;
};

export function MultipleDatePicker({ value, onChange, maxDisplayCount = 3 }: MultipleDatePickerProps) {
  const { displayValue, updateValue } = useControlledValue({
    value,
    onChange: onChange
      ? (newValue: Date[] | undefined) => {
          onChange(newValue ?? []);
        }
      : undefined,
    initialValue: value,
  });
  const [month, setMonth] = useState<Date | undefined>();

  // 날짜를 문자열로 변환한 맵 생성 (성능 최적화)
  const dateStringMap = useMemo(() => {
    if (!displayValue || displayValue.length === 0) {
      return new Map<string, Date>();
    }
    return new Map(displayValue.map((date) => [formatISO9075(date, { representation: 'date' }), date]));
  }, [displayValue]);

  // 값 초기화
  const handleClear = useCallback(() => {
    updateValue([]);
  }, [updateValue]);

  // 특정 날짜 제거
  const handleRemoveDate = useCallback(
    (dateString: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const dateToRemove = dateStringMap.get(dateString);
      if (!dateToRemove) {
        return;
      }

      const newValue = displayValue?.filter((d) => d.getTime() !== dateToRemove.getTime()) ?? [];
      updateValue(newValue);
    },
    [displayValue, dateStringMap, updateValue],
  );

  // 날짜 표시 형식 결정 (메모이제이션)
  const displayContent = useMemo(() => {
    if (!displayValue || displayValue.length === 0) {
      return null;
    }

    const formattedDates = Array.from(dateStringMap.keys());

    if (displayValue.length <= maxDisplayCount) {
      return formattedDates.map((dateString) => (
        <Badge variant="outline" key={dateString} className="text-sm">
          {dateString}
          <button
            type="button"
            className="cursor-pointer focus-visible:outline-0"
            onClick={handleRemoveDate(dateString)}
            aria-label={`${dateString} 제거`}
            tabIndex={-1}
          >
            <XIcon className="text-muted-foreground size-3" />
          </button>
        </Badge>
      ));
    }

    const firstMaxCount = formattedDates.slice(0, maxDisplayCount).map((dateString) => (
      <Badge variant="outline" key={dateString} className="text-sm">
        {dateString}
        <button
          type="button"
          className="cursor-pointer focus-visible:outline-0"
          onClick={handleRemoveDate(dateString)}
          aria-label={`${dateString} 제거`}
          tabIndex={-1}
        >
          <XIcon className="text-muted-foreground size-3" />
        </button>
      </Badge>
    ));

    const remaining = displayValue.length - maxDisplayCount;
    return (
      <div className="flex items-center gap-1.5">
        {firstMaxCount} <Badge variant="secondary">+{remaining}</Badge>
      </div>
    );
  }, [displayValue, dateStringMap, maxDisplayCount, handleRemoveDate]);

  return (
    <div
      className={cn(
        'focus-within:border-ring focus-within:ring-ring/50 border-input relative flex min-h-8 w-fit items-center gap-1 rounded-md border py-0.5 shadow-xs focus-within:ring-[3px]',
      )}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon-sm" className="w-fit px-2 focus-visible:ring-0" aria-label="캘린더 열기">
            <CalendarIcon className="text-muted-foreground cursor-pointer" />
            {(!displayValue || displayValue.length === 0) && (
              <span className="text-muted-foreground ml-2 text-sm">날짜를 선택해주세요</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="start">
          <Calendar
            mode="multiple"
            captionLayout="dropdown"
            classNames={{
              dropdowns: 'flex flex-row-reverse gap-2',
            }}
            month={month}
            onMonthChange={setMonth}
            selected={displayValue}
            onSelect={(dates) => {
              if (!dates) {
                return;
              }
              updateValue(dates);
            }}
          />
        </PopoverContent>
        {displayValue && displayValue.length > 0 && (
          <>
            {displayContent}
            <Button variant="ghost" size="icon-sm" onClick={handleClear} aria-label="모든 날짜 제거" tabIndex={-1}>
              <XIcon className="text-muted-foreground" />
            </Button>
          </>
        )}
      </Popover>
    </div>
  );
}
