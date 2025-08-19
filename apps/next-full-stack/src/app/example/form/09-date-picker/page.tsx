'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from '@monorepo-starter/ui/blocks/date-picker/date-picker';
import DatePickerMultiple from '@monorepo-starter/ui/blocks/date-picker/date-picker-multiple';
import DateRangePicker from '@monorepo-starter/ui/blocks/date-picker/date-range-picker';
import { Button } from '@monorepo-starter/ui/components/button';
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
import { SubmitHandler, useForm } from 'react-hook-form';
import { submitAction } from './actions';
import { schema, type Schema } from './schema';

export default function FormDatePickerPage() {
  // 1. Define form
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      dateInput: '',
      datePickerSingle: '',
      datePickerMultiple: ['2024-01-01', '2024-01-02'],
      datePickerRange: {
        from: '',
        to: '',
      },
    },
  });

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

          <FormField
            control={form.control}
            name="datePickerMultiple"
            render={({ field }) => (
              <FormItem className="max-w-100">
                <FormLabel>Date Picker Multiple</FormLabel>
                <FormControl>
                  <DatePickerMultiple value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>날짜 선택 피커 여러개 입니다</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="datePickerRange"
            render={({ field }) => (
              <FormItem className="max-w-100">
                <FormLabel>Date Range Picker</FormLabel>
                <FormControl>
                  <DateRangePicker value={field.value} onChange={field.onChange} />
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
