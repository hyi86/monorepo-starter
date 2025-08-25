/**
 * HTML to React JSX converter
 * @see https://github.com/remarkablemark/html-react-parser
 */
import Link from 'next/link';
import { i18n, Locale } from '~/common/config/i18n';
import { getI18nUtils } from '~/common/lib/i18n/dictionaries';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function AppLangPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const { t } = getI18nUtils(lang);

  return (
    <div>
      {lang}
      <h1>{t('Common.language')}</h1>
      <div>
        {t.rich('ExampleIntro.list', {
          code: (chunks: any) => <code className="text-emerald-600">{chunks}</code>,
        })}
      </div>
      <div>
        {Array.from({ length: 10 }, (_, i) => {
          return (
            <div key={i}>
              <Link href={`/example/${lang}/${i}`}>{i}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
