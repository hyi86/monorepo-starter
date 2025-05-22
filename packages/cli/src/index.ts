import { devLog } from '@monorepo-starter/utils/console';

export function run() {
  devLog('info', 'Hello, world!');
}

export async function runAsync() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  devLog('info', 'Hello, world!');
}
