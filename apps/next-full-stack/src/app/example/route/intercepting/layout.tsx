import { Article } from '~/shared/ui/layout';

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
