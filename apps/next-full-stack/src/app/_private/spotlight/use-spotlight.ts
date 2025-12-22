'use client';

import Fuse from 'fuse.js';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { getAllRoutes } from './routes.utils';

export function useSpotlight() {
  const [openCommandDialog, setOpenCommandDialog] = useState(false);
  const [search, setSearch] = useState('');
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const allRoutes = getAllRoutes();
  const fuse = useMemo(() => new Fuse(allRoutes, { keys: ['name', 'path'], threshold: 0.3 }), []);

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

  // 검색 결과 필터링
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

  // 명령어 키 이벤트 핸들러
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // 커멘트 모달 토글
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenCommandDialog((open) => {
          const newOpen = !open;
          // 모달이 열릴 때만 검색어 초기화
          if (newOpen) {
            setSearch('');
          }
          return newOpen;
        });
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

  return {
    theme,
    openCommandDialog,
    setOpenCommandDialog,
    search,
    setSearch,
    filteredRoutes,
    handleGoToPage,
    handleToggleSidebar,
    handleToggleTheme,
    handleViewComponentInfo,
  };
}
