import { cn } from '@monorepo-starter/ui/lib/utils';
import { type MDXComponents } from 'mdx/types';
import { Pre } from '~/lib/mdx/pre';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => (
      <div
        className={cn(
          'prose prose-sm prose-zinc',
          // prettier-ignore
          `
            prose-code:before:content-none
            prose-code:after:content-none
            prose-code:border
            prose-code:font-normal
            prose-code:text-xs
            prose-code:rounded
            prose-code:px-1.5
            prose-code:py-0.5
            prose-code:border-zinc-200
            prose-code:bg-zinc-100
            prose-code:text-zinc-500
            dark:prose-code:border-zinc-700
            dark:prose-code:bg-zinc-800
            dark:prose-code:text-zinc-400
          `,
        )}
      >
        {children}
      </div>
    ),
    pre: async ({ children }) => {
      const metaRaw = children.props.metastring;
      const className = children.props.className;
      const code = children.props.children as string;

      return <Pre metastring={metaRaw} className={className} code={code} />;
    },
    ...components,
  };
}
