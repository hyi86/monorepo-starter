import { Toaster } from '@monorepo-starter/ui/components/sonner';
import { Viewport, type Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { i18n } from '~/shared/config/i18n';
import { getLocale } from '~/shared/lib/i18n/locale';
import { TanstackQueryProvider } from '~/shared/provider/query';
import { WebPushProvider } from '~/shared/provider/web-push.context';
import { SpotlightDialog } from './_private/spotlight/SpotlightDialog';

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

export default async function RootLayout(props: LayoutProps<'/'>) {
  const locale = await getLocale();
  const defaultLocale = locale || i18n.defaultLocale;

  return (
    <html lang={defaultLocale} suppressHydrationWarning className={`${pretendard.variable} antialiased`}>
      <body>
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
