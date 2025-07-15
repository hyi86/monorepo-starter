import type { BundledLanguage } from 'shiki';
import { codeToHtml } from 'shiki';
import { themes } from './themes';
import { getTransformers } from './transformers';

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
