import { cn } from '@monorepo-starter/ui/lib/utils';
import { type MDXComponents } from 'mdx/types';
import { Pre } from '~/lib/mdx/pre';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // @ts-expect-error 타입 불일치 무시
    wrapper: ({ children }) => <div className={cn('prose prose-sm prose-zinc')}>{children}</div>,
    // @ts-expect-error 타입 불일치 무시
    pre: async ({ children }) => {
      const metaRaw = children.props.metastring;
      const className = children.props.className;
      const code = children.props.children as string;

      return <Pre metastring={metaRaw} className={className} code={code} />;
    },
    ...components,
  };
}
