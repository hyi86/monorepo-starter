import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Table',
};

export default function TableLayout({ children }: { children: React.ReactNode }) {
  return <div className="size-full p-4">{children}</div>;
}
