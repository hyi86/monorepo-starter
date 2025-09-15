'use client';

import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@monorepo-starter/ui/components/button';
import { Calendar } from '@monorepo-starter/ui/components/calendar';
import { Label } from '@monorepo-starter/ui/components/label';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';

export function DatePickerDefault({
  label,
  value,
  onChange,
}: {
  label: React.ReactNode;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(value);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="w-48 justify-between font-normal">
            {date ? date.toLocaleDateString() : 'Select date'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
              onChange(date);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
