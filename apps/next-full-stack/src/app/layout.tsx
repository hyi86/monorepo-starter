import { Toaster } from '@monorepo-starter/ui/components/sonner';
import { Viewport, type Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from 'react';
import { i18n } from '~/shared/config/i18n';
import { getLocale } from '~/shared/lib/i18n/locale';
import { TanstackQueryProvider } from '~/shared/provider/query';
import { WebPushProvider } from '~/shared/provider/web-push.context';
import { SpotlightDialog } from './_private/spotlight/SpotlightDialog';

import 'react-advanced-cropper/dist/style.css';
import './globals.css';

const pretendard = localFont({
  src: '../shared/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: {
    default: 'Next Full Stack',
    template: '%s | Next Full Stack',
  },
  description: 'Next Full Stack',
  appleWebApp: {
    title: 'Next Full Stack',
    statusBarStyle: 'default', // 'default' | 'black' | 'black-translucent'
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

/**
 * Locale을 가져오는 서버 컴포넌트 (Suspense 경계 내에서 실행)
 * cookies()를 사용하므로 Suspense 경계 내에서 실행되어야 합니다.
 * html 태그의 lang 속성은 기본 locale을 사용하고, 필요시 클라이언트에서 업데이트할 수 있습니다.
 */
async function LocaleUpdater() {
  // Suspense 경계 내에서 getLocale() 호출하여 cookies() 접근
  await getLocale();
  // html 태그는 이미 렌더링되었으므로, 기본 locale을 사용합니다.
  return null;
}

export default async function RootLayout(props: LayoutProps<'/'>) {
  // 기본 locale을 사용하여 html 태그 렌더링
  // Suspense로 감싼 getLocale() 호출이 완료되면 필요시 클라이언트에서 업데이트할 수 있습니다
  const defaultLocale = i18n.defaultLocale;

  return (
    <html lang={defaultLocale} suppressHydrationWarning className={`${pretendard.variable} antialiased`}>
      <body>
        <Suspense fallback={null}>
          <LocaleUpdater />
        </Suspense>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NuqsAdapter>
            <TanstackQueryProvider>
              <WebPushProvider>
                {props.children}
                <SpotlightDialog />
              </WebPushProvider>
            </TanstackQueryProvider>
          </NuqsAdapter>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
