import type { Metadata } from 'next';
import { Article } from '~/shared/ui/layout/article';

export const metadata: Metadata = {
  title: 'Nuqs',
};

export default async function NuqsLayout({ children }: { children: React.ReactNode }) {
  return <Article className="p-4">{children}</Article>;
}
