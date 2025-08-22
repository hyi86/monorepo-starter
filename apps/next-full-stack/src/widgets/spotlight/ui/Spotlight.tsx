'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@monorepo-starter/ui/components/command';
import { kebabCase } from 'change-case';
import Fuse from 'fuse.js';
import { InfoIcon, MoonIcon, Sidebar, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { appPathRoutes } from '~/app-path-types';

export function Spotlight() {
  const [openCommandDialog, setOpenCommandDialog] = useState(false);
  const [search, setSearch] = useState('');
  const { setTheme, theme } = useTheme();
  const router = useRouter();

  const allRoutes = appPathRoutes
    .filter((item) => !item.isDynamicRoute && !item.isParallelRoute)
    .map((item) => {
      const pathList = item.href.split('/').filter(Boolean);

      let name = '';
      if (pathList.length === 0) {
        name = 'home';
      } else {
        name = pathList.map((path) => kebabCase(path)).join('/');
      }

      return {
        name,
        path: item.href,
      };
    });

  const fuse = useMemo(() => new Fuse(allRoutes, { keys: ['name', 'path'], threshold: 0.3 }), []);
  const filteredRoutes = useMemo(() => {
    if (search.length === 0)
      return [
        {
          name: 'home',
          path: '/',
        },
        {
          name: 'example',
          path: '/example',
        },
      ];
    const results = fuse.search(search);
    return results.map((result) => result.item).slice(0, 5);
  }, [search, fuse, allRoutes]);

  // 사이드바 토글(강제 키 이벤트 발생)
  const handleToggleSidebar = () => {
    const event = new KeyboardEvent('keydown', { key: 'b', metaKey: true, bubbles: true });
    document.dispatchEvent(event);
  };

  // 테마 변경
  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // 컴포넌트 정보 보기
  const handleViewComponentInfo = () => {
    setOpenCommandDialog(false);
    const event = new KeyboardEvent('keydown', { key: 'i', metaKey: true, bubbles: true });
    document.dispatchEvent(event);
  };

  // 링크 이동
  const handleGoToPage = (path: string) => {
    router.push(path);
    setOpenCommandDialog(false);
  };

  // 명령어 키 이벤트 핸들러
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // 커멘트 모달 토글
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenCommandDialog((open) => !open);
      }

      // 테마 변경 토글
      if (e.key === 'e' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleToggleTheme();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [handleToggleTheme, handleToggleSidebar]);

  // Spotlight 모달 닫힐 때 검색어 초기화
  useEffect(() => {
    if (openCommandDialog) {
      setSearch('');
    }
  }, [openCommandDialog]);

  return (
    <>
      <CommandDialog open={openCommandDialog} onOpenChange={setOpenCommandDialog}>
        <CommandInput placeholder="Type a command or search..." value={search} onValueChange={setSearch} />
        <CommandList>
          <CommandEmpty>
            <p className="text-muted-foreground font-semibold">No results found.</p>
          </CommandEmpty>
          <CommandGroup heading="Files">
            {filteredRoutes
              .filter((_, index) => index <= 10)
              .map((route) => (
                <CommandItem key={route.path} value={route.path} onSelect={() => handleGoToPage(route.path)}>
                  <span className="font-mono">{route.name}</span>
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Settings">
            <CommandItem onSelect={handleToggleSidebar}>
              <Sidebar />
              <span>Toggle sidebar</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleToggleTheme}>
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              <span>Toggle theme</span>
              <CommandShortcut>⌘E</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleViewComponentInfo}>
              <InfoIcon />
              <span>View Component info Current Path</span>
              <CommandShortcut>⌘I</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

Spotlight.displayName = 'Spotlight';
