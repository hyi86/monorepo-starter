import {
  type DateArg,
  type FormatOptions,
  compareAsc as compareAscFn,
  format,
  formatDistanceToNow as formatDistanceToNowFn,
  formatISO,
  formatISO9075,
  isAfter as isAfterFn,
  parse as parseFn,
} from 'date-fns'; // Edge runtime OK
import { enUS } from 'date-fns/locale/en-US';
import { ko } from 'date-fns/locale/ko';
import { zhCN } from 'date-fns/locale/zh-CN';
import parseDuration from 'parse-duration'; // Edge runtime OK
import { LiteralUnion } from 'type-fest';

/**
 * 문자열을 초 단위로 변환
 * @example
 * strToSeconds('1h') // 3600
 * strToSeconds('1m') // 60
 * strToSeconds('1s') // 1
 * strToSeconds('1d') // 86400
 * strToSeconds('1w') // 604800
 * strToSeconds('1y') // 31536000
 */
export function parseDurationToSeconds(value: string) {
  return parseDuration(value, 's');
}

type FormatStrType = 'iso9075' | 'iso';
type FormatStrDateType = FormatStrType | `${FormatStrType}/date` | `${FormatStrType}/time` | `${FormatStrType}/number`;

/**
 * Date Format
 * @example
 * format(new Date(), 'iso9075') // 2025-05-22 10:27:55
 * format(new Date(), 'iso9075/date') // 2025-05-22
 * format(new Date(), 'iso9075/time') // 10:27:55
 * format(new Date(), 'iso9075/number') // 20250522102755
 *
 * format(new Date(), 'iso') // 2025-05-22T10:27:55.000Z
 * format(new Date(), 'iso/date') // 2025-05-22
 * format(new Date(), 'iso/time') // 10:27:55
 *
 * format(new Date(), 'yyyy-MM-dd HH:mm:ss') // 2025-05-22 10:27:55
 * format(new Date(), 'yyyy-MM-dd') // 2025-05-22
 * format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS') // 2025-05-22 10:27:55.000
 * format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS Z') // 2025-05-22 10:27:55.000 +09:00
 */
export function formatDate(
  date: DateArg<Date> & {},
  formatStr: LiteralUnion<FormatStrDateType, string> = 'iso9075',
  options: FormatOptions = {},
) {
  switch (formatStr) {
    case 'iso9075':
      return formatISO9075(date);
    case 'iso9075/date':
      return formatISO9075(date, { representation: 'date' });
    case 'iso9075/time':
      return formatISO9075(date, { representation: 'time' });
    case 'iso9075/number':
      return formatISO9075(date, { format: 'basic' });

    case 'iso':
      return formatISO(date);
    case 'iso/date':
      return formatISO(date, { representation: 'date' });
    case 'iso/time':
      return formatISO(date, { representation: 'time' });
    case 'iso/number':
      return formatISO(date, { format: 'basic' });

    default:
      return format(date, formatStr, options);
  }
}

export const formatDistanceToNow = formatDistanceToNowFn;
export const isAfter = isAfterFn;
export const compareAsc = compareAscFn;
export const parse = parseFn;
export const localeKo = ko;
export const localeEn = enUS;
export const localeZh = zhCN;
