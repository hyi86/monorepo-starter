'use client';

import { useLayoutEffect } from 'react';
import { type Locale } from '~/lib/i18n/config';

/**
 * Document 언어 변경 Provider
 */
export function AppLanguageProvider({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  useLayoutEffect(() => {
    window.document.documentElement.lang = lang;
  }, [lang]);

  return children;
}
