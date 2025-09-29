import { type Metadata } from 'next';
import { DashboardMain, DashboardSidebar, SidebarInset, SidebarProvider } from '~/widgets/dashboard';

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
