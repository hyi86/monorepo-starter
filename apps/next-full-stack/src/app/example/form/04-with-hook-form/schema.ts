import { z } from 'zod';
import { ko } from 'zod/locales';

z.config(ko());

export const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
];

export const schema = z.object({
  textInput1: z.string().min(2).max(10),
  checkbox1: z.boolean().refine((data) => data === true),
  dateInput1: z.date().optional(),
  radioGroup1: z.enum(['all', 'mentions', 'none']).optional(),
  select1: z.email(),
  switch1: z.boolean().refine(Boolean),
  switch2: z.boolean().default(true).optional(),
  textarea1: z.string().min(10).optional(),
  combobox1: z.enum(languages.map((lang) => lang.value) as [string, ...string[]]).optional(),
  file1: z.array(z.instanceof(File)),
});

export type Schema = z.infer<typeof schema>;
export type ErrorType = z.core.$ZodFlattenedError<Schema>['fieldErrors'];
