'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@monorepo-starter/ui/components/breadcrumb';
import { Separator } from '@monorepo-starter/ui/components/separator';
import { SidebarTrigger } from '@monorepo-starter/ui/components/sidebar';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export default function AppMainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pathNames = pathname.split('/').slice(2);

  return (
    <div style={{ '--sidebar-header-height': '3.5rem' } as React.CSSProperties} className="flex size-full flex-col">
      <header
        className={cn(
          'h-(--sidebar-header-height) bg-background sticky top-0 z-10 flex w-full items-center border-b px-4',
        )}
      >
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />

        {/* 브레드크럼 */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/example">Examples</BreadcrumbLink>
            </BreadcrumbItem>
            {pathNames.map((paths) => {
              return (
                <Fragment key={paths}>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{paths}</BreadcrumbPage>
                  </BreadcrumbItem>
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      {children}
    </div>
  );
}
