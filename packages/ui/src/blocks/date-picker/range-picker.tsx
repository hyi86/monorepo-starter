'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Calendar } from '@monorepo-starter/ui/components/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { differenceInDays, formatISO9075, isAfter, isValid } from 'date-fns';
import { CalendarIcon, XIcon } from 'lucide-react';
import { ComponentProps, useCallback, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useControlledValue } from './use-date-picker';
import { DatePreset, parseDatePresetValue } from './utils';

type RangePickerInputProps = {
  className?: string;
  presets?: DatePreset[];
  value?: DateRange;
  onChange?: (value: DateRange | undefined) => void;
} & Omit<ComponentProps<typeof Calendar>, 'mode' | 'onSelect'>;

/**
 * 날짜 범위 정규화 (fromDate가 toDate보다 크면 스위치)
 */
const normalizeDateRange = (dateRange: DateRange | undefined): DateRange | undefined => {
  if (!dateRange || !dateRange.from || !dateRange.to) {
    return dateRange;
  }

  // fromDate가 toDate보다 크면 스위치
  if (isAfter(dateRange.from, dateRange.to)) {
    return { from: dateRange.to, to: dateRange.from };
  }

  return dateRange;
};

export function RangePicker({ className, presets = [], value, onChange, ...props }: RangePickerInputProps) {
  const { displayValue: rawDisplayValue, updateValue: rawUpdateValue } = useControlledValue({
    value,
    onChange,
    initialValue: value,
  });

  // 날짜 범위 정규화된 표시 값
  const displayValue = useMemo(() => normalizeDateRange(rawDisplayValue), [rawDisplayValue]);

  const [month, setMonth] = useState<Date | undefined>(value?.to || value?.from || undefined);

  // 값 변경 헬퍼 함수 (정규화 포함)
  const updateValue = useCallback(
    (newValue: DateRange | undefined) => {
      const normalizedValue = normalizeDateRange(newValue);
      rawUpdateValue(normalizedValue);
    },
    [rawUpdateValue],
  );

  // 값 초기화
  const handleClear = useCallback(() => {
    updateValue(undefined);
  }, [updateValue]);

  // Preset 값 선택 시 값 변경
  const handleChangePreset = useCallback(
    (preset: DatePreset) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fromDate = parseDatePresetValue(preset.from);
      const toDate = parseDatePresetValue(preset.to);
      if (!fromDate || !toDate) {
        return;
      }

      setMonth(toDate);
      updateValue({ from: fromDate, to: toDate });
    },
    [updateValue],
  );

  // Calendar 선택 시 값 변경
  const handleChangeCalendar = useCallback(
    (date: DateRange | undefined) => {
      if (!date || !date.from || !date.to) {
        return;
      }

      setMonth(date.to);
      updateValue(date);
    },
    [updateValue],
  );

  // 날짜 입력 시 값 변경
  const handleChangeDate = useCallback(
    (type: 'start' | 'end') => (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      if (!inputValue) {
        if (type === 'start') {
          updateValue(displayValue ? { ...displayValue, from: undefined } : undefined);
        } else {
          updateValue(displayValue ? { ...displayValue, to: undefined } : undefined);
        }
        return;
      }

      const newDate = new Date(inputValue);
      if (!isValid(newDate)) {
        return;
      }

      setMonth(newDate);

      if (type === 'start') {
        updateValue(displayValue ? { ...displayValue, from: newDate } : { from: newDate, to: newDate });
      } else {
        updateValue(displayValue ? { ...displayValue, to: newDate } : { from: newDate, to: newDate });
      }
    },
    [displayValue, updateValue],
  );

  return (
    <div
      className={cn(
        'focus-within:border-ring focus-within:ring-ring/50 flex max-h-9 w-fit items-center rounded-md border ps-2 shadow-xs focus-within:ring-[3px]',
        className,
      )}
    >
      <Popover>
        <input
          type="date"
          className="w-20 text-sm tracking-tighter focus-visible:outline-0 [&::-webkit-calendar-picker-indicator]:hidden"
          value={displayValue?.from ? formatISO9075(displayValue.from, { representation: 'date' }) : ''}
          onChange={handleChangeDate('start')}
          aria-label="시작 날짜"
        />
        <span className="text-muted-foreground w-6 text-center" aria-hidden="true">
          ~
        </span>
        <input
          type="date"
          className="w-20 text-sm tracking-tighter focus-visible:outline-0 [&::-webkit-calendar-picker-indicator]:hidden"
          value={displayValue?.to ? formatISO9075(displayValue.to, { representation: 'date' }) : ''}
          onChange={handleChangeDate('end')}
          aria-label="종료 날짜"
        />

        <Button
          variant="ghost"
          size="icon-sm"
          className={cn(
            'focus-visible:text-foreground rounded-full focus-visible:ring-0',
            displayValue?.from && displayValue?.to ? 'visible' : 'invisible',
          )}
          onClick={handleClear}
          aria-label="날짜 범위 초기화"
        >
          <XIcon className="text-muted-foreground" />
        </Button>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon-sm" className="focus-visible:ring-0" aria-label="캘린더 열기">
            <CalendarIcon className="text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {presets.length > 0 && (
            <div className="flex flex-wrap gap-2 border-b p-3">
              {presets.map((preset) => (
                <Button key={preset.from + preset.to} variant="outline" size="sm" onClick={handleChangePreset(preset)}>
                  {preset.label}
                </Button>
              ))}
            </div>
          )}

          <Calendar
            mode="range"
            captionLayout="dropdown"
            classNames={{
              dropdowns: 'flex flex-row-reverse gap-2',
            }}
            month={month}
            onMonthChange={setMonth}
            selected={displayValue}
            onSelect={handleChangeCalendar}
            {...props}
          />
          <div className="flex items-center gap-2 border-t p-4">
            {displayValue &&
              displayValue.from &&
              displayValue.to &&
              `${differenceInDays(displayValue.to, displayValue.from) + 1} 일 선택`}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
