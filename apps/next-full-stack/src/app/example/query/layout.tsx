import type { Metadata } from 'next';
import { Article } from '~/shared/ui/article';

export const metadata: Metadata = {
  title: 'Tanstack Query',
};

export default async function TanstackQueryLayout({ children }: { children: React.ReactNode }) {
  return <Article>{children}</Article>;
}
