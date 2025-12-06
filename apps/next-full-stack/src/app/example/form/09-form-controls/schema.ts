import { z } from 'zod';

export const schema = z.object({
  checkboxBox1: z.boolean(),
  checkboxBox2: z.boolean(),

  radioBox1: z.enum(['r1', 'r2', 'r3']),

  switchBox1: z.boolean(),

  slider: z.number(),
  sliderDual: z.tuple([z.number(), z.number()]),

  multiSelect: z.array(z.object({ value: z.string(), label: z.string() })),

  dateInput: z.string(),
  datePickerSingle: z.date().optional(),
  datePickerSingleTime: z.date().optional(),
  datePickerMultiple: z.array(z.date()),
  datePickerRange: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
  datePickerRangeTime: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
});

export type Schema = z.infer<typeof schema>;
