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
import { differenceInDays, formatISO9075, isAfter, isValid, set, setHours, setMinutes } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon, ClockIcon, XIcon } from 'lucide-react';
import { ComponentProps, useCallback, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useControlledValue } from './use-date-picker';
import { DatePreset, parseDatePresetValue } from './utils';

type RangeTimePickerInputProps = {
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

export function RangeTimePicker({ className, presets = [], value, onChange, ...props }: RangeTimePickerInputProps) {
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
      updateValue({
        from: set(fromDate, { hours: 0, minutes: 0, seconds: 0 }),
        to: set(toDate, { hours: 23, minutes: 59, seconds: 59 }),
      });
    },
    [updateValue],
  );

  // 캘린더 선택 시 값 변경
  const handleChangeCalendar = useCallback(
    (date: DateRange | undefined) => {
      if (!date || !date.from || !date.to) {
        return;
      }

      const prevFromHour = displayValue?.from?.getHours() ?? 0;
      const prevFromMinute = displayValue?.from?.getMinutes() ?? 0;
      const prevToHour = displayValue?.to?.getHours() ?? 23;
      const prevToMinute = displayValue?.to?.getMinutes() ?? 59;

      setMonth(date.to);
      updateValue({
        from: set(date.from, { hours: prevFromHour, minutes: prevFromMinute, seconds: 0 }),
        to: set(date.to, { hours: prevToHour, minutes: prevToMinute, seconds: 59 }),
      });
    },
    [displayValue, updateValue],
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
        const prevFromHour = displayValue?.from?.getHours() ?? 0;
        const prevFromMinute = displayValue?.from?.getMinutes() ?? 0;
        const newFromDate = set(newDate, { hours: prevFromHour, minutes: prevFromMinute, seconds: 0 });
        updateValue(displayValue ? { ...displayValue, from: newFromDate } : { from: newFromDate, to: newFromDate });
      } else {
        const prevToHour = displayValue?.to?.getHours() ?? 23;
        const prevToMinute = displayValue?.to?.getMinutes() ?? 59;
        const newToDate = set(newDate, { hours: prevToHour, minutes: prevToMinute, seconds: 59 });
        updateValue(displayValue ? { ...displayValue, to: newToDate } : { from: newToDate, to: newToDate });
      }
    },
    [displayValue, updateValue],
  );

  // 시간 입력 시 값 변경
  const handleChangeTime = useCallback(
    (type: 'hour' | 'minute', target: 'from' | 'to') => (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = e.target.valueAsNumber;
      if (Number.isNaN(num)) {
        return;
      }

      // displayValue가 없거나 from/to가 없으면 오늘 날짜를 기본값으로 사용
      const today = set(new Date(), { hours: 0, minutes: 0, seconds: 0 });
      const baseFromDate = displayValue?.from ?? today;
      const baseToDate = displayValue?.to ?? today;

      if (target === 'from') {
        const prevHour = displayValue?.from?.getHours() ?? 0;

        if (type === 'hour') {
          updateValue({
            ...(displayValue ?? {}),
            from: setHours(baseFromDate, Number(num)),
            to: displayValue?.to ?? baseToDate,
          } as DateRange);
        } else if (type === 'minute') {
          // 시간을 유지하면서 분만 변경
          const dateWithHour = setHours(baseFromDate, prevHour);
          updateValue({
            ...(displayValue ?? {}),
            from: setMinutes(dateWithHour, Number(num)),
            to: displayValue?.to ?? baseToDate,
          } as DateRange);
        }
      } else if (target === 'to') {
        const prevHour = displayValue?.to?.getHours() ?? 23;

        if (type === 'hour') {
          updateValue({
            ...(displayValue ?? {}),
            from: displayValue?.from ?? baseFromDate,
            to: setHours(baseToDate, Number(num)),
          } as DateRange);
        } else if (type === 'minute') {
          // 시간을 유지하면서 분만 변경
          const dateWithHour = setHours(baseToDate, prevHour);
          updateValue({
            ...(displayValue ?? {}),
            from: displayValue?.from ?? baseFromDate,
            to: setMinutes(dateWithHour, Number(num)),
          } as DateRange);
        }
      }
    },
    [displayValue, updateValue],
  );

  return (
    <div
      className={cn(
        'focus-within:border-ring focus-within:ring-ring/50 flex w-fit items-center rounded-md border ps-2 shadow-xs focus-within:ring-[3px]',
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

        <input
          type="number"
          className="w-5 text-center text-sm focus-visible:outline-0 [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
          min={0}
          max={23}
          placeholder="00"
          aria-label="시작 시"
          value={displayValue?.from ? displayValue.from.getHours().toString().padStart(2, '0') : '00'}
          onChange={handleChangeTime('hour', 'from')}
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
          aria-label="시작 분"
          value={displayValue?.from ? displayValue.from.getMinutes().toString().padStart(2, '0') : '00'}
          onChange={handleChangeTime('minute', 'from')}
          onBlur={(e) => {
            const num = e.target.valueAsNumber;
            if (!Number.isNaN(num) && num >= 0 && num <= 59) {
              e.target.value = zerofill(num, 2);
            }
          }}
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

        <input
          type="number"
          className="w-5 text-center text-sm focus-visible:outline-0 [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
          min={0}
          max={23}
          placeholder="00"
          aria-label="종료 시"
          value={displayValue?.to ? displayValue.to.getHours().toString().padStart(2, '0') : '00'}
          onChange={handleChangeTime('hour', 'to')}
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
          aria-label="종료 분"
          value={displayValue?.to ? displayValue.to.getMinutes().toString().padStart(2, '0') : '00'}
          onChange={handleChangeTime('minute', 'to')}
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
            isValid(displayValue?.from) || isValid(displayValue?.to) ? 'visible' : 'invisible',
          )}
          onClick={handleClear}
          aria-label="날짜 범위 및 시간 초기화"
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
            locale={ko}
            mode="range"
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
              <Label className="text-muted-foreground col-span-2 px-2 text-xs">시작 시간</Label>
              <ButtonGroup className="rounded-md border">
                <ButtonGroupText className="bg-background text-muted-foreground border-none pr-1 pl-2 shadow-none">
                  <ClockIcon className="text-muted-foreground/50 size-4" />
                </ButtonGroupText>
                <Select
                  value={displayValue?.from ? displayValue.from.getHours().toString().padStart(2, '0') : undefined}
                  onValueChange={(selectedValue) => {
                    if (!displayValue?.from) {
                      return;
                    }

                    updateValue({ ...displayValue, from: setHours(displayValue.from, Number(selectedValue)) });
                  }}
                >
                  <SelectTrigger
                    className="w-fit justify-start border-none px-1 shadow-none"
                    size="sm"
                    aria-label="시작 시간 선택"
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
                  value={displayValue?.from ? displayValue.from.getMinutes().toString().padStart(2, '0') : undefined}
                  onValueChange={(selectedValue) => {
                    if (!displayValue?.from) {
                      return;
                    }

                    updateValue({ ...displayValue, from: setMinutes(displayValue.from, Number(selectedValue)) });
                  }}
                >
                  <SelectTrigger
                    className="w-fit justify-start border-none px-1 shadow-none"
                    size="sm"
                    aria-label="시작 분 선택"
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

            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground col-span-2 px-2 text-xs">종료 시간</Label>
              <ButtonGroup className="rounded-md border">
                <ButtonGroupText className="bg-background text-muted-foreground border-none pr-1 pl-2 shadow-none">
                  <ClockIcon className="text-muted-foreground/50 size-4" />
                </ButtonGroupText>
                <Select
                  value={displayValue?.to ? displayValue.to.getHours().toString().padStart(2, '0') : undefined}
                  onValueChange={(selectedValue) => {
                    if (!displayValue?.to) {
                      return;
                    }

                    updateValue({ ...displayValue, to: setHours(displayValue.to, Number(selectedValue)) });
                  }}
                >
                  <SelectTrigger
                    className="w-fit justify-start border-none px-1 shadow-none"
                    size="sm"
                    aria-label="종료 시간 선택"
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
                  value={displayValue?.to ? displayValue.to.getMinutes().toString().padStart(2, '0') : undefined}
                  onValueChange={(selectedValue) => {
                    if (!displayValue?.to) {
                      return;
                    }

                    updateValue({ ...displayValue, to: setMinutes(displayValue.to, Number(selectedValue)) });
                  }}
                >
                  <SelectTrigger
                    className="w-fit justify-start border-none px-1 shadow-none"
                    size="sm"
                    aria-label="종료 분 선택"
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
          <div className="flex items-center gap-2 border-t p-4">
            <div>
              {displayValue &&
                displayValue.from &&
                displayValue.to &&
                `${differenceInDays(displayValue.to, displayValue.from) + 1} 일 선택`}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
