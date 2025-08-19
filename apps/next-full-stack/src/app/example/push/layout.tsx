import type { Metadata } from 'next';
import { Article } from '~/shared/ui/article';

export const metadata: Metadata = {
  title: 'Web Push',
};

export default async function WebPushLayout({ children }: { children: React.ReactNode }) {
  return <Article>{children}</Article>;
}
