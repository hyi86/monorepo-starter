'use client';

import { useIsMobile } from '@monorepo-starter/ui/hooks/use-mobile';
import { useEffect } from 'react';

/**
 * 현재 페이지가 폴더 경로에 있는 경우, 해당 폴더를 스크롤 하여 보여줌
 */
export function useScrollToMenuObserver(pathname: string) {
  const isMobile = useIsMobile();

  // 현재 페이지가 폴더 경로에 있는 경우, 해당 폴더를 스크롤 하여 보여줌
  useEffect(() => {
    const target = document.querySelector(`[data-slot="sidebar-menu-button"][data-active="true"]`);
    if (!target) {
      return;
    }

    if (isMobile) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        const isVisible = entry?.isIntersecting;
        if (!isVisible) {
          target.scrollIntoView({ behavior: 'auto', block: 'center' });
        }

        obs.disconnect();
      },
      {
        root: null,
        threshold: 0.1,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [pathname, isMobile]);

  return null;
}
