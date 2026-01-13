import { createTranslator, type Locale } from 'next-intl';
import { type JSX } from 'react';
import { defaultLocale } from './i18n.utils';

const dictionaries = {
  ko: {
    Common: {
      language: '한국어',
      hello: '안녕하세요',
    },
  },
  en: {
    Common: {
      language: 'English',
      hello: 'Hello',
    },
  },
  ja: {
    Common: {
      language: '日本語',
      hello: 'こんにちは',
    },
  },
};

/**
 * next-intl 의 translator 만 별도로 가져와서 사용
 * @see {@link https://next-intl.dev/docs/usage/messages}
 */
function createI18n(locale: Locale = defaultLocale) {
  const translator = createTranslator({ locale, messages: dictionaries[locale as keyof typeof dictionaries] });
  return {
    t: translator as typeof translator & {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const currentLocale = locale || defaultLocale;
  return createI18n(currentLocale);
}
