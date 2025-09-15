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
  datePickerSingleDefault: z.date().optional(),
  datePickerSingle: z.string(),
  datePickerMultiple: z.array(z.string()),
  datePickerRange: z.object({
    from: z.string(),
    to: z.string(),
  }),
});

export type Schema = z.infer<typeof schema>;
