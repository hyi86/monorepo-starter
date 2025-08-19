'use client';

import { useLayoutEffect } from 'react';
import { type Locale } from '~/shared/config/i18n';

/**
 * Document 언어 변경 Provider
 */
export function AppLanguageProvider({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  useLayoutEffect(() => {
    window.document.documentElement.lang = lang;
  }, [lang]);

  return children;
}
