'use server';

import { delay } from '@henry-hong/common-utils/fn';

export async function addMessageAction(message: string) {
  await delay(1500);
  return message;
}
