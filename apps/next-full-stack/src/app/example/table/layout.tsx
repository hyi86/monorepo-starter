import { type Metadata } from 'next';
import { Article } from '~/common/ui/layout/article';

export const metadata: Metadata = {
  title: 'Table',
};

export default function TableLayout({ children }: { children: React.ReactNode }) {
  return <Article>{children}</Article>;
}
