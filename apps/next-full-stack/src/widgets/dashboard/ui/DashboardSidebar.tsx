import { getAllFolderPaths } from '@henry-hong/common-utils/tree';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from '@monorepo-starter/ui/components/sidebar';
import { NotebookPen } from 'lucide-react';
import Link from 'next/link';
import { checkAuthorization } from '~/features/auth/lib/check-auth';
import { getAllRouteTree } from '../lib/all-routes';
import { DashboardSidebarSearchInput } from './DashboardSidebarSearchInput';
import FileTreeMenuGroup from './FileTreeMenuGroup';
import { NavUser } from './NavUser';

type Props = React.ComponentProps<typeof Sidebar>;

export default async function DashboardSidebar({ ...props }: Props) {
  const { payload } = await checkAuthorization();
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
        <DashboardSidebarSearchInput />
      </SidebarHeader>
      <SidebarContent className="[&_[data-active='true']]:bg-foreground/8">
        <FileTreeMenuGroup routes={routeTree} folderPaths={folderPaths} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser payload={payload} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

DashboardSidebar.displayName = 'DashboardSidebar';
