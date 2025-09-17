import { type Metadata } from 'next';
import { Article } from '~/shared/ui/layout/article-tag';

export const metadata: Metadata = {
  title: 'Code Block',
};

export default function CodeBlockLayout({ children }: { children: React.ReactNode }) {
  return <Article className="p-4">{children}</Article>;
}
