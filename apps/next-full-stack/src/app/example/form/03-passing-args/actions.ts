'use server';

import { devLog } from '@henry-hong/common-utils/console';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getTypedPath } from '~/app-path-types';
import { type ErrorType, schema } from './schema';

export async function submitAction(code: string, prevState: ErrorType | undefined, formData: FormData) {
  const data = Object.fromEntries(formData);
  const isValid = schema.safeParse(data);

  devLog('info', 'code(action)', code);
  devLog('info', 'data(action)', data);

  if (!isValid.success) {
    const errorMessages = z.flattenError(isValid.error).fieldErrors;
    return errorMessages;
  }

  devLog('success', 'isValid', isValid);

  revalidatePath(getTypedPath('/example/form/03-passing-args'));
}
