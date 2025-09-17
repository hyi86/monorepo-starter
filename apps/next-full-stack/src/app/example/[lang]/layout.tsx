import { notFound } from 'next/navigation';
import { i18n, type Locale } from '~/shared/config/i18n';
import { AppLanguageProvider } from '~/shared/provider/app-language';
import { Article } from '~/shared/ui/layout/article-tag';

/**
 * generateStaticParams()에서 제외된 경로에서 404를 반환
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams dynamicParams}
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function AppLangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  if (!i18n.locales.includes(lang)) {
    notFound();
  }

  return (
    <Article className="p-4">
      <AppLanguageProvider lang={lang}>{children}</AppLanguageProvider>
    </Article>
  );
}
