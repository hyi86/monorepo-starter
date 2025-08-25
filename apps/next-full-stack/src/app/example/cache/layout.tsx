import { type Metadata } from 'next';
import { Article } from '~/common/ui/layout/article';

export const metadata: Metadata = {
  title: 'Next.js Cache',
};

export default function CacheLayout({ children }: { children: React.ReactNode }) {
  return <Article className="p-2">{children}</Article>;
}
