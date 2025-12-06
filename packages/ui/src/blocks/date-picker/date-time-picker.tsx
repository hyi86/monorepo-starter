'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { ButtonGroup, ButtonGroupText } from '@monorepo-starter/ui/components/button-group';
import { Calendar } from '@monorepo-starter/ui/components/calendar';
import { Label } from '@monorepo-starter/ui/components/label';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@monorepo-starter/ui/components/select';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { zerofill } from '@monorepo-starter/utils/number';
import { formatISO9075, isValid, set, setHours, setMinutes } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon, ClockIcon, XIcon } from 'lucide-react';
import { ComponentProps, useCallback, useState } from 'react';
import { useControlledValue } from './use-date-picker';
import { DatePreset, parseDatePresetValue } from './utils';

type DateTimePickerInputProps = {
  className?: string;
  presets?: DatePreset[];
  value?: Date;
  onChange?: (value: Date | undefined) => void;
} & Omit<ComponentProps<typeof Calendar>, 'mode' | 'onSelect'>;

export function DateTimePicker({ className, presets = [], value, onChange, ...props }: DateTimePickerInputProps) {
  const { displayValue, updateValue } = useControlledValue({
    value,
    onChange,
    initialValue: value,
  });
  const [month, setMonth] = useState<Date | undefined>(value || undefined);

  // 값 초기화
  const handleClear = useCallback(() => {
    updateValue(undefined);
  }, [updateValue]);

  // Preset 값 선택 시 값 변경
  const handleChangePreset = useCallback(
    (preset: DatePreset) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const date = parseDatePresetValue(preset.from);
      if (!date) {
        return;
      }

      const normalizedDate = set(date, { hours: 0, minutes: 0, seconds: 0 });
      setMonth(normalizedDate);
      updateValue(normalizedDate);
    },
    [updateValue],
  );

  // 캘린더 선택 시 값 변경
  const handleChangeCalendar = useCallback(
    (date: Date | undefined) => {
      if (!date) {
        return;
      }

      const prevHour = displayValue?.getHours() ?? 0;
      const prevMinute = displayValue?.getMinutes() ?? 0;
      const newDate = set(date, { hours: prevHour, minutes: prevMinute, seconds: 0 });
      updateValue(newDate);
    },
    [displayValue, updateValue],
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

      const prevHour = displayValue?.getHours() ?? 0;
      const prevMinute = displayValue?.getMinutes() ?? 0;
      const normalizedDate = set(newDate, { hours: prevHour, minutes: prevMinute, seconds: 0 });
      updateValue(normalizedDate);
    },
    [displayValue, updateValue],
  );

  // 시간 입력 시 값 변경
  const handleChangeTime = useCallback(
    (type: 'hour' | 'minute') => (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = e.target.valueAsNumber;
      if (Number.isNaN(num)) {
        return;
      }

      // displayValue가 없으면 오늘 날짜를 기본값으로 사용
      const baseDate = displayValue ?? set(new Date(), { hours: 0, minutes: 0, seconds: 0 });
      const prevHour = displayValue?.getHours() ?? 0;

      if (type === 'hour') {
        updateValue(setHours(baseDate, Number(num)));
      } else if (type === 'minute') {
        // 시간을 유지하면서 분만 변경
        const dateWithHour = setHours(baseDate, prevHour);
        updateValue(setMinutes(dateWithHour, Number(num)));
      }
    },
    [displayValue, updateValue],
  );

  return (
    <div
      className={cn(
        'focus-within:border-ring focus-within:ring-ring/50 flex w-fit items-center rounded-md border shadow-xs focus-within:ring-[3px]',
        className,
      )}
    >
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
            locale={ko}
            mode="single"
            captionLayout="dropdown"
            month={month}
            classNames={{
              dropdowns: 'flex flex-row-reverse gap-2',
            }}
            onMonthChange={setMonth}
            selected={displayValue}
            onSelect={handleChangeCalendar}
            numberOfMonths={2}
            {...props}
          />
          <div className="mb-4 flex justify-center gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground col-span-2 px-2 text-xs">시간 선택</Label>
              <ButtonGroup className="rounded-md border">
                <ButtonGroupText className="bg-background text-muted-foreground border-none pr-1 pl-2 shadow-none">
                  <ClockIcon className="size-4" />
                </ButtonGroupText>
                <Select
                  value={displayValue?.getHours().toString().padStart(2, '0') ?? undefined}
                  onValueChange={(selectedValue) => {
                    if (!displayValue) {
                      return;
                    }
                    updateValue(setHours(displayValue, Number(selectedValue)));
                  }}
                >
                  <SelectTrigger
                    className="w-6 justify-start border-none px-1 shadow-none"
                    size="sm"
                    aria-label="시간 선택"
                  >
                    <SelectValue placeholder="hh" />
                  </SelectTrigger>
                  <SelectContent className="min-w-[5rem] p-0">
                    <SelectGroup>
                      {Array.from({ length: 24 }, (_, index) => index).map((hour) => (
                        <SelectItem key={hour} value={hour.toString().padStart(2, '0')}>
                          {hour.toString().padStart(2, '0')}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <ButtonGroupText className="bg-background border-none px-1 shadow-none">:</ButtonGroupText>
                <Select
                  value={displayValue?.getMinutes().toString().padStart(2, '0') ?? undefined}
                  onValueChange={(selectedValue) => {
                    if (!displayValue) {
                      return;
                    }
                    updateValue(setMinutes(displayValue, Number(selectedValue)));
                  }}
                >
                  <SelectTrigger
                    className="w-9 justify-start border-none px-1 shadow-none"
                    size="sm"
                    aria-label="분 선택"
                  >
                    <SelectValue placeholder="mm" />
                  </SelectTrigger>
                  <SelectContent className="min-w-[6rem] p-0">
                    <SelectGroup>
                      {Array.from({ length: 60 }, (_, index) => index).map((minute) => (
                        <SelectItem key={minute} value={minute.toString().padStart(2, '0')}>
                          {minute.toString().padStart(2, '0')}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </ButtonGroup>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <input
        type="date"
        className="w-20 text-sm tracking-tighter focus-visible:outline-0 [&::-webkit-calendar-picker-indicator]:hidden"
        value={displayValue ? formatISO9075(displayValue, { representation: 'date' }) : ''}
        onChange={handleChangeDate}
        aria-label="날짜 선택"
      />

      <input
        type="number"
        className="w-5 text-center text-sm focus-visible:outline-0 [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
        min={0}
        max={23}
        placeholder="00"
        aria-label="시간 선택"
        value={displayValue?.getHours().toString().padStart(2, '0') ?? '00'}
        onChange={handleChangeTime('hour')}
        onBlur={(e) => {
          const num = e.target.valueAsNumber;
          if (!Number.isNaN(num) && num >= 0 && num <= 23) {
            e.target.value = zerofill(num, 2);
          }
        }}
      />
      <span>:</span>
      <input
        type="number"
        className="w-5 text-center text-sm focus-visible:outline-0 [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
        min={0}
        max={59}
        placeholder="00"
        aria-label="분 선택"
        value={displayValue?.getMinutes().toString().padStart(2, '0') ?? '00'}
        onChange={handleChangeTime('minute')}
        onBlur={(e) => {
          const num = e.target.valueAsNumber;
          if (!Number.isNaN(num) && num >= 0 && num <= 59) {
            e.target.value = zerofill(num, 2);
          }
        }}
      />

      <Button
        variant="ghost"
        size="icon-sm"
        className={cn(
          'focus-visible:text-foreground rounded-full focus-visible:ring-0',
          isValid(displayValue) ? 'visible' : 'invisible',
        )}
        onClick={handleClear}
        aria-label="날짜 및 시간 초기화"
      >
        <XIcon className="text-muted-foreground" />
      </Button>
    </div>
  );
}
