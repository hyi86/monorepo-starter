import { SidebarInset, SidebarProvider } from '@monorepo-starter/ui/components/sidebar';
import { type Metadata } from 'next';
import { Suspense } from 'react';
import { DashboardMain } from './_private/DashboardMain';
import { DashboardSidebar } from './_private/DashboardSidebar';

export const metadata: Metadata = {
  title: 'Examples',
  description: 'Examples Page',
};

/**
 * DashboardSidebar의 로딩 상태를 표시하는 컴포넌트
 */
function DashboardSidebarFallback() {
  return (
    <div className="bg-sidebar flex h-screen w-64 flex-col border-r">
      <div className="flex h-16 items-center border-b px-4">
        <div className="bg-sidebar-accent h-8 w-32 animate-pulse rounded" />
      </div>
      <div className="flex-1 p-4">
        <div className="space-y-2">
          <div className="bg-sidebar-accent h-4 w-full animate-pulse rounded" />
          <div className="bg-sidebar-accent h-4 w-3/4 animate-pulse rounded" />
          <div className="bg-sidebar-accent h-4 w-1/2 animate-pulse rounded" />
        </div>
      </div>
      <div className="flex h-16 items-center border-t px-4">
        <div className="bg-sidebar-accent h-10 w-full animate-pulse rounded" />
      </div>
    </div>
  );
}

async function ExampleLayout({ children }: LayoutProps<'/example'>) {
  return (
    <SidebarProvider>
      <Suspense fallback={<DashboardSidebarFallback />}>
        <DashboardSidebar variant="sidebar" />
      </Suspense>
      <SidebarInset>
        <DashboardMain>{children}</DashboardMain>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default ExampleLayout;
