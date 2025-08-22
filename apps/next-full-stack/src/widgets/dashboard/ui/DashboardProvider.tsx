import { SidebarInset, SidebarProvider } from '@monorepo-starter/ui/components/sidebar';
import DashboardMain from './DashboardMain';
import DashboardSidebar from './DashboardSidebar';

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar variant="sidebar" />
      <SidebarInset>
        <DashboardMain>{children}</DashboardMain>
      </SidebarInset>
    </SidebarProvider>
  );
}
