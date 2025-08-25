'use client';

import { type TreeRoute } from '@henry-hong/common-utils/tree';
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@monorepo-starter/ui/components/sidebar';
import { CopyMinus, CopyPlus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useScrollToMenuObserver } from '~/features/dashboard/model/use-scroll-to-menu-observer';
import { FileTreeMenuItem } from './FileTreeMenuItem';

export default function FileTreeMenuGroup({ routes, folderPaths }: { routes: TreeRoute[]; folderPaths: string[] }) {
  const [openPaths, setOpenPaths] = useState<string[]>([...folderPaths]);
  const pathname = usePathname();

  useScrollToMenuObserver(pathname);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Files</SidebarGroupLabel>
      <SidebarGroupAction title="Toggle all" onClick={() => setOpenPaths(openPaths.length > 0 ? [] : [...folderPaths])}>
        {openPaths.length > 0 ? <CopyMinus className="size-4" /> : <CopyPlus className="size-4" />}
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {routes.map((route) => (
            <FileTreeMenuItem
              pathname={pathname}
              key={route.path}
              item={route}
              openPaths={openPaths}
              setOpenPaths={setOpenPaths}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
