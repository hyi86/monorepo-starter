'use client';

import { useLayoutEffect } from 'react';
import { type Locale } from '~/shared/config/i18n';

/**
 * 서버컴포넌트에서 document 의 lang 을 강제로 변경하기 위한 Provider
 * @example
 * <AppLanguageProvider lang="ko">
 *   <div>Hello, world!</div>
 * </AppLanguageProvider>
 */
export function AppLanguageProvider({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  useLayoutEffect(() => {
    window.document.documentElement.lang = lang;
  }, [lang]);

  return children;
}
