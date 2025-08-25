import type { Metadata } from 'next';
import { Article } from '~/common/ui/layout/article';

export const metadata: Metadata = {
  title: 'Advanced Route',
};

export default async function AdvancedRouteLayout({ children }: { children: React.ReactNode }) {
  return <Article>{children}</Article>;
}
