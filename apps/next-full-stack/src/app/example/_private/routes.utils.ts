import { buildTree } from '@monorepo-starter/utils/tree';
import { appRoutes } from '~/routes';

export function getAllRouteTree() {
  const exampleRoutes = appRoutes.filter((route) => route.path.startsWith('/example/')).map((route) => route.path);
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
