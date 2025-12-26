import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from '@monorepo-starter/ui/components/sidebar';
import { getAllFolderPaths } from '@monorepo-starter/utils/tree';
import { NotebookPen } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { getAllRouteTree } from '~/app/example/_private/routes.utils';
import { checkAuthorization } from '~/shared/lib/auth/check-auth';
import { DashboardSidebarSearch } from './DashboardSidebarSearch';
import { FileTreeMenuGroup } from './FileTreeMenuGroup';
import { NavUser } from './NavUser';

type DashboardSidebarProps = React.ComponentProps<typeof Sidebar>;

/**
 * NavUser를 렌더링하는 서버 컴포넌트 (Suspense 경계 내에서 실행)
 * cookies()를 사용하므로 Suspense 경계 내에서 실행되어야 합니다.
 */
async function NavUserWrapper() {
  const { payload } = await checkAuthorization();
  return <NavUser payload={payload} />;
}

export async function DashboardSidebar({ ...props }: DashboardSidebarProps) {
  const routeTree = getAllRouteTree();
  const folderPaths = getAllFolderPaths(routeTree);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/example">
            <div className="bg-sidebar-primary/60 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <NotebookPen className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">Examples</span>
              <span className="">v0.0.1</span>
            </div>
          </Link>
        </SidebarMenuButton>
        <DashboardSidebarSearch />
      </SidebarHeader>
      <SidebarContent className="**:data-[active='true']:bg-foreground/8">
        <FileTreeMenuGroup routes={routeTree} folderPaths={folderPaths} />
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<NavUser payload={undefined} />}>
          <NavUserWrapper />
        </Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

DashboardSidebar.displayName = 'DashboardSidebar';
