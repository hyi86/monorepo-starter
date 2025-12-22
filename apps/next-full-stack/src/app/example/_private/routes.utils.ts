import { buildTree } from '@monorepo-starter/utils/tree';
import { appPathRoutes } from '~/routes';

export function getAllRouteTree() {
  const exampleRoutes = appPathRoutes
    .filter((route) => !route.isDynamicRoute)
    .filter((route) => route.href.startsWith('/example/'))
    .map((route) => route.href);

  const routeTree = buildTree(exampleRoutes)[0]?.children || [];

  // 커스텀 라우트 직접 추가
  routeTree.push({
    name: 'internationalization',
    path: '/example/[lang]',
    hasPath: false,
    children: [
      {
        name: 'Korean',
        path: '/example/ko',
        hasPath: true,
        children: [],
      },
      {
        name: 'English',
        path: '/example/en',
        hasPath: true,
        children: [],
      },
      {
        name: 'Chinese',
        path: '/example/cn',
        hasPath: true,
        children: [],
      },
    ],
  });

  return routeTree;
}
