'use client';

import { formatDate } from '@henry-hong/common-utils/date';
import { calendarOptions } from '@monorepo-starter/ui/blocks/date-picker/options';
import { Button } from '@monorepo-starter/ui/components/button';
import { Calendar } from '@monorepo-starter/ui/components/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { cn } from '@monorepo-starter/ui/lib/utils';

import { CalendarIcon, XIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useId, useState } from 'react';

export default function DatePickerMultiple({
  value,
  onChange,
}: {
  value?: string[];
  onChange?: Dispatch<SetStateAction<string[]>>;
}) {
  const id = useId();
  const [month, setMonth] = useState<Date | undefined>();
  const [dates, setDates] = useState<Date[] | undefined>(value ? value.map((d) => new Date(d)) : undefined);
  const [inputValue, setInputValue] = useState(
    value ? value.map((d) => formatDate(new Date(d), 'iso9075/date')).join(', ') : '',
  );

  useEffect(() => {
    if (dates && dates.length > 0) {
      setInputValue(dates.map((d) => formatDate(d, 'iso9075/date')).join(', '));
      if (onChange) {
        onChange(dates.map((d) => formatDate(d, 'iso9075/date')));
      }
    } else {
      setInputValue('');
      if (onChange) {
        onChange([]);
      }
    }
  }, [dates]);

  return (
    <div className="max-w-120 relative inline-flex items-center">
      <Button variant="ghost" className="text-muted-foreground/80 absolute right-8" onClick={() => setDates([])}>
        <XIcon size={16} aria-hidden="true" />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant={'outline'}
            className={cn(
              'bg-background hover:bg-background border-input group w-full justify-between px-3 font-normal outline-none outline-offset-0 focus-visible:outline-[3px]',
              !dates && 'text-muted-foreground',
            )}
          >
            <span
              title={inputValue}
              className={cn(
                'truncate pr-12',
                (!dates || dates.length === 0) && 'text-muted-foreground',
                dates && dates.length > 3 && 'tracking-tighter',
              )}
            >
              {inputValue ? inputValue : '날짜를 선택해주세요'}
            </span>
            <CalendarIcon
              size={16}
              className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <Calendar
            {...calendarOptions({ month, onMonthChange: setMonth })}
            mode="multiple"
            selected={dates}
            onSelect={setDates}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
