import type { BundledLanguage } from 'shiki';
import { codeToHtml } from 'shiki';
import { themes, transformers } from '~/shared/config/code-block';

interface Props {
  children: string;
  lang: BundledLanguage;
}

export async function CodeBlock(props: Props) {
  const out = await codeToHtml(props.children, {
    lang: props.lang,
    themes,
    transformers,
  });

  return <div dangerouslySetInnerHTML={{ __html: out }} />;
}
