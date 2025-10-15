'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Calendar } from '@monorepo-starter/ui/components/calendar';
import { Input } from '@monorepo-starter/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { formatDate } from '@monorepo-starter/utils/date';
import { addDays } from 'date-fns';
import { CalendarIcon, XIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function DatePickerInput({
  name,
  value,
  onChange,
}: {
  name?: string;
  value?: string;
  onChange?: Dispatch<SetStateAction<string>>;
}) {
  const [month, setMonth] = useState<Date | undefined>();
  const [date, setDate] = useState<Date | undefined>(value ? new Date(value) : undefined);
  const [inputValue, setInputValue] = useState(value ? formatDate(new Date(value), 'iso9075/date') : '');

  // 선택된 날짜 변경
  const handleDayPickerSelect = (date?: Date) => {
    if (!date) {
      setInputValue('');
      setDate(undefined);
      return;
    }

    setDate(date);
    setMonth(date);
    setInputValue(formatDate(date, 'iso9075/date'));
  };

  // 입력된 날짜 변경
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value) {
      setDate(undefined);
      return;
    }

    const parsedDate = new Date(value);
    setDate(parsedDate);
    setMonth(parsedDate);
  };

  // 날짜 초기화
  const handleClear = () => {
    setInputValue('');
    setDate(undefined);
    onChange?.('');
  };

  useEffect(() => {
    onChange?.(date ? formatDate(date, 'iso9075/date') : '');
  }, [date]);

  return (
    <div className="relative inline-flex items-center">
      <Input
        className="flex-1 pr-12 [&::-webkit-calendar-picker-indicator]:hidden"
        type="date"
        placeholder="날짜를 선택해주세요"
        value={inputValue}
        onChange={handleInputChange}
        name={name}
      />
      {inputValue && (
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-8 flex h-full w-8 items-center justify-center transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Clear input"
          onClick={handleClear}
        >
          <XIcon size={16} aria-hidden="true" />
        </button>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'group absolute right-0 justify-between px-3 font-normal outline-offset-0 outline-none hover:bg-transparent focus-visible:outline-[3px]',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon
              size={16}
              className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
              aria-hidden="true"
            />
            <span className="sr-only">Select date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
          <Calendar
            mode="single"
            captionLayout="dropdown"
            endMonth={new Date(2026, 11)}
            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
            className="[--cell-size:--spacing(9)]"
            classNames={{
              dropdowns: 'flex flex-row-reverse gap-2',
            }}
            month={month}
            onMonthChange={setMonth}
            selected={date}
            onSelect={handleDayPickerSelect}
          />
          <div className="grid grid-cols-3 gap-2 p-2">
            {[
              { label: '오늘', value: 0 },
              { label: '어제', value: -1 },
              { label: '3일 전', value: -3 },
            ].map((preset) => (
              <Button
                key={preset.value}
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  const newDate = addDays(new Date(), preset.value);
                  setDate(newDate);
                }}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
