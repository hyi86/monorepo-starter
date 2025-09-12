import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@monorepo-starter/ui/components/collapsible';
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@monorepo-starter/ui/components/sidebar';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { TreeRoute } from '@monorepo-starter/utils/tree';
import { ChevronRight, FileIcon, FolderIcon, FolderOpenIcon, SquareChevronDown } from 'lucide-react';
import Link from 'next/link';
import LinkIndicator from './link-indicator';

export function FileTreeMenuItem({
  pathname,
  item,
  openPaths,
  setOpenPaths,
}: {
  pathname: string;
  item: TreeRoute;
  openPaths: string[];
  setOpenPaths: (paths: string[]) => void;
}) {
  const menuItemClassName = cn(`text-sm truncate tracking-tight data-[active=true]:bg-transparent`);

  if (item.children.length === 0) {
    const isActive = pathname === item.path;
    return (
      <SidebarMenuItem>
        <SidebarMenuButton size="sm" isActive={isActive} className={menuItemClassName} asChild>
          {item.hasPath ? (
            <Link href={item.path} className="pl-8" prefetch={false}>
              <LinkIndicator>
                <FileIcon className="size-4" />
              </LinkIndicator>
              <span>{item.name}</span>
            </Link>
          ) : (
            <span>{item.name}</span>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        open={openPaths.includes(item.path)}
        onOpenChange={(open) => {
          if (open) {
            setOpenPaths([...openPaths, item.path]);
          } else {
            setOpenPaths(openPaths.filter((path) => path !== item.path));
          }
        }}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton size="sm" isActive={item.path === pathname} className={menuItemClassName}>
            <ChevronRight className="transition-transform" />
            {openPaths.includes(item.path) ? <FolderOpenIcon /> : <FolderIcon />}
            {item.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {/* 우측 여백 제거로 오른쪽 액션 버튼 노출 */}
          <SidebarMenuSub className="mr-0 pr-0">
            {item.children.map((subItem, index) => (
              <FileTreeMenuItem
                pathname={pathname}
                key={index}
                item={subItem}
                openPaths={openPaths}
                setOpenPaths={setOpenPaths}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
      {item.hasPath && (
        <SidebarMenuAction asChild>
          <Link href={item.path}>
            <SquareChevronDown className={cn(pathname === item.path && '-rotate-90')} />
          </Link>
        </SidebarMenuAction>
      )}
    </SidebarMenuItem>
  );
}
