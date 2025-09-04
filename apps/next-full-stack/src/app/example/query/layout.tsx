import type { Metadata } from 'next';
import { Article } from '~/shared/ui/layout';

export const metadata: Metadata = {
  title: 'Tanstack Query',
};

export default async function TanstackQueryLayout({ children }: LayoutProps<'/example/query'>) {
  return <Article className="p-4">{children}</Article>;
}
