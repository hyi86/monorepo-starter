import { devLog } from '@henry-hong/common-utils/console';
import { type NextRequest } from 'next/server';

/**
 * 요청 로그 기록
 *
 * @example
 * await loggerMiddleware(request);
 */
export function loggerMiddleware(request: NextRequest) {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  // 페이지 라우트, 서버액션에 대한 접근 로그 (API 라우트는 제외)
  const timestamp = new Date().toISOString();
  const forwardedFor = request.headers.get('x-forwarded-for') || '';
  const clientIp =
    forwardedFor
      ?.split(',')[0]
      ?.trim()
      .replace(/^::ffff:/, '') || 'unknown';

  const userAgent = request.headers.get('user-agent') || '-';
  const method = request.method;
  const protocol = request.nextUrl.protocol.replace(':', '').toUpperCase();
  const fullUrl = request.nextUrl.href;
  const referer = request.headers.get('referer') || '-';

  // nginx 로그 형식: CLIENT_IP - - [TIMESTAMP] "METHOD URL PROTOCOL" "REFERER" "USER_AGENT"
  const logLine = `${clientIp} - - [${timestamp}] "${method} ${fullUrl} ${protocol}" "${referer}" "${userAgent}"`;
  devLog('info', logLine);
}
