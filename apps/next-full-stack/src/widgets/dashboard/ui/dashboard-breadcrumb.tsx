import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@monorepo-starter/ui/components/breadcrumb';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  const pathNames = pathname.split('/').slice(2);

  return (
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
  );
}
