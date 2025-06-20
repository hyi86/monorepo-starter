'use server';

import { devLog } from '@henry-hong/common-utils/console';
import { revalidatePath } from 'next/cache';
import { getTypedPath } from '~/app-path-types';

export async function formTestAction(formData: FormData) {
  devLog('info', 'formData values:');
  formData.forEach((value, key) => {
    devLog('info', `- ${key}: ${value}`);
  });
  revalidatePath(getTypedPath('/example/form/06-events'));
}
