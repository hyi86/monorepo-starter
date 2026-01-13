import { NextRequest } from 'next/server';
import { dim, underline } from 'picocolors';

/**
 * proxy 내에서 경로
 */
export function makeLoggerPath(url: NextRequest['nextUrl'] | URL) {
  return dim(`${url.pathname}${underline(url.search)}`);
}
