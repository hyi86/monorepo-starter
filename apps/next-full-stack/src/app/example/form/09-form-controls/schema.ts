import { z } from 'zod';

export const schema = z.object({
  checkboxBox1: z.boolean(),
  checkboxBox2: z.boolean(),

  radioBox1: z.enum(['r1', 'r2', 'r3']),

  slider: z.number(),
  sliderDual: z.tuple([z.number(), z.number()]),

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
