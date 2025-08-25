'use server';

import { type AppRoutes } from '.next/types/routes';
import { devLog } from '@henry-hong/common-utils/console';
import { revalidatePath } from 'next/cache';

export async function formTestAction(formData: FormData) {
  devLog('info', 'formData values:');
  formData.forEach((value, key) => {
    devLog('info', `- ${key}: ${value}`);
  });
  revalidatePath('/example/form/06-events' as AppRoutes, 'page');
}
