import fs from 'node:fs';
import path from 'node:path';
import pino from 'pino';
import { env } from '~/common/config/env';

const development = process.env.NODE_ENV !== 'production';
const rootPath = process.cwd();

/**
 * Create a logger with a specific name
 * @example
 * // in server component
 * const logger = createLogger('server');
 * logger.info('Hello, world!');
 *
 * // in server action
 * import { createLogger } from '~/lib/logger/pino';
 * const logger = createLogger('action');
 * logger.info('Hello, world!');
 */
export function createLogger(name: string) {
  const destination = path.join(rootPath, env.LOG_FILE_PATH, `${name}.log`);
  const dirname = path.dirname(destination);

  try {
    fs.accessSync(dirname, fs.constants.W_OK); // 쓰기 가능한 디렉토리인지 확인
  } catch {
    fs.mkdirSync(dirname, { recursive: true });
    fs.chmodSync(dirname, 0o755);
  }

  const fileTransport = { target: 'pino/file', options: { destination } };
  const prettyTransport = { target: 'pino-pretty', options: { colorize: true } };

  return pino({
    level: development ? 'trace' : 'warn',
    transport: {
      targets: development ? [fileTransport, prettyTransport] : [fileTransport],
    },
  });
}
