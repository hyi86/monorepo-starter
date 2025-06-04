import dictionaries from '~/dictionaries.json';
import { i18n, type Locale } from './config';

export const translate = (
  path: keyof (typeof dictionaries)[typeof i18n.defaultLocale],
  locale: Locale = i18n.defaultLocale,
) => {
  return dictionaries[locale][path];
};
