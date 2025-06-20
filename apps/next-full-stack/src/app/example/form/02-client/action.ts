'use server';

import { devLog } from '@henry-hong/common-utils/console';
import { revalidatePath } from 'next/cache';
import { getTypedPath } from '~/app-path-types';
import { type ErrorType, schema } from './schema';

export async function action(prevState: ErrorType, formData: FormData) {
  const data = Object.fromEntries(formData);
  const isValid = schema.safeParse(data);

  devLog('info', 'data(server action)', data);

  if (!isValid.success) {
    const errorMessages = isValid.error.flatten().fieldErrors;
    return errorMessages;
  }

  devLog('success', 'isValid', isValid);

  revalidatePath(getTypedPath('/example/form/02-client'));
}
