import { Toaster } from '@monorepo-starter/ui/components/sonner';
import { Viewport, type Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { getLocale } from '~/common/lib/i18n/locale';
import { TanstackQueryProvider } from '~/common/providers/query/query-provider';
import { ComponentInfoPanel } from '~/features/component-info-panel/ui/ComponentInfoPanel';
import { UploaderStoreProvider } from '~/features/file-upload/lib/uploader-context';
import { Spotlight } from '~/features/spotlight/ui/Spotlight';
import { WebPushProvider } from '~/features/web-push/lib/web-push-context';

import 'react-advanced-cropper/dist/style.css';
import './globals.css';

const pretendard = localFont({
  src: '../common/fonts/PretendardVariable.woff2',
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
    statusBarStyle: 'black-translucent',
  },
};

export const viewport: Viewport = {
  themeColor: '#000',
};

export default async function RootLayout(props: LayoutProps<'/'>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning className={`${pretendard.variable} antialiased`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NuqsAdapter>
            <TanstackQueryProvider>
              <UploaderStoreProvider>
                <WebPushProvider>
                  {props.children}
                  <Spotlight />
                  <ComponentInfoPanel />
                </WebPushProvider>
              </UploaderStoreProvider>
            </TanstackQueryProvider>
          </NuqsAdapter>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
