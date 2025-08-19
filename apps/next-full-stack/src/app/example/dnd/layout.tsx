import { type Metadata } from 'next';
import { Article } from '~/shared/ui/article';

export const metadata: Metadata = {
  title: 'Dnd Sortable',
};

export default function DndSortableLayout({ children }: { children: React.ReactNode }) {
  return <Article>{children}</Article>;
}
