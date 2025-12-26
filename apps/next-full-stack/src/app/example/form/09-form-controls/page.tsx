'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  DatePicker,
  DateTimePicker,
  MultipleDatePicker,
  RangePicker,
  RangeTimePicker,
} from '@monorepo-starter/ui/blocks/date-picker';
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
import { MultipleSelector } from '@monorepo-starter/ui/components/multiple-selector';
import { RadioGroup, RadioGroupItem } from '@monorepo-starter/ui/components/radio-group';
import { Slider } from '@monorepo-starter/ui/components/slider';
import { Switch } from '@monorepo-starter/ui/components/switch';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { CircleIcon, PenBoxIcon, TrashIcon, TriangleIcon } from 'lucide-react';
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
      switchBox1: false,
      slider: 5,
      sliderDual: [5, 10],
      multiSelect: [],
      dateInput: '',
      datePickerSingle: undefined,
      datePickerSingleTime: undefined,
      datePickerMultiple: [new Date('2024-01-01'), new Date('2024-01-02')],
      datePickerRange: {
        from: undefined,
        to: undefined,
      },
      datePickerRangeTime: {
        from: undefined,
        to: undefined,
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
        <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log('errors', errors))} className="space-y-8">
          {/* Checkbox Box 1 */}
          <FormField
            control={form.control}
            name="checkboxBox1"
            render={({ field }) => (
              <FormItem className="max-w-100">
                <FormLabel>체크박스 1</FormLabel>
                <FormControl>
                  <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950">
                    <Checkbox
                      id="toggle-2"
                      defaultChecked
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    />
                    <div className="grid gap-1.5 font-normal">
                      <p className="text-sm leading-none font-medium">Enable notifications</p>
                      <p className="text-muted-foreground text-sm">
                        You can enable or disable notifications at any time.
                      </p>
                    </div>
                  </Label>
                </FormControl>
                <FormDescription>기본 체크박스의 박스 예제 입니다.</FormDescription>
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
                <FormLabel>체크박스 2</FormLabel>
                <FormControl>
                  <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-green-600 has-aria-checked:bg-green-50 dark:has-aria-checked:border-green-900 dark:has-aria-checked:bg-green-950">
                    <Checkbox
                      id="toggle-2"
                      defaultChecked
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                    />
                    <div className="grid gap-1.5 font-normal">
                      <p className="text-sm leading-none font-medium">알림 활성화</p>
                      <p className="text-muted-foreground text-sm">
                        You can enable or disable notifications at any time.
                      </p>
                    </div>
                  </Label>
                </FormControl>
                <FormDescription>기본 체크박스의 박스 예제 입니다.</FormDescription>
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
                    <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
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
                            <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                              (Sublabel)
                            </span>
                          </Label>
                          <p id={`radio-1-description`} className="text-muted-foreground text-xs">
                            You can use this card with a label and a description.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-input has-data-[state=checked]:border-primary/50 relative flex items-center gap-2 rounded-md border p-4 shadow-xs outline-none">
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
                            <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                              (Sublabel)
                            </span>
                          </Label>
                          <p id={`radio-2-description`} className="text-muted-foreground text-xs">
                            You can use this card with a label and a description.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border-input has-data-[state=checked]:border-primary/50 relative flex items-center gap-2 rounded-md border p-4 shadow-xs outline-none">
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
                            <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
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

          {/* Switch Box 1 */}
          <FormField
            control={form.control}
            name="switchBox1"
            render={({ field }) => (
              <FormItem className="max-w-100 [--primary:var(--color-indigo-500)] [--ring:var(--color-indigo-300)] in-[.dark]:[--primary:var(--color-indigo-500)] in-[.dark]:[--ring:var(--color-indigo-900)]">
                <FormLabel>Switch Box 1</FormLabel>
                <FormControl>
                  <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                    <Switch
                      id={field.name}
                      className="order-1 after:absolute after:inset-0"
                      aria-describedby={`${field.name}-description`}
                    />
                    <div className="flex grow items-center gap-3">
                      <PenBoxIcon />
                      <div className="grid grow gap-2">
                        <Label htmlFor={field.name}>
                          Label{' '}
                          <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                            (Sublabel)
                          </span>
                        </Label>
                        <p id={`${field.name}-description`} className="text-muted-foreground text-xs">
                          A short description goes here.
                        </p>
                      </div>
                    </div>
                  </div>
                </FormControl>
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

          {/* Multi Select */}
          <FormField
            control={form.control}
            name="multiSelect"
            render={({ field }) => (
              <FormItem className="max-w-100">
                <FormLabel>Multi Select</FormLabel>
                <FormControl>
                  <MultipleSelector
                    commandProps={{
                      label: 'Multi Select(Select Frameworks)',
                    }}
                    options={[
                      { value: 'react', label: 'React' },
                      { value: 'vue', label: 'Vue' },
                      { value: 'angular', label: 'Angular' },
                      { value: 'svelte', label: 'Svelte' },
                      { value: 'next', label: 'Next' },
                      { value: 'remix', label: 'Remix' },
                      { value: 'astro', label: 'Astro' },
                      { value: 'nuxt', label: 'Nuxt' },
                      { value: 'blitz', label: 'Blitz' },
                      { value: 'sapper', label: 'Sapper' },
                      { value: 'solid', label: 'Solid' },
                      { value: 'qwik', label: 'Qwik' },
                    ]}
                    onChange={field.onChange}
                    value={field.value}
                    creatable
                    hidePlaceholderWhenSelected
                    emptyIndicator={<p className="text-muted-foreground text-center text-sm">No results found</p>}
                  />
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

          {/* Date Picker Single */}
          <FormField
            control={form.control}
            name="datePickerSingle"
            render={({ field }) => (
              <FormItem className="max-w-100">
                <FormLabel>Date Picker Single</FormLabel>
                <FormControl>
                  <DatePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>기본 날짜 선택 피커 입니다</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Picker Single Time */}
          <FormField
            control={form.control}
            name="datePickerSingleTime"
            render={({ field }) => (
              <FormItem className="max-w-100">
                <FormLabel>Date Picker Single Time</FormLabel>
                <FormControl>
                  <DateTimePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>기본 날짜 시간 선택 피커 입니다</FormDescription>
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
                  <MultipleDatePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>멀티 날짜 선택 피커 입니다</FormDescription>
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
                  <RangePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>날짜 범위 선택 피커 입니다</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Range Time Picker */}
          <FormField
            control={form.control}
            name="datePickerRangeTime"
            render={({ field }) => (
              <FormItem className="max-w-100">
                <FormLabel>Date Range Time Picker</FormLabel>
                <FormControl>
                  <RangeTimePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>날짜 범위 시간 선택 피커 입니다</FormDescription>
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
