import { type Metadata } from 'next';
import { Article } from '~/shared/ui/article';

export const metadata: Metadata = {
  title: 'Database',
};

export default function DatabaseLayout({ children }: { children: React.ReactNode }) {
  return <Article>{children}</Article>;
}
