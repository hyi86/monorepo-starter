export type TreeRoute = {
  path: string;
  name: string;
  hasPath: boolean;
  children: TreeRoute[];
};

/**
 * 경로 배열을 세그먼트로 분리하여 트리 구조로 변환
 * @example
 * const routes = ['/example/auth/login', '/example/auth/protect'];
 * const tree = buildTree(routes);
 * // {
 * //   path: '/example',
 * //   name: 'example',
 * //   hasPath: false,
 * //   children: [
 * //     {
 * //       path: '/example/auth',
 * //       name: 'auth',
 * //       hasPath: true,
 * //       children: [
 * //         {
 * //           path: '/example/auth/login',
 * //           name: 'login',
 * //           hasPath: true,
 * //           children: []
 * //         },
 * //         {
 * //           path: '/example/auth/protect',
 * //           name: 'protect',
 * //           hasPath: true,
 * //           children: []
 * //         }
 * //       ]
 * //     }
 * //   ]
 * // }
 */
export function buildTree(routes: string[]): TreeRoute[] {
  const routesTree: TreeRoute[] = [];

  routes.forEach((route) => {
    // 세그먼트로 분리
    const segments = route.split('/').filter(Boolean);
    let currentLevel = routesTree;
    let currentPath = '';

    segments.forEach((segment) => {
      // 경로 생성(현재 경로 + 세그먼트)
      currentPath = currentPath ? `${currentPath}/${segment}` : `/${segment}`;

      let existingNode = currentLevel.find((node) => node.path === currentPath);

      // 경로가 존재하지 않으면 추가
      if (!existingNode) {
        existingNode = {
          path: currentPath,
          name: segment,
          hasPath: routes.some((route) => route === currentPath),
          children: [],
        };
        currentLevel.push(existingNode);
      }

      // 자식 노드로 이동
      currentLevel = existingNode.children;
    });
  });

  // 폴더(children이 있는 노드)를 먼저, 그 다음 이름순으로 정렬
  const sortTreeNodes = (nodes: TreeRoute[]): TreeRoute[] => {
    return nodes
      .map((node) => ({
        ...node,
        children: sortTreeNodes(node.children),
      }))
      .sort((a, b) => {
        // 폴더 여부 비교
        const aIsFolder = a.children.length > 0;
        const bIsFolder = b.children.length > 0;

        if (aIsFolder && !bIsFolder) return -1;
        if (!aIsFolder && bIsFolder) return 1;

        // 폴더 여부가 같다면 이름순 정렬
        return a.name.localeCompare(b.name);
      });
  };

  return sortTreeNodes(routesTree);
}

export type FlattenedRoute = {
  path: string;
  name: string;
  hasPath: boolean;
  children?: FlattenedRoute[];
};

/**
 * 트리 구조를 Flat 하게 변환
 * @example
 * const tree = buildTree(routes);
 * const flattenedTree = flattenTree(tree);
 */
export function flattenTree(tree: FlattenedRoute[]): FlattenedRoute[] {
  const result: FlattenedRoute[] = [];

  function traverse(nodes: FlattenedRoute[]) {
    for (const node of nodes) {
      const { children, ...rest } = node;
      result.push(rest); // children 제외한 노드 저장
      if (children?.length) {
        traverse(children);
      }
    }
  }

  traverse(tree);
  return result;
}

/**
 * 트리 구조에서 모든 폴더 경로를 반환(Leaf를 제외한 모든 경로)
 * @example
 * const tree = buildTree(routes);
 * const paths = getAllFolderPaths(tree);
 */
export function getAllFolderPaths(items: TreeRoute[]): string[] {
  return items.reduce((acc: string[], item) => {
    if (item.children?.length > 0) {
      return [...acc, item.path, ...getAllFolderPaths(item.children)];
    }
    return acc;
  }, []);
}
