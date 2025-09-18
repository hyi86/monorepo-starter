import type { AppRoutes } from '.next/types/routes';
import { AppSidebar } from '@monorepo-starter/ui/blocks/sidebar-basic/app-sidebar';
import { AppSidebarContents } from '@monorepo-starter/ui/blocks/sidebar-basic/app-sidebar-contents';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@monorepo-starter/ui/components/breadcrumb';
import { Separator } from '@monorepo-starter/ui/components/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@monorepo-starter/ui/components/sidebar';
import Link from 'next/link';
import { data } from '../data';

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar versions={data.versions}>
        <AppSidebarContents navMain={data.navMain} isCollapsible useCustomCollapsibleIcon />
      </AppSidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link href={'/blocks' as AppRoutes}>App Sidebar Example</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>04 Custom Collapsible Icon</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
