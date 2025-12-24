'use server';

import { devLog } from '@monorepo-starter/utils/console';
import { revalidatePath } from 'next/cache';
import { type Schema } from './schema';

export async function submitAction(data: Schema, formData: FormData) {
  devLog('info', 'data', data);
  devLog('info', 'formData', Object.fromEntries(formData));
  revalidatePath('/example/form/09-date-picker', 'page');
}
