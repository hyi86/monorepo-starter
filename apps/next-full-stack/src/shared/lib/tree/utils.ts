export type TreeData = {
  name: string;
  status?: string;
  path?: string;
  children?: string[];
};

/**
 * 경로 배열을 트리 구조로 변환하는 함수
 * 루트 반드시 필요
 * @param routes - 경로 배열
 * @returns 트리 구조 객체
 */
export function parseRoutesToTree(routes: string[]): Record<string, TreeData> {
  const tree: Record<string, TreeData> = {};

  // 각 경로를 처리
  routes.forEach((route) => {
    const segments = route.split('/').filter(Boolean); // 빈 문자열 제거
    let currentPath = '';

    segments.forEach((segment, index) => {
      const parentPath = currentPath;
      currentPath = currentPath ? `${currentPath}/${segment}` : `/${segment}`;

      // 키 생성 (예: 'example-auth', 'example-auth-protect')
      const key = segments.slice(0, index + 1).join('-');

      // 현재 경로가 tree에 없으면 추가
      if (!tree[key]) {
        tree[key] = {
          name: segment,
          path: currentPath,
          children: [],
        };
      }

      // 부모 경로가 있으면 children에 추가
      if (parentPath && index > 0) {
        const parentKey = segments.slice(0, index).join('-');
        if (tree[parentKey] && tree[parentKey].children) {
          if (!tree[parentKey].children!.includes(key)) {
            tree[parentKey].children!.push(key);
          }
        }
      }
    });
  });

  return tree;
}
