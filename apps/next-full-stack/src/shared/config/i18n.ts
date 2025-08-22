/**
 * 국제화 설정
 */
export const i18n = {
  defaultLocale: 'ko',
  locales: ['ko', 'en', 'cn'],
} as const;

/**
 * 국제화 로케일
 */
export type Locale = (typeof i18n)['locales'][number];
