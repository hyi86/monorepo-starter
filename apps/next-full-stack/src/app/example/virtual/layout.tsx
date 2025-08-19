import type { Metadata } from 'next';
import { Article } from '~/shared/ui/article';

export const metadata: Metadata = {
  title: 'Virtual',
};

export default async function VirtualLayout({ children }: { children: React.ReactNode }) {
  return <Article>{children}</Article>;
}
