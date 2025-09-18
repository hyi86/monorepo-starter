import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@monorepo-starter/ui/components/sidebar';
import { SearchForm } from './search-form';
import { SidebarOptInForm } from './sidebar-opt-in-form';
import { VersionSwitcher } from './version-switcher';

type Props = {
  versions: string[];
  useOptInForm?: boolean;
  children: React.ReactNode;
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ versions, useOptInForm = false, children, ...props }: Props) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher versions={versions} defaultVersion={versions[0]!} />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>{children}</SidebarContent>
      {useOptInForm && (
        <SidebarFooter>
          <div className="p-1">
            <SidebarOptInForm />
          </div>
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
