import { z } from 'zod';
import { ko } from 'zod/locales';

z.config(ko());

export const MAX_ITEM_LENGTH = 1000;

export const schema = z.object({
  textInput1: z.string().min(2).max(10),
  items: z
    .array(
      z.object({
        id: z.string().min(1),
        name: z.string().min(2).max(10),
        age: z.number().min(1).max(100),
        status: z.enum(['active', 'inactive']),
      }),
    )
    .max(MAX_ITEM_LENGTH, { message: `최대 ${MAX_ITEM_LENGTH}개 까지 등록가능합니다` }),
});

export type Schema = z.infer<typeof schema>;
export type ErrorType = z.core.$ZodFlattenedError<Schema>['fieldErrors'] | undefined;
