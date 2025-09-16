import { createTranslator } from 'next-intl';
import { type JSX } from 'react';
import dictionaries from '~/dictionaries.json';
import { i18n, type Locale } from '~/shared/config/i18n';

/**
 * next-intl 의 translator 만 별도로 가져와서 사용
 * @see {@link https://next-intl.dev/docs/usage/messages}
 */
function createI18n(locale: Locale = i18n.defaultLocale) {
  const translator = createTranslator({ locale, messages: dictionaries[locale] });
  return {
    t: translator as typeof translator & {
      rich: (key: string, values?: Record<string, (chunks: any) => JSX.Element>) => JSX.Element;
    },
    locale,
  };
}

/**
 * 다국어 유틸리티 함수
 * @example
 * const { t } = getI18nUtils('ko');
 * t('Common.language');
 */
export function getI18nUtils(locale?: Locale) {
  const currentLocale = locale || i18n.defaultLocale;
  return createI18n(currentLocale);
}
