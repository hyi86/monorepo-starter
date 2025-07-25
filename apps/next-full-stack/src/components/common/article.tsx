import { cn } from '@monorepo-starter/ui/lib/utils';
import { type PropsWithChildren } from 'react';

export function Article({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <article className={cn('prose dark:prose-invert max-w-none', className)}>{children}</article>;
}
