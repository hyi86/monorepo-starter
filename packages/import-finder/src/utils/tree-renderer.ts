import { devLog } from '@henry-hong/common-utils/console';
import { type RecursiveImportResult } from './import-finder';

export type TreeNode = {
  filePath: string;
  depth: number;
  children: TreeNode[];
};

/**
 * 재귀적 import 결과를 트리 구조로 변환
 */
export function buildTree(results: RecursiveImportResult[]): TreeNode {
  // 파일 경로를 키로 하는 맵 생성
  const nodeMap = new Map<string, TreeNode>();

  // 모든 노드 생성
  results.forEach((result) => {
    nodeMap.set(result.filePath, {
      filePath: result.filePath,
      depth: result.depth,
      children: [],
    });
  });

  // 부모-자식 관계 설정
  const rootNodes: TreeNode[] = [];

  results.forEach((result) => {
    const currentNode = nodeMap.get(result.filePath);
    if (!currentNode) return;

    // 자식 노드들 추가
    result.imports.forEach((importPath) => {
      const childNode = nodeMap.get(importPath);
      if (childNode) {
        currentNode.children.push(childNode);
      }
    });

    // 루트 노드 찾기 (깊이 0인 노드)
    if (result.depth === 0) {
      rootNodes.push(currentNode);
    }
  });

  // 루트 노드가 없으면 첫 번째 노드를 루트로 사용
  return rootNodes[0] || (nodeMap.values().next().value as TreeNode);
}

/**
 * 트리를 콘솔에 출력
 */
export function renderTreeInTerminal(node: TreeNode, prefix: string = '', isLast: boolean = true): void {
  const connector = isLast ? '└─ ' : '├─ ';
  devLog('info', `${prefix}${connector} ${node.filePath}`);

  // 자식 노드들 출력
  node.children.forEach((child, index) => {
    const isLastChild = index === node.children.length - 1;
    const childPrefix = prefix + (isLast ? '   ' : '│  ');
    renderTreeInTerminal(child, childPrefix, isLastChild);
  });
}
