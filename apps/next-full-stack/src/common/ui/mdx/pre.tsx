import { type BundledLanguage, codeToHtml } from 'shiki';
import { themes, transformers } from '~/common/config/code-block';
import { parseRawMeta } from '~/common/lib/mdx-meta';
import { CodeHeader } from './code-header';

export async function Pre({ metastring, className, code }: { metastring: string; className: string; code: string }) {
  const metaData = { __raw: metastring };
  const metaDataCustom = {
    showLineNumbers: true,
    fileName: '',
    ...parseRawMeta(metastring),
  };

  const lang = className?.replace('language-', '');
  const html = await codeToHtml(code.trim(), {
    lang: lang as BundledLanguage,
    meta: metaData,
    themes,
    transformers,
  });

  return (
    <div className="mb-4 overflow-hidden rounded-md border shadow-sm">
      <CodeHeader fileName={metaDataCustom.fileName} lang={lang} code={code} />
      <div className="not-prose" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
