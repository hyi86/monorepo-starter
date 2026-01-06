import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { type NextRequest } from 'next/server';
import { i18n, type Locale } from '~/shared/i18n/config';

export function getLocale(request: NextRequest) {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = Array.from(i18n.locales);

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

  const locale = matchLocale(languages, locales, i18n.defaultLocale) as Locale;

  return locale;
}
