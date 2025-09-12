'use server';

import { AppRoutes } from '.next/types/routes';
import { devLog } from '@monorepo-starter/utils/console';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { schema, type ErrorType } from './schema';

export async function submitAction(prevState: ErrorType | undefined, formData: FormData) {
  const data = Object.fromEntries(formData);
  const isValid = schema.safeParse(data);

  devLog('info', 'data(server action)', data);

  if (!isValid.success) {
    const errorMessages = z.flattenError(isValid.error).fieldErrors;
    return errorMessages;
  }

  devLog('success', 'isValid', isValid);

  revalidatePath('/example/form/02-client' as AppRoutes, 'page');
}
