import { Article } from '~/common/ui/article';

export default function AppInterceptingLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <Article>
      {children}
      {modal}
    </Article>
  );
}
