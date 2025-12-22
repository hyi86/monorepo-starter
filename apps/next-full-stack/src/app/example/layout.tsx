import { SidebarInset, SidebarProvider } from '@monorepo-starter/ui/components/sidebar';
import { type Metadata } from 'next';
import { DashboardMain } from './_private/DashboardMain';
import { DashboardSidebar } from './_private/DashboardSidebar';

export const metadata: Metadata = {
  title: 'Examples',
  description: 'Examples Page',
};

async function ExampleLayout({ children }: LayoutProps<'/example'>) {
  return (
    <SidebarProvider>
      <DashboardSidebar variant="sidebar" />
      <SidebarInset>
        <DashboardMain>{children}</DashboardMain>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default ExampleLayout;
