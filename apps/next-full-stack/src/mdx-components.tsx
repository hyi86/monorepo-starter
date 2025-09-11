import { cn } from '@monorepo-starter/ui/lib/utils';
import { type MDXComponents } from 'mdx/types';
import { Pre } from '~/shared/ui/layout/pre';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => <div className={cn('prose prose-sm prose-zinc p-4')}>{children}</div>,
    pre: async ({ children }) => {
      const metaRaw = children.props.metastring;
      const className = children.props.className;
      const code = children.props.children as string;

      return <Pre metastring={metaRaw} className={className} code={code} />;
    },
    ...components,
  };
}
