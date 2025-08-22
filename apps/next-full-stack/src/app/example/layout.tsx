import { type Metadata } from 'next';
import { DashboardProvider } from '~/widgets/dashboard/ui/DashboardProvider';

export const metadata: Metadata = {
  title: 'Examples',
  description: 'Examples Page',
};

export default async function ExampleLayout({ children }: { children: React.ReactNode }) {
  return <DashboardProvider>{children}</DashboardProvider>;
}
