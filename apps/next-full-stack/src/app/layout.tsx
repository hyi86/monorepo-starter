import { Toaster } from '@monorepo-starter/ui/components/sonner';
import { Viewport, type Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { TanstackQueryProvider } from '~/app/providers/query-provider';
import { UploaderStoreProvider } from '~/app/providers/uploader-store-provider';
import { WebPushProvider } from '~/app/providers/web-push-provider';
import { getLocale } from '~/shared/lib/locale';
import { ComponentInfoPanel } from '~/shared/ui/command/component-info-panel';
import { Spotlight } from '~/shared/ui/command/spotlight';

import 'react-advanced-cropper/dist/style.css';
import './globals.css';

const pretendard = localFont({
  src: '../shared/ui/fonts/PretendardVariable.woff2',
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning className={`${pretendard.variable} antialiased`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NuqsAdapter>
            <TanstackQueryProvider>
              <UploaderStoreProvider>
                <WebPushProvider>
                  {children}
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
