'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Calendar } from '@monorepo-starter/ui/components/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { formatISO9075, isValid } from 'date-fns';
import { CalendarIcon, XIcon } from 'lucide-react';
import { ComponentProps, useCallback, useState } from 'react';
import { useControlledValue } from './use-date-picker';
import { parseDatePresetValue, type DatePreset } from './utils';

type DatePickerInputProps = {
  className?: string;
  presets?: DatePreset[];
  value?: Date;
  onChange?: (value: Date | undefined) => void;
} & Omit<ComponentProps<typeof Calendar>, 'mode' | 'onSelect'>;

export function DatePicker({ className, presets = [], value, onChange, ...props }: DatePickerInputProps) {
  const { displayValue, updateValue } = useControlledValue({
    value,
    onChange,
    initialValue: value,
  });
  const [month, setMonth] = useState<Date | undefined>(value || undefined);

  // 값 초기화
  const handleClear = () => {
    updateValue(undefined);
  };

  // 프리셋 선택 시 값 변경
  const handleChangePreset = useCallback(
    (preset: DatePreset) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const date = parseDatePresetValue(preset.from);
      if (!date) {
        return;
      }

      setMonth(date);
      updateValue(date);
    },
    [updateValue],
  );

  // 캘린더 선택 시 값 변경
  const handleChangeCalendar = useCallback(
    (date: Date | undefined) => {
      if (!date) {
        return;
      }

      setMonth(date);
      updateValue(date);
    },
    [updateValue],
  );

  // 날짜 입력 시 값 변경
  const handleChangeDate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      if (!inputValue) {
        updateValue(undefined);
        return;
      }

      const newDate = new Date(inputValue);
      if (!isValid(newDate)) {
        return;
      }

      setMonth(newDate);
      updateValue(newDate);
    },
    [updateValue],
  );

  return (
    <div
      className={cn(
        'focus-within:border-ring focus-within:ring-ring/50 flex max-h-9 w-fit items-center rounded-md border ps-2 shadow-xs focus-within:ring-[3px]',
        className,
      )}
    >
      <input
        type="date"
        className="w-20 text-sm tracking-tighter focus-visible:outline-0 [&::-webkit-calendar-picker-indicator]:hidden"
        value={displayValue ? formatISO9075(displayValue, { representation: 'date' }) : ''}
        onChange={handleChangeDate}
        aria-label="날짜 선택"
      />
      <Button
        variant="ghost"
        size="icon-sm"
        className={cn(
          'focus-visible:text-foreground rounded-full focus-visible:ring-0',
          displayValue ? 'visible' : 'invisible',
        )}
        onClick={handleClear}
        aria-label="날짜 초기화"
      >
        <XIcon className="text-muted-foreground" />
      </Button>
      <Popover>
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
            mode="single"
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
        </PopoverContent>
      </Popover>
    </div>
  );
}
