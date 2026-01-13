import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';

/**
 * 사용 가능한 언어 목록
 */
export function getAvailableLocales() {
  return ['ko', 'en', 'ja'] as const;
}

/**
 * 기본 언어
 */
export const defaultLocale = getAvailableLocales()[0];

/**
 * 사용 가능한 언어 타입
 */
export type AvailableLocales = ReturnType<typeof getAvailableLocales>[number];

/**
 * 시스템 기본 언어 가져오기
 */
export function getLocaleInHeaders(request: NextRequest) {
  const availableLocales = getAvailableLocales();
  // headers 객체를 일반 객체로 변환
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // 사용 가능한 언어 목록
  const locales = Array.from(availableLocales);
  // 가장 적합한 언어 선택
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);
  // 기본 언어 선택
  const locale = matchLocale(languages, locales, availableLocales[0]);

  return locale;
}
