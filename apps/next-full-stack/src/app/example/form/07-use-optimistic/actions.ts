'use server';

import { delay } from '@monorepo-starter/utils/fn';

export async function addMessageAction(message: string) {
  await delay(1200);
  return message;
}
