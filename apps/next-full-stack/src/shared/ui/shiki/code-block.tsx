import type { BundledLanguage } from 'shiki';
import { codeToHtml } from 'shiki';
import { themes } from '~/shared/config/code-block-themes';
import { getTransformers } from '~/shared/config/code-block-transformers';

interface Props {
  children: string;
  lang: BundledLanguage;
}

export async function CodeBlock(props: Props) {
  const out = await codeToHtml(props.children, {
    lang: props.lang,
    themes,
    transformers: getTransformers(true),
  });

  return <div dangerouslySetInnerHTML={{ __html: out }} />;
}
