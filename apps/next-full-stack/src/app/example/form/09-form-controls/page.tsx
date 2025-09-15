'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { DatePickerDefault } from '@monorepo-starter/ui/blocks/date-picker/date-picker-default';
import { DatePickerInput } from '@monorepo-starter/ui/blocks/date-picker/date-picker-input';
import { DatePickerInputMultiple } from '@monorepo-starter/ui/blocks/date-picker/date-picker-input-multiple';
import { RangePickerInput } from '@monorepo-starter/ui/blocks/date-picker/range-picker-input';
import { Button } from '@monorepo-starter/ui/components/button';
import { Checkbox } from '@monorepo-starter/ui/components/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@monorepo-starter/ui/components/form';
import { Input } from '@monorepo-starter/ui/components/input';
import { Label } from '@monorepo-starter/ui/components/label';
import { RadioGroup, RadioGroupItem } from '@monorepo-starter/ui/components/radio-group';
import { Slider } from '@monorepo-starter/ui/components/slider';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { CircleIcon, TrashIcon, TriangleIcon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { submitAction } from './actions';
import { schema, type Schema } from './schema';

export default function FormDatePickerPage() {
  // 1. Define form
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      checkboxBox1: false,
      checkboxBox2: false,
      radioBox1: 'r1',
      slider: 5,
      sliderDual: [5, 10],
      dateInput: '',
      datePickerSingleDefault: undefined,
      datePickerSingle: '',
      datePickerMultiple: ['2024-01-01', '2024-01-02'],
      datePickerRange: {
        from: '',
        to: '',
      },
    },
  });

  // 슬라이더 최대값
  const max = 12;
  // 슬라이더 간격
  const skipInterval = 2;

  // 2. Define submit handler
  const onSubmit: SubmitHandler<Schema> = async (data, event) => {
    console.log('data', data);
    console.log('event', event);

    const formData = new FormData(event?.target as HTMLFormElement);
    await submitAction(data, formData);
  };

  return (
    <div>
      <h1>Date Picker Form</h1>
      <p>React Hook Form, Zod, Shadcn/UI, Next Server Action with Date Picker</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => console.log('errors', errors))}
          className="not-prose space-y-8"
        >
          {/* Checkbox Box 1 */}
          <FormField
            control={form.control}
            name="checkboxBox1"
            render={({ field }) => (
              <FormItem className="max-w-100">
                <FormLabel>Checkbox Box 1</FormLabel>
                <FormControl>
                  <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                    <Checkbox
                      id="toggle-2"
                      defaultChecked
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    />
                    <div className="grid gap-1.5 font-normal">
                      <p className="text-sm font-medium leading-none">Enable notifications</p>
                      <p className="text-muted-foreground text-sm">
                        You can enable or disable notifications at any time.
                      </p>
                    </div>
                  </Label>
                </FormControl>
                <FormDescription>체크박스 예제 입니다.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Checkbox Box 2 */}
          <FormField
            control={form.control}
            name="checkboxBox2"
            render={({ field }) => (
              <FormItem className="max-w-100">
                <FormLabel>Checkbox Box 2</FormLabel>
                <FormControl>
                  <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                    <Checkbox
                      id="toggle-2"
                      defaultChecked
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    />
                    <div className="grid gap-1.5 font-normal">
                      <p className="text-sm font-medium leading-none">Enable notifications</p>
                      <p className="text-muted-foreground text-sm">
                        You can enable or disable notifications at any time.
                      </p>
                    </div>
                  </Label>
                </FormControl>
                <FormDescription>체크박스 예제 입니다.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Radio Box 1 */}
          <FormField
            control={form.control}
            name="radioBox1"
            render={({ field }) => (
              <FormItem className="max-w-100">
                <FormLabel>Checkbox Box 2</FormLabel>
                <FormControl>
                  <RadioGroup className="gap-2" defaultValue={field.value} onValueChange={field.onChange}>
                    {/* Radio card #1 */}
                    <div className="border-input has-data-[state=checked]:border-primary/50 shadow-xs relative flex w-full items-start gap-2 rounded-md border p-4 outline-none">
                      <RadioGroupItem
                        value="r1"
                        id={`radio-1`}
                        aria-describedby={`radio-1-description`}
                        className="order-1 after:absolute after:inset-0"
                      />
                      <div className="flex grow items-center gap-3">
                        <TriangleIcon />
                        <div className="grid grow gap-2">
                          <Label htmlFor={`radio-1`}>
                            Label{' '}
                            <span className="text-muted-foreground text-xs font-normal leading-[inherit]">
                              (Sublabel)
                            </span>
                          </Label>
                          <p id={`radio-1-description`} className="text-muted-foreground text-xs">
                            You can use this card with a label and a description.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-input has-data-[state=checked]:border-primary/50 shadow-xs relative flex items-center gap-2 rounded-md border p-4 outline-none">
                      <RadioGroupItem
                        value="r2"
                        id={`radio-2`}
                        aria-describedby={`radio-2-description`}
                        className="order-1 after:absolute after:inset-0"
                      />
                      <div className="flex grow items-center gap-3">
                        <CircleIcon className="shrink-0" />
                        <div className="grid grow gap-2">
                          <Label htmlFor={`radio-2`}>
                            Label{' '}
                            <span className="text-muted-foreground text-xs font-normal leading-[inherit]">
                              (Sublabel)
                            </span>
                          </Label>
                          <p id={`radio-2-description`} className="text-muted-foreground text-xs">
                            You can use this card with a label and a description.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border-input has-data-[state=checked]:border-primary/50 shadow-xs relative flex items-center gap-2 rounded-md border p-4 outline-none">
                      <RadioGroupItem
                        value="r3"
                        id={`radio-2`}
                        aria-describedby={`radio-2-description`}
                        className="order-1 after:absolute after:inset-0"
                      />
                      <div className="flex grow items-center gap-3">
                        <TrashIcon />
                        <div className="grid grow gap-2">
                          <Label htmlFor={`radio-2`}>
                            Label{' '}
                            <span className="text-muted-foreground text-xs font-normal leading-[inherit]">
                              (Sublabel)
                            </span>
                          </Label>
                          <p id={`radio-2-description`} className="text-muted-foreground text-xs">
                            You can use this card with a label and a description.
                          </p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormDescription>체크박스 예제 입니다.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Slider Single */}
          <FormField
            control={form.control}
            name="slider"
            render={({ field }) => (
              <FormItem className="max-w-100">
                <FormLabel>Slider</FormLabel>
                <FormControl>
                  <div className="">
                    <Slider
                      max={max}
                      step={0.5}
                      aria-label="Slider with ticks"
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                    <span
                      className="text-muted-foreground mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium"
                      aria-hidden="true"
                    >
                      {[...Array(max + 1)].map((_, i) => (
                        <span key={i} className="flex w-0 flex-col items-center justify-center gap-2">
                          <span className={cn('bg-muted-foreground/70 h-1 w-px', i % skipInterval !== 0 && 'h-0.5')} />
                          <span className={cn(i % skipInterval !== 0 && 'opacity-0')}>{i}</span>
                        </span>
                      ))}
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Slider Dual */}
          <FormField
            control={form.control}
            name="sliderDual"
            render={({ field }) => (
              <FormItem className="max-w-100">
                <FormLabel>Slider Dual</FormLabel>
                <FormControl>
                  <div className="">
                    <Slider
                      max={max}
                      step={1}
                      aria-label="Slider with ticks"
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                    <span
                      className="text-muted-foreground mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium"
                      aria-hidden="true"
                    >
                      {[...Array(max + 1)].map((_, i) => (
                        <span key={i} className="flex w-0 flex-col items-center justify-center gap-2">
                          <span className={cn('bg-muted-foreground/70 h-1 w-px', i % skipInterval !== 0 && 'h-0.5')} />
                          <span className={cn(i % skipInterval !== 0 && 'opacity-0')}>{i}</span>
                        </span>
                      ))}
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Date Input */}
          <FormField
            control={form.control}
            name="dateInput"
            render={({ field }) => (
              <FormItem className="max-w-100">
                <FormLabel>Default Date Input</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="[&::-webkit-calendar-picker-indicator]:hidden"
                    placeholder="2024-01-01"
                    {...field}
                  />
                </FormControl>
                <FormDescription>기본 Date Input 입니다 (No Calendar)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Picker Single Default */}
          <FormField
            control={form.control}
            name="datePickerSingleDefault"
            render={({ field }) => (
              <FormItem className="max-w-100">
                <FormLabel>Date Picker Single</FormLabel>
                <FormControl>
                  <DatePickerDefault value={field.value} onChange={field.onChange} label="Date Picker Single Default" />
                </FormControl>
                <FormDescription>기본 날짜 선택 피커 입니다</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Picker Single */}
          <FormField
            control={form.control}
            name="datePickerSingle"
            render={({ field }) => (
              <FormItem className="max-w-100">
                <FormLabel>Date Picker Single</FormLabel>
                <FormControl>
                  <DatePickerInput value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>기본 날짜 선택 피커 입니다</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Picker Multiple */}
          <FormField
            control={form.control}
            name="datePickerMultiple"
            render={({ field }) => (
              <FormItem className="max-w-100">
                <FormLabel>Date Picker Multiple</FormLabel>
                <FormControl>
                  <DatePickerInputMultiple value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>날짜 선택 피커 여러개 입니다</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Range Picker */}
          <FormField
            control={form.control}
            name="datePickerRange"
            render={({ field }) => (
              <FormItem className="max-w-100">
                <FormLabel>Date Range Picker</FormLabel>
                <FormControl>
                  <RangePickerInput value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>날짜 범위 선택 피커 입니다</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">전송</Button>
        </form>
      </Form>
    </div>
  );
}
