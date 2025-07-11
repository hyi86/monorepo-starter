import { z } from 'zod';
import { ko } from 'zod/locales';

z.config(ko());

export const schema = z.object({
  textInput1: z.string().min(2),
  numberInput1: z.coerce.number().min(10),
  checkbox1: z.literal('on'),
  radio1: z.enum(['1', '2', '3']),
  nativeSelect1: z.enum(['2', '3', '4']),
  select2: z.enum(['nextjs', 'astro', 'gatsby']),
  slider1: z.coerce.number().min(40),
  switch1: z.literal('on'),
});

export type Schema = z.infer<typeof schema>;
export type ErrorType = z.core.$ZodFlattenedError<Schema>['fieldErrors'];
