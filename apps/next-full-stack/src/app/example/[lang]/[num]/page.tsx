/**
 * 동적 페이지의 경우, 여러개로 가져올 수 있음
 */
import { Locale } from '~/lib/i18n/config';
import { translate } from '~/lib/i18n/dictionaries';

export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({ num: (i + 1).toString() }));
}

export default async function AppDynamicLangNumPage({ params }: { params: Promise<{ lang: Locale; num: string }> }) {
  const { lang, num } = await params;

  return (
    <div>
      <div>
        Page Params:{' '}
        <strong className="text-rose-600">
          {lang}, {num}
        </strong>
      </div>
      <div>
        Message Language: <strong className="text-emerald-600">{translate('Common.language', lang)}</strong>
      </div>
      <div>
        Message Hello: <strong className="text-emerald-600">{translate('Common.hello', lang)}</strong>
      </div>
    </div>
  );
}
