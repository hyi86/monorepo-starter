import { cn } from '@monorepo-starter/ui/lib/utils';
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import { type CodeToHastOptions } from 'shiki';

export const getTransformers = (showLineNumbers: boolean) => {
  return [
    /**
     * @see {@link https://shiki.matsu.io/packages/transformers#transformernotationdiff transformerNotationDiff}
     */
    transformerNotationDiff({
      classLineAdd: cn(
        'after:content-["+"] after:absolute after:left-2 after:pl-1 after:text-green-500 after:bg-green-500/10 after:w-full after:rounded-xs',
      ),
      classLineRemove: cn(
        'after:content-["-"] after:absolute after:left-2 after:pl-1 after:text-red-500 after:bg-red-500/10 after:w-full after:rounded-xs',
      ),
    }),

    /**
     * @see {@link https://shiki.matsu.io/packages/transformers#transformernotationhighlight transformerNotationHighlight}
     */
    transformerNotationHighlight({
      classActiveLine: cn('bg-gray-500/20 dark:bg-gray-500/20'),
    }),

    /**
     * @see {@link https://shiki.matsu.io/packages/transformers#transformermetahighlight TransformerMetaHighlight}
     */
    transformerMetaHighlight({
      className: 'bg-gray-500/20 dark:bg-gray-500/20',
    }),

    /**
     * @see {@link https://shiki.matsu.io/packages/transformers#transformermetaerrorlevel transformerMetaErrorLevel}
     */
    transformerNotationWordHighlight({
      classActiveWord: cn('ring-2 ring-gray-600/60 rounded-xs dark:ring-gray-400/60'),
    }),

    /**
     * @see {@link https://shiki.matsu.io/packages/transformers#transformermetawordhighlight transformerMetaWordHighlight}
     */
    transformerMetaWordHighlight({
      className: 'ring-2 ring-gray-600/60 rounded-xs dark:ring-gray-400/60',
    }),

    /**
     * @see {@link https://shiki.matsu.io/guide/transformers}
     */
    {
      pre(node) {
        this.addClassToHast(node, cn('relative p-0'));
      },
      code(node) {
        this.addClassToHast(
          node,
          cn('flex flex-col items-start w-full max-w-full px-1 py-4', showLineNumbers && 'px-1'),
        );
      },
      line(node, line) {
        node.properties.dataLineNumber = line;
        const className = cn(
          'text-[13px]/5 w-full min-h-5',
          'before:content-[attr(data-line-number)] before:inline-block before:w-12 before:pr-5 before:text-xs before:text-right before:text-muted-foreground',
          !showLineNumbers && 'before:opacity-0 before:w-6',
        );

        this.addClassToHast(node, className);
      },
    },
  ] as CodeToHastOptions['transformers'];
};
