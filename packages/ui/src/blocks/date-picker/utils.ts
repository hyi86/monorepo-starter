import { addDays, addMonths, addYears } from 'date-fns';

export type DatePresetValue = `${'+' | '-'}${number}${'d' | 'm' | 'y'}` | 'today';

export type DatePreset = {
  from: DatePresetValue;
  to: DatePresetValue;
  label: string;
};

/**
 * 날짜 프리셋 값 파싱
 * @param value - 파싱할 프리셋 값 (예: 'today', '+7d', '-1m', '+1y')
 * @returns 파싱된 Date 객체 또는 undefined (파싱 실패 시)
 */
export const parseDatePresetValue = (value: DatePresetValue): Date | undefined => {
  if (value === 'today') {
    return new Date();
  }

  // 정규식으로 operator, amount, unit 추출
  const match = value.match(/^([+-])(\d+)([dmy])$/);
  if (!match) {
    return undefined;
  }

  const [, operator, amountStr, unit] = match;
  if (!amountStr || !unit) {
    return undefined;
  }

  const amount = parseInt(amountStr, 10);

  if (Number.isNaN(amount)) {
    return undefined;
  }

  const updateAmount = operator === '-' ? -amount : amount;
  const baseDate = new Date();

  switch (unit) {
    case 'd':
      return addDays(baseDate, updateAmount);
    case 'm':
      return addMonths(baseDate, updateAmount);
    case 'y':
      return addYears(baseDate, updateAmount);
    default:
      return undefined;
  }
};
