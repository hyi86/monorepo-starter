import type { Metadata } from 'next';
import { Article } from '~/shared/ui/article';

export const metadata: Metadata = {
  title: 'Form',
};

export default async function ExperimentalLayout({ children }: { children: React.ReactNode }) {
  return <Article>{children}</Article>;
}
