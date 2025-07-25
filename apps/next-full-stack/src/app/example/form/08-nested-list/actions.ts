'use server';

import { devLog } from '@henry-hong/common-utils/console';
import { revalidatePath } from 'next/cache';
import { getTypedPath } from '~/app-path-types';
import { schema, type Schema } from './schema';

export async function formTestAction(data: Schema, formData: FormData) {
  const isValid = schema.safeParse(data);

  devLog('info', 'data');
  devLog('info', JSON.stringify(data, null, 2));

  devLog('info', 'isValid');
  devLog('info', JSON.stringify(isValid, null, 2));

  devLog('info', 'formData');
  devLog('info', JSON.stringify(Object.fromEntries(formData), null, 2));

  revalidatePath(getTypedPath('/example/form/08-nested-list'));
}
