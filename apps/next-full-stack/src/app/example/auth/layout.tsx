import { type Metadata } from 'next';
import { Article } from '~/shared/ui/layout';

export const metadata: Metadata = {
  title: 'Auth',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Article className="p-4">{children}</Article>;
}
