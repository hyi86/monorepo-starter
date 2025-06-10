import FastGlob from 'fast-glob';
import path from 'node:path';
import { buildSimpleSortedTree, mergeTreeNodes } from './route-utils';

export type SpecialFile = {
  type?: string;
  path: string;
  sort?: number;
};

type PageRoute = {
  file: string;
  href: string | null;
  linkTypes: string;
  isParallelRoute: boolean;
  isDynamicRoute: boolean;
};

export type MergeTreeNode = SpecialFile & {
  children: MergeTreeNode[];
};

/**
 * 라우트 구조 생성
 */
export async function getRouteStructure(): Promise<
  {
    href: string | null;
    linkTypes: string;
    isParallelRoute: boolean;
    isDynamicRoute: boolean;
    files: string[];
    structures: MergeTreeNode[];
  }[]
> {
  const routes = FastGlob.sync('src/app/**/{page,layout,loading,not-found,error,template}.{ts,tsx,mdx}');
  const pagePathList = normalizePageRoutesBySegments(routes.filter((route) => route.match(/\/page\.(ts|tsx|mdx)$/)));

  const routeStructures: {
    href: string | null;
    linkTypes: string;
    files: string[];
    isParallelRoute: boolean;
    isDynamicRoute: boolean;
  }[] = [];

  // Href 기준으로 병합(병렬 라우트)
  for (const pageRoute of pagePathList) {
    const index = routeStructures.findIndex((item) => item.linkTypes === pageRoute.linkTypes);
    if (index < 0) {
      routeStructures.push({
        href: pageRoute.href,
        linkTypes: pageRoute.linkTypes,
        files: [pageRoute.file],
        isParallelRoute: pageRoute.isParallelRoute,
        isDynamicRoute: pageRoute.isDynamicRoute,
      });
    } else {
      routeStructures[index]!.files.push(pageRoute.file);
    }
  }

  // 라우트 구조 생성
  const updatedRouteStructures = routeStructures.map((routeStructure) => {
    const specialFiles = routeStructure.files.map((file) => {
      const specialFiles: SpecialFile[] = [];
      let currentDir = path.dirname(file);

      while (true) {
        const folderDepth = (currentDir.split('/').length - 2 + 1) * 10;
        const layoutPath = path.join(currentDir, 'layout.tsx');
        const templatePath = path.join(currentDir, 'template.tsx');
        const loadingPath = path.join(currentDir, 'loading.tsx');
        const errorPath = path.join(currentDir, 'error.tsx');
        const notFoundPath = path.join(currentDir, 'not-found.tsx');

        if (routes.includes(layoutPath)) {
          specialFiles.unshift({ type: 'layout', path: layoutPath, sort: folderDepth + 1 });
        }

        if (routes.includes(templatePath)) {
          specialFiles.unshift({ type: 'template', path: templatePath, sort: folderDepth + 2 });
        }

        if (routes.includes(loadingPath)) {
          specialFiles.unshift({ type: 'loading', path: loadingPath, sort: folderDepth + 3 });
        }

        if (routes.includes(errorPath)) {
          specialFiles.unshift({ type: 'error', path: errorPath, sort: folderDepth + 4 });
        }

        if (routes.includes(notFoundPath)) {
          specialFiles.unshift({ type: 'not-found', path: notFoundPath, sort: folderDepth + 5 });
        }

        if (currentDir === 'src/app') {
          break;
        }

        currentDir = path.dirname(currentDir);
      }

      specialFiles.push({
        type: 'page',
        path: file,
        sort: (path.dirname(file).split('/').length - 2 + 1) * 10 + 6,
      });

      return buildSimpleSortedTree(specialFiles);
    });

    const structures = mergeTreeNodes(specialFiles);

    return {
      href: routeStructure.href,
      linkTypes: routeStructure.linkTypes,
      isParallelRoute: routeStructure.isParallelRoute,
      isDynamicRoute: routeStructure.isDynamicRoute,
      files: routeStructure.files,
      structures,
    };
  });

  return updatedRouteStructures;
}

/**
 * `Next.js Page route` rule응 적용해서, 정보를 추출
 */
function normalizePageRoutesBySegments(allPageRoutes: string[]): PageRoute[] {
  const sanitizedFiles = allPageRoutes.map((routePath) => {
    const segments = routePath.split('/').slice(2); // src/app 을 제외한 경로 배열

    // Private route 는 무시
    // e.g. src/app/example/route/_private/page.tsx
    const hasPrivateRoute = segments.some((segment) => segment.startsWith('_'));
    if (hasPrivateRoute) {
      return {
        file: routePath,
        href: null,
      };
    }

    // Intercepting route 의 경우, 실제 라우팅 경로가 별도로 있으므로 무시
    // e.g. src/app/example/route/intercepting/@modal/(.)photo/[id]/page.tsx
    const hasInterceptingRoute = segments.some((segment) => segment.match(/\([.]{1,3}\)\w+/));
    if (hasInterceptingRoute) {
      return {
        file: routePath,
        href: null,
      };
    }

    const isParallelRoute = segments.some((segment) => segment.startsWith('@'));
    const isDynamicRoute = segments.some((segment) => segment.startsWith('[') && segment.endsWith(']'));

    const updatedSegments = segments
      .filter((segment) => !segment.match(/page\.(tsx|mdx|ts)$/)) // page.tsx segment 제거
      .filter((segment) => !segment.match(/^\(.+\)$/)) // 그룹 라우트 제거
      .filter((segment) => !segment.startsWith('@')); // 파라미터 라우트 제거

    const linkTypeSegments = updatedSegments.map((segment) => {
      if (segment.startsWith('[') && segment.endsWith(']')) {
        return '${string}';
      }

      return segment;
    });

    return {
      file: routePath,
      href: `/${updatedSegments.join('/')}`,
      linkTypes: `/${linkTypeSegments.join('/')}`,
      isParallelRoute,
      isDynamicRoute,
    };
  });

  return sanitizedFiles.filter((route) => route.href !== null).sort();
}
