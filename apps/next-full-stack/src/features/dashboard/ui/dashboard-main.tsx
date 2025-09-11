'use client';

import { Separator } from '@monorepo-starter/ui/components/separator';
import { SidebarTrigger } from '@monorepo-starter/ui/components/sidebar';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { DashboardBreadcrumb } from './dashboard-breadcrumb';

export default function DashboardMain({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ '--sidebar-header-height': '3.5rem' } as React.CSSProperties} className="flex size-full flex-col">
      <header
        className={cn(
          'h-(--sidebar-header-height)',
          'bg-background sticky top-0 z-10 flex w-full items-center gap-2 border-b px-4',
        )}
      >
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <DashboardBreadcrumb />
      </header>
      {children}
    </div>
  );
}
