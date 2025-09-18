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
import type { Route } from 'next';
import Link from 'next/link';
import { data } from '../data';

export default function ExampleBlocksSidebar01Page() {
  return (
    <SidebarProvider>
      <AppSidebar versions={data.versions}>
        <AppSidebarContents navMain={data.navMain} />
      </AppSidebar>
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link href={'/blocks' as Route}>App Sidebar Example</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>01 Basic</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {Array.from({ length: 24 }).map((_, index) => (
            <div key={index} className="bg-muted/50 aspect-video h-12 w-full rounded-lg" />
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
