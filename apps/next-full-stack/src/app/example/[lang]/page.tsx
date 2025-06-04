import parseHtml from 'html-react-parser';
import { i18n, Locale } from '~/lib/i18n/config';
import { translate } from '~/lib/i18n/dictionaries';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function AppLangPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  return (
    <div>
      <h1>{translate('Common.language', lang)}</h1>
      <ul>
        {(translate('ExampleIntro.list', lang) as string[]).map((item) => (
          <li key={item}>{parseHtml(item)}</li>
        ))}
      </ul>
    </div>
  );
}
