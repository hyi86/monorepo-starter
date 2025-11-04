'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@monorepo-starter/ui/components/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@monorepo-starter/ui/components/sidebar';
import { ChevronsUpDown, LogIn, LogOut, Search } from 'lucide-react';
import { useState } from 'react';
import { type AuthorizationPayload } from '~/entities/user/lib/check-auth';
import { useSigninUrl } from '~/features/signin/model/use-signin';
import { signoutAction } from '~/features/signout/api/signout.action';
import { UserProfile } from './user-profile';

export function NavUser({ payload }: { payload?: AuthorizationPayload }) {
  const { isMobile } = useSidebar();
  const { handleClickSignin } = useSigninUrl();
  const [isOpen, setIsOpen] = useState(false);

  // 검색 키 이벤트 핸들러
  const handleClickOpenSearch = () => {
    const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true });
    document.dispatchEvent(event);
  };

  const handleClickLogout = () => {
    signoutAction();
  };

  const handleClickLogin = () => {
    handleClickSignin();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserProfile payload={payload} />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserProfile payload={payload} />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleClickOpenSearch}>
                <Search />
                검색
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleClickLogout} className={payload ? '' : 'hidden'} disabled={!payload}>
                <LogOut />
                로그아웃
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleClickLogin} className={payload ? 'hidden' : ''} disabled={!!payload}>
                <LogIn />
                로그인
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
