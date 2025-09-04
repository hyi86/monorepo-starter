import { type Metadata } from 'next';
import { DashboardProvider } from '~/features/dashboard/ui';

export const metadata: Metadata = {
  title: 'Examples',
  description: 'Examples Page',
};

async function ExampleLayout({ children }: LayoutProps<'/example'>) {
  return <DashboardProvider>{children}</DashboardProvider>;
}

export default ExampleLayout;
