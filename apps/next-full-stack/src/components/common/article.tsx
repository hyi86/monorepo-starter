import { cn } from '@monorepo-starter/ui/lib/utils';

/**
 * Article 컴포넌트
 * @see {@link https://tailwindcss.com/docs/typography-plugin#default-styles}
 */
export function Article({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <article className={cn('prose dark:prose-invert max-w-none', className)}>{children}</article>;
}
