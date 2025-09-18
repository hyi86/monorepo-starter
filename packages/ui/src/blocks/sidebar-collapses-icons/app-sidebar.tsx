'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@monorepo-starter/ui/components/sidebar';
import { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { NavMain } from './nav-main';
import { NavProjects } from './nav-projects';
import { NavSecondary } from './nav-secondary';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';

type Props = {
  data: {
    teams: {
      name: string;
      logo: React.ElementType;
      plan: string;
    }[];
    navMain: {
      title: string;
      url: string;
      icon?: LucideIcon;
      isActive?: boolean;
      items?: {
        title: string;
        url: string;
      }[];
    }[];
    projects: {
      name: string;
      url: string;
      icon: LucideIcon;
    }[];
    navSecondary: {
      title: string;
      url: string;
      icon: LucideIcon;
    }[];
    user: {
      name: string;
      email: string;
      avatar: string;
    };
  };
  useCollapsibleIcon?: boolean;
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ data, useCollapsibleIcon = false, ...props }: Props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} useCollapsibleIcon={useCollapsibleIcon} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
