import { type PropsWithChildren } from 'react';

export function Article({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <article className={className}>{children}</article>;
}
