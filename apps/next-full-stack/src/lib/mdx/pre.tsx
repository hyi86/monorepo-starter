import { cn } from '@monorepo-starter/ui/lib/utils';
import { transformerMetaHighlight, transformerMetaWordHighlight, transformerNotationDiff } from '@shikijs/transformers';
import { type BundledLanguage, codeToHtml } from 'shiki';
import { CodeHeader } from './code-header';
import { parseRawMeta } from './meta';

export async function Pre({ metastring, className, code }: { metastring: string; className: string; code: string }) {
  const metaData = { __raw: metastring };
  const metaDataCustom = {
    showLineNumbers: false,
    themeLight: 'github-light',
    themeDark: 'github-dark',
    fileName: '',
    ...parseRawMeta(metastring),
  };

  // const lightThemes = [
  //   'catppuccin-latte',
  //   'everforest-light',
  //   'github-light',
  //   'light-plus',
  //   'material-theme-lighter',
  //   'material-theme-lighter',
  //   'min-light',
  //   'one-light',
  //   'slack-ochin',
  //   'snazzy-light',
  //   'solarized-light',
  //   'vitesse-light',
  // ];

  const lang = className?.replace('language-', '');
  const html = await codeToHtml(code.trim(), {
    lang: lang as BundledLanguage,
    meta: metaData,
    themes: {
      light: metaDataCustom.themeLight,
      dark: metaDataCustom.themeDark,
    },
    transformers: [
      transformerMetaHighlight({
        className: 'bg-gray-500/30',
      }),
      transformerMetaWordHighlight({
        className: 'ring-1 ring-gray-200/40 rounded-xs',
      }),
      transformerNotationDiff({
        classLineAdd: cn(
          'after:content-["+"] after:absolute after:left-2 after:pl-1 after:text-green-500 after:bg-green-500/10 after:w-full after:rounded-xs',
        ),
        classLineRemove: cn(
          'after:content-["-"] after:absolute after:left-2 after:pl-1 after:text-red-500 after:bg-red-500/10 after:w-full after:rounded-xs',
        ),
      }),
      {
        pre(node) {
          this.addClassToHast(node, cn('relative'));
        },
        code(node) {
          this.addClassToHast(
            node,
            cn('flex flex-col items-start w-full max-w-full px-1 py-4', metaDataCustom.showLineNumbers && 'px-1'),
          );
        },
        line(node, line) {
          node.properties.dataLineNumber = line;
          const className = cn(
            'text-[13px]/5 w-full min-h-5',
            'before:content-[attr(data-line-number)] before:inline-block before:w-12 before:pr-5 before:text-xs before:text-right before:text-muted-foreground',
            !metaDataCustom.showLineNumbers && 'before:opacity-0 before:w-6',
          );

          this.addClassToHast(node, className);
        },
      },
    ],
  });

  return (
    <div className="mb-4 overflow-hidden rounded-md border shadow-sm">
      <CodeHeader fileName={metaDataCustom.fileName} lang={lang} code={code} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
