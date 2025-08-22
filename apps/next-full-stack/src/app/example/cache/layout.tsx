import { type Metadata } from 'next';
import { Article } from '~/common/ui/article';

export const metadata: Metadata = {
  title: 'Cache',
};

export default function CacheLayout({ children }: { children: React.ReactNode }) {
  return <Article>{children}</Article>;
}
