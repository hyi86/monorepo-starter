'use server';

import { devLog } from '@monorepo-starter/utils/console';
import { revalidatePath } from 'next/cache';
import { getTypedPath } from '~/app-path-types';
import { Schema, schema } from './schema';

export async function action(data: Schema, formData: FormData) {
  const isValid = schema.safeParse(data);

  devLog('info', 'data', data);
  devLog('success', 'isValid', isValid);
  devLog('info', 'formData', Object.fromEntries(formData));

  revalidatePath(getTypedPath('/example/form/04-with-hook-form'));
}
