import { type Metadata } from 'next';
import { Article } from '~/shared/ui/layout';

export const metadata: Metadata = {
  title: 'Database',
};

export default function DatabaseLayout({ children }: { children: React.ReactNode }) {
  return <Article className="p-4">{children}</Article>;
}
