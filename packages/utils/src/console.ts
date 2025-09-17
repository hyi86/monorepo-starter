import type { LiteralUnion } from 'type-fest';
import { clamp } from '~/number';

const RESET = '\x1b[0m';

/**
 * 콘솔 로그 색상 변경 함수
 * 반드시 트루컬러 지원 터미널에서 사용해야 함(iTerm2, VSCode, etc.)
 * @example
 * const log = console.log;
 * log(green('Hello, world!'));
 */
const rgb = (value: string) => (text: string) => {
  const [red, green, blue] = value.split(' ').map(Number);
  if (!red || !green || !blue) {
    return text;
  }

  const clampedRed = clamp(red, 0, 255);
  const clampedGreen = clamp(green, 0, 255);
  const clampedBlue = clamp(blue, 0, 255);
  return `\x1b[38;2;${clampedRed};${clampedGreen};${clampedBlue}m${text}${RESET}`; // bg: \x1b[48;2;...
};

export const green = rgb('34 197 94');
export const dim = rgb('156 163 175');
export const dim2 = rgb('107 114 128');
export const cyan = rgb('59 130 246');
export const white = rgb('217 217 217');
export const yellow = rgb('250 204 21');
export const magenta = rgb('219 39 119');
export const red = rgb('239 68 68');

export const processColor = rgb('156 163 175');
export const successColor = rgb('34 197 94');
export const infoColor = rgb('59 130 246');
export const warnColor = rgb('250 204 21');
export const errorColor = rgb('239 68 68');

export const whiteSpace = ' '.repeat(13);

type LogType = LiteralUnion<'process' | 'success' | 'info' | 'warn' | 'error', string>;

/**
 * `Edge runtime` 과 `Node.js` 에서 동일한 콘솔 로그 스타일을 유지하기 위한 유틸리티 Logger
 * `web browser`은 지원 안함(throw error)
 * @see {@link https://ui.shadcn.com/colors Tailwind CSS Colors}
 * @example
 * devLog('process', 'Hello, world!');
 * devLog('success', 'Hello, world!');
 * devLog('info', 'Hello, world!');
 * devLog('warn', 'Hello, world!');
 * devLog('error', 'Hello, world!');
 * devLog('Hello, world!');
 */
export function devLog(type: LogType, ...args: any[]) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  if (typeof window !== 'undefined') {
    throw new Error('devLog is not supported in the browser');
  }

  const log = console.log;

  const now = `[${new Date().toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })}]`;

  switch (type) {
    case 'process':
      log(processColor(` ⠋ ${now}`), ...args);
      return;
    case 'success':
      log(successColor(` ✓ ${now}`), ...args);
      return;
    case 'info':
      log(infoColor(` ○ ${now}`), ...args);
      return;
    case 'warn':
      log(warnColor(` ⚠ ${now}`), ...args);
      return;
    case 'error':
      log(errorColor(` ✗ ${now}`), ...args);
      return;
    default:
      log(whiteSpace, type, ...args);
      return;
  }
}
