import { CounterStoreProvider } from './_private/counter.context';

export default function ZustandLayout({ children }: LayoutProps<'/example/zustand'>) {
  return <CounterStoreProvider>{children}</CounterStoreProvider>;
}
