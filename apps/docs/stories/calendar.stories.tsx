import { Button } from '@monorepo-starter/ui/components/button';
import { Calendar } from '@monorepo-starter/ui/components/calendar';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@monorepo-starter/ui/components/card';
import { Input } from '@monorepo-starter/ui/components/input';
import { Label } from '@monorepo-starter/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@monorepo-starter/ui/components/select';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { addDays } from 'date-fns';
import { Clock2Icon } from 'lucide-react';
import { useState } from 'react';
import type { DateRange, Locale } from 'react-day-picker';
import { enUS, es, ja, ko } from 'react-day-picker/locale';
import { action } from 'storybook/actions';
import { expect, userEvent } from 'storybook/test';

/**
 * A date field component that allows users to enter and edit date.
 */
const meta = {
  title: 'components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: { type: 'date' },
    },
    mode: {
      table: {
        disable: true,
      },
    },
    disabled: {
      control: 'boolean',
    },
    numberOfMonths: {
      control: 'number',
    },
    showOutsideDays: {
      control: 'boolean',
    },
    buttonVariant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
    },
    showWeekNumber: {
      control: 'boolean',
    },
  },
  args: {
    mode: 'single',
    selected: new Date(),
    onSelect: action('onDayClick'),
    className: 'rounded-md border w-fit shadow',
    disabled: false,
    numberOfMonths: 1,
    showOutsideDays: true,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the calendar.
 */
export const Default: Story = {};

/**
 * Use the `multiple` mode to select multiple dates.
 */
export const Multiple: Story = {
  args: {
    min: 1,
    selected: [new Date(), addDays(new Date(), 2), addDays(new Date(), 8)],
    mode: 'multiple',
  },
};

/**
 * Use the `range` mode to select a range of dates.
 */
export const Range: Story = {
  args: {
    selected: {
      from: new Date(),
      to: addDays(new Date(), 7),
    },
    mode: 'range',
  },
};

/**
 * Use the `disabled` prop to disable specific dates.
 */
export const Disabled: Story = {
  args: {
    disabled: [addDays(new Date(), 1), addDays(new Date(), 2), addDays(new Date(), 3), addDays(new Date(), 5)],
  },
};

/**
 * Use the `numberOfMonths` prop to display multiple months.
 */
export const MultipleMonths: Story = {
  args: {
    numberOfMonths: 2,
    showOutsideDays: false,
  },
};

export const ShouldNavigateMonthsWhenClicked: Story = {
  name: 'when using the calendar navigation, should change months',
  tags: ['!dev', '!autodocs'],
  args: {
    defaultMonth: new Date(2000, 8),
  },
  argTypes: {},
  play: async ({ canvas }) => {
    const title = await canvas.findByText(/2000/i);
    const startTitle = title.textContent || '';
    const backBtn = await canvas.findByRole('button', {
      name: /previous/i,
    });
    const nextBtn = await canvas.findByRole('button', {
      name: /next/i,
    });
    const steps = 6;
    for (let i = 0; i < steps / 2; i++) {
      await userEvent.click(backBtn);
      expect(title).not.toHaveTextContent(startTitle);
    }
    for (let i = 0; i < steps; i++) {
      await userEvent.click(nextBtn);
      if (i == steps / 2 - 1) {
        expect(title).toHaveTextContent(startTitle);
        continue;
      }
      expect(title).not.toHaveTextContent(startTitle);
    }
  },
};

export const DisabledDays: Story = {
  args: {},
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 12));
    return (
      <Calendar
        mode="single"
        defaultMonth={date}
        selected={date}
        onSelect={setDate}
        disabled={{
          before: new Date(2025, 5, 12),
        }}
        className="rounded-lg border shadow-sm"
      />
    );
  },
};

export const DisabledWeekends: Story = {
  args: {},
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 12));
    return (
      <Calendar
        mode="range"
        defaultMonth={date}
        selected={{
          from: date,
          to: addDays(date || new Date(), 7),
        }}
        onSelect={(value) => {
          if (value) {
            setDate(value.from);
          }
        }}
        disabled={{ dayOfWeek: [0, 6] }}
        className="rounded-lg border shadow-sm"
      />
    );
  },
};

export const WithTodayButton: Story = {
  args: {},
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 12));
    const [month, setMonth] = useState<Date | undefined>(new Date());

    return (
      <Card>
        <CardHeader>
          <CardTitle>Appointment</CardTitle>
          <CardDescription>Find a date</CardDescription>
          <CardAction>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setMonth(new Date());
                setDate(new Date());
              }}
            >
              Today
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            selected={date}
            onSelect={setDate}
            className="bg-transparent p-0"
          />
        </CardContent>
      </Card>
    );
  },
};

