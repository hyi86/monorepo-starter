import { type RecursiveImportResult } from './import-finder';

export type TreeNode = {
  filePath: string;
  depth: number;
  count: number;
  children: TreeNode[];
};

/**
 * 재귀적 import 결과를 트리 구조로 변환 (순환 참조 방지)
 */
export function buildTree(results: RecursiveImportResult[]): TreeNode {
  // 파일 경로를 키로 하는 맵 생성
  const nodeMap = new Map<string, TreeNode>();
  const processed = new Set<string>(); // 이미 처리된 노드 추적

  // 모든 노드 생성
  results.forEach((result) => {
    nodeMap.set(result.filePath, {
      filePath: result.filePath,
      depth: result.depth,
      count: result.imports.length,
      children: [],
    });
  });

  // 루트 노드 찾기 (깊이 0인 노드)
  const rootResult = results.find((result) => result.depth === 0);
  if (!rootResult) {
    return nodeMap.values().next().value as TreeNode;
  }

  // 재귀적으로 트리 구조 생성 (순환 참조 방지)
  function buildNodeRecursive(filePath: string, visited: Set<string>): TreeNode | null {
    // 순환 참조 체크
    if (visited.has(filePath)) {
      return null;
    }

    const node = nodeMap.get(filePath);
    if (!node) {
      return null;
    }

    // 이미 처리된 노드는 복사본 반환
    if (processed.has(filePath)) {
      return {
        filePath: node.filePath,
        depth: node.depth,
        count: node.count,
        children: [],
      };
    }

    visited.add(filePath);
    processed.add(filePath);

    // 해당 파일의 import 결과 찾기
    const result = results.find((r) => r.filePath === filePath);
    if (!result) {
      return node;
    }

    // 자식 노드들 생성
    const children: TreeNode[] = [];
    result.imports.forEach((importPath) => {
      const childNode = buildNodeRecursive(importPath, new Set(visited));
      if (childNode) {
        children.push(childNode);
      }
    });

    return {
      filePath: node.filePath,
      depth: node.depth,
      count: node.count,
      children,
    };
  }

  return buildNodeRecursive(rootResult.filePath, new Set()) || nodeMap.get(rootResult.filePath)!;
}

/**
 * 파일 트리를 콘솔에 출력(Recursive)
 */
export function renderTreeInTerminal(node: TreeNode) {
  let result = '';

  const renderTreeString = (node: TreeNode, prefix: string = '', isLast: boolean = true) => {
    const connector = isLast ? ' └─ ' : ' ├─ ';

    result += `${prefix}${connector}${node.filePath}\n`;

    node.children.forEach((child, index) => {
      const isLastChild = index === node.children.length - 1;
      const childPrefix = prefix + (isLast ? '   ' : ' │ ');
      renderTreeString(child, childPrefix, isLastChild);
    });

    return result;
  };

  result = renderTreeString(node);

  return result.trim();
}
