'use client';

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@monorepo-starter/ui/components/sidebar';
import { type TreeRoute } from '@monorepo-starter/utils/tree';
import { CopyMinus, CopyPlus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useScrollToMenuObserver } from '../model/use-scroll-to-menu-observer';
import { FileTreeMenuItem } from './file-tree-menu-item';

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
