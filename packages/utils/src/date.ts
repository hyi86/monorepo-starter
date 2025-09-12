import { type DateArg, type FormatOptions, format, formatISO, formatISO9075 } from 'date-fns'; // Edge runtime OK
import { type LiteralUnion } from 'type-fest';

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
