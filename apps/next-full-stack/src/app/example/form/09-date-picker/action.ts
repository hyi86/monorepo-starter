'use server';

import { devLog } from '@monorepo-starter/utils/console';
import { revalidatePath } from 'next/cache';
import { getTypedPath } from '~/app-path-types';
import { type Schema } from './schema';

export async function action(data: Schema, formData: FormData) {
  devLog('info', 'data', data);
  devLog('info', 'formData', Object.fromEntries(formData));
  revalidatePath(getTypedPath('/example/form/09-date-picker'));
}
