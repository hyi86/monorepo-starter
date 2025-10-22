import { Button } from '@monorepo-starter/ui/components/button';
import { Calendar } from '@monorepo-starter/ui/components/calendar';
import { Label } from '@monorepo-starter/ui/components/label';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicCalendar: Story = {
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'multiple', 'range'],
    },
    showOutsideDays: {
      control: { type: 'boolean' },
    },
  },
  args: {
    mode: 'single',
    showOutsideDays: false,
    buttonVariant: 'ghost',
    captionLayout: 'label',
    numberOfMonths: 1,
  },
  render: function Render(args) {
    return (
      <div className="flex gap-4">
        {args.mode === 'range' ? (
          <Calendar selected={{ from: undefined, to: undefined }} required {...args} />
        ) : (
          <Calendar mode={args.mode} {...args} />
        )}
      </div>
    );
  },
};

export const DatepickerDefault: Story = {
  parameters: {
    layout: 'centered',
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <div className="flex flex-col gap-3">
        <Label htmlFor="date" className="px-1">
          Date of birth
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
              // @ts-ignore
              selected={date}
              // @ts-ignore
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
              {...args}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};
