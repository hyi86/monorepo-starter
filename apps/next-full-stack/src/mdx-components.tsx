import { type MDXComponents } from 'mdx/types';
import { Pre } from './mdx/pre';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => <div className="markdown-body">{children}</div>,
    pre: async ({ children }) => {
      const metaRaw = children.props.metastring;
      const className = children.props.className;
      const code = children.props.children as string;

      return <Pre metastring={metaRaw} className={className} code={code} />;
    },
    ...components,
  };
}