export const LocalizationCalendar: Story = {
  args: {},
  render: function Render() {
    const localizedStrings = {
      en: {
        title: 'Book an appointment',
        description: 'Select the dates for your appointment',
      },
      es: {
        title: 'Reserva una cita',
        description: 'Selecciona las fechas para tu cita',
      },
      ko: {
        title: '예약하기',
        description: '예약 날짜를 선택하세요',
      },
      ja: {
        title: '予約する',
        description: '予約日を選択してください',
      },
    } as const;

    const [locale, setLocale] = useState<keyof typeof localizedStrings>('ko');
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(2025, 8, 9),
      to: new Date(2025, 8, 17),
    });

    return (
      <Card>
        <CardHeader className="border-b">
          <CardTitle>{localizedStrings[locale].title}</CardTitle>
          <CardDescription>{localizedStrings[locale].description}</CardDescription>
          <CardAction>
            <Select value={locale} onValueChange={(value) => setLocale(value as keyof typeof localizedStrings)}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ko">한국어</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            defaultMonth={dateRange?.from}
            numberOfMonths={2}
            locale={locale === 'es' ? es : locale === 'ja' ? ja : locale === 'ko' ? ko : (enUS as Locale)}
            className="bg-transparent p-0"
            buttonVariant="outline"
          />
        </CardContent>
      </Card>
    );
  },
};

export const BookedDates: Story = {
  args: {},
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 12));
    const bookedDates = Array.from({ length: 12 }, (_, i) => new Date(2025, 5, 15 + i));
    return (
      <Calendar
        mode="single"
        defaultMonth={date}
        selected={date}
        onSelect={setDate}
        disabled={bookedDates}
        modifiers={{
          booked: bookedDates,
        }}
        modifiersClassNames={{
          booked: '[&>button]:line-through opacity-100',
        }}
        className="rounded-lg border shadow-sm"
      />
    );
  },
};

export const WithTimePicker: Story = {
  args: {},
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 12));

    return (
      <Card className="w-fit py-4">
        <CardContent className="px-4">
          <Calendar mode="single" selected={date} onSelect={setDate} className="bg-transparent p-0" />
        </CardContent>
        <CardFooter className="flex flex-col gap-6 border-t px-4">
          <div className="flex w-full flex-col gap-3">
            <Label htmlFor="time-from">Start Time</Label>
            <div className="relative flex w-full items-center gap-2">
              <Clock2Icon className="text-muted-foreground pointer-events-none absolute left-2.5 size-4 select-none" />
              <Input
                id="time-from"
                type="time"
                step="1"
                defaultValue="10:30:00"
                className="appearance-none pl-8 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-3">
            <Label htmlFor="time-to">End Time</Label>
            <div className="relative flex w-full items-center gap-2">
              <Clock2Icon className="text-muted-foreground pointer-events-none absolute left-2.5 size-4 select-none" />
              <Input
                id="time-to"
                type="time"
                step="1"
                defaultValue="12:30:00"
                className="appearance-none pl-8 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  },
};

export const WithPresets: Story = {
  args: {},
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Card className="max-w-[300px] py-4">
        <CardContent className="px-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
            className="bg-transparent p-0 [--cell-size:--spacing(9.5)]"
          />
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 border-t px-4">
          {[
            { label: 'Today', value: 0 },
            { label: 'Tomorrow', value: 1 },
            { label: 'In 3 days', value: 3 },
            { label: 'In a week', value: 7 },
            { label: 'In 2 weeks', value: 14 },
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
        </CardFooter>
      </Card>
    );
  },
};

export const WithTimePickerAndPresets: Story = {
  args: {},
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 12));
    const [selectedTime, setSelectedTime] = useState<string | null>('10:00');
    const timeSlots = Array.from({ length: 37 }, (_, i) => {
      const totalMinutes = i * 15;
      const hour = Math.floor(totalMinutes / 60) + 9;
      const minute = totalMinutes % 60;
      return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    });
    const bookedDates = Array.from({ length: 3 }, (_, i) => new Date(2025, 5, 17 + i));

    return (
      <Card className="gap-0 p-0">
        <CardContent className="relative p-0 md:pr-48">
          <div className="p-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              defaultMonth={date}
              disabled={bookedDates}
              showOutsideDays={false}
              modifiers={{
                booked: bookedDates,
              }}
              modifiersClassNames={{
                booked: '[&>button]:line-through opacity-100',
              }}
              className="bg-transparent p-0 [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
              formatters={{
                formatWeekdayName: (date) => {
                  return date.toLocaleString('en-US', { weekday: 'short' });
                },
              }}
            />
          </div>
          <div className="no-scrollbar inset-y-0 right-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:max-h-none md:w-48 md:border-t-0 md:border-l">
            <div className="grid gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? 'default' : 'outline'}
                  onClick={() => setSelectedTime(time)}
                  className="w-full shadow-none"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t px-6 md:flex-row">
          <div className="text-sm">
            {date && selectedTime ? (
              <>
                Your meeting is booked for{' '}
                <span className="font-medium">
                  {' '}
                  {date?.toLocaleDateString('en-US', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}{' '}
                </span>
                at <span className="font-medium">{selectedTime}</span>.
              </>
            ) : (
              <>Select a date and time for your meeting.</>
            )}
          </div>
          <Button disabled={!date || !selectedTime} className="w-full md:ml-auto md:w-auto" variant="outline">
            Continue
          </Button>
        </CardFooter>
      </Card>
    );
  },
};
