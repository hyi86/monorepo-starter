import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@monorepo-starter/ui/components/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@monorepo-starter/ui/components/sidebar';
import { ChevronRight, MinusIcon, PlusIcon } from 'lucide-react';

type NavMain = {
  title: string;
  url: string;
  isActive?: boolean;
  items?: NavMain[];
};

type Props = {
  navMain: NavMain[];
  isCollapsible?: boolean;
  useCustomCollapsibleIcon?: boolean;
  useSubmenu?: boolean;
};

export function AppSidebarContents({ navMain, isCollapsible, useCustomCollapsibleIcon, useSubmenu }: Props) {
  if (useSubmenu) {
    return (
      <SidebarGroup>
        <SidebarMenu>
          {navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url} className="font-medium">
                  {item.title}
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <SidebarMenuSub>
                  {item.items.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton asChild isActive={item.isActive}>
                        <a href={item.url}>{item.title}</a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              ) : null}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  if (isCollapsible) {
    return navMain.map((item) => (
      <Collapsible key={item.title} title={item.title} defaultOpen className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel
            asChild
            className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
          >
            {useCustomCollapsibleIcon ? (
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  {item.title}
                  <PlusIcon className="ml-auto group-data-[state=open]/collapsible:hidden" />
                  <MinusIcon className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
            ) : (
              <CollapsibleTrigger>
                {item.title}
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            )}
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items?.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    ));
  }

  return navMain.map((item) => (
    <SidebarGroup key={item.title}>
      <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {item.items?.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.isActive}>
                <a href={item.url}>{item.title}</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
}
