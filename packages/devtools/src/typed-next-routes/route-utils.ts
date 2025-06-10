import { MergeTreeNode, SpecialFile } from './route-structure';

// deep clone 유틸리티 (children 포함)
const deepCloneNode = (node: MergeTreeNode): MergeTreeNode => {
  return {
    path: node.path,
    children: node.children.map((child) => deepCloneNode(child)),
  };
};

// 머지 함수
export function mergeTreeNodes(trees: MergeTreeNode[][]): MergeTreeNode[] {
  const result: MergeTreeNode[] = [];

  const addOrMergeNode = (targetList: MergeTreeNode[], nodeToAdd: MergeTreeNode) => {
    // 같은 path 인 노드가 이미 존재하는지 찾기
    const existingNode = targetList.find((n) => n.path === nodeToAdd.path);

    if (existingNode) {
      // children merge (순서 유지)
      for (const childToAdd of nodeToAdd.children) {
        const existingChild = existingNode.children.find((c) => c.path === childToAdd.path);

        if (existingChild) {
          // 재귀 merge
          addOrMergeNode(existingNode.children, childToAdd);
        } else {
          // 순서 유지 → 뒤에 추가
          existingNode.children.push(deepCloneNode(childToAdd));
        }
      }
    } else {
      // targetList 에 신규 노드 추가 (deep copy)
      targetList.push(deepCloneNode(nodeToAdd));
    }
  };

  // 모든 트리 순회
  for (const tree of trees) {
    for (const node of tree) {
      addOrMergeNode(result, node);
    }
  }

  return result;
}

type SimpleTreeNode = SpecialFile & {
  children: SimpleTreeNode[];
};

export function buildSimpleSortedTree(items: SpecialFile[]): SimpleTreeNode[] {
  // sort 순서로 정렬
  const sortedItems = [...items].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

  const root: SimpleTreeNode[] = [];
  let currentLevel = root;

  for (const item of sortedItems) {
    const node: SimpleTreeNode = {
      path: item.path,
      children: [],
    };

    // 현재 레벨에 노드 추가
    currentLevel.push(node);

    // 다음 노드는 이 노드의 children 에 추가됨
    currentLevel = node.children;
  }

  return root;
}
