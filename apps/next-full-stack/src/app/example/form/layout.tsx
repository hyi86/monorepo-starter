import type { Metadata } from 'next';
import { Article } from '~/shared/ui/layout/article-tag';

export const metadata: Metadata = {
  title: 'Form',
};

export default async function FormLayout({ children }: { children: React.ReactNode }) {
  return <Article className="p-4">{children}</Article>;
}
