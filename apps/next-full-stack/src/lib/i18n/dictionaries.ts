import { createTranslator } from 'next-intl';
import dictionaries from '~/dictionaries.json';
import { i18n, type Locale } from './config';

/**
 * next-intl 의 translator 만 별도로 가져와서 사용
 */
export function createI18n(locale: Locale = i18n.defaultLocale) {
  const translator = createTranslator({ locale, messages: dictionaries[locale] });
  return {
    t: translator,
    locale,
  };
}

export function getI18nUtils(locale?: Locale) {
  const currentLocale = locale || i18n.defaultLocale;
  return createI18n(currentLocale);
}
