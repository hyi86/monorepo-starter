'use client';

import {
  checkboxesFeature,
  createOnDropHandler,
  dragAndDropFeature,
  expandAllFeature,
  hotkeysCoreFeature,
  keyboardDragAndDropFeature,
  renamingFeature,
  searchFeature,
  selectionFeature,
  syncDataLoaderFeature,
  TreeState,
} from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { delay } from '@henry-hong/common-utils/fn';
import { produce } from 'immer';
import { useEffect, useState } from 'react';

export type TreeData = {
  name: string;
  status?: string;
  path?: string;
  children?: string[];
};

export function useTreeMenu({ routes }: { routes: string[] }) {
  // Tree Data
  const [items, setItems] = useState<Record<string, TreeData>>({});

  // Tree Global States
  const [state, setState] = useState<Partial<TreeState<TreeData>>>({});

  // Tree Instance
  const tree = useTree<TreeData>({
    indent: 20,
    rootItemId: 'example',
    canReorder: true,
    canCheckFolders: true,
    features: [
      syncDataLoaderFeature,
      selectionFeature,
      hotkeysCoreFeature,
      dragAndDropFeature,
      keyboardDragAndDropFeature,
      renamingFeature,
      searchFeature,
      expandAllFeature,
      checkboxesFeature,
    ],
    state,
    setState,
    dataLoader: {
      getItem: (itemId: string) => {
        return items[itemId]!;
      },
      getChildren: (itemId: string) => {
        if (!items[itemId]) {
          return [];
        }

        return items[itemId].children ?? [];
      },
    },
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
    onDrop: createOnDropHandler((parentItem, newChildrenIds) => {
      setItems(
        produce((draft) => {
          const selectedItemId = parentItem.getId();

          if (!draft[selectedItemId]) {
            draft[selectedItemId] = {
              name: parentItem.getItemData().name,
              children: newChildrenIds,
            };
            return;
          }

          draft[selectedItemId].children = newChildrenIds;
        }),
      );
    }),
    onRename: (selectedItem, value) => {
      setItems(
        produce((draft) => {
          const selectedItemId = selectedItem.getId();
          if (!draft[selectedItemId]) {
            return;
          }

          draft[selectedItemId].name = value;
        }),
      );
    },
  });

  // 검색
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const originalProps = tree.getSearchInputElementProps();
    if (originalProps.onChange) {
      originalProps.onChange(e);
    }

    const value = e.target.value;
    if (value.length > 0) {
      tree.expandAll();
    } else {
      setState((prevState) => ({
        ...prevState,
        expandedItems: [],
      }));
    }
  };

  // 모두 펼치기
  const handleExpandAll = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    tree.expandAll();
  };

  // 모두 접기
  const handleCollapseAll = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    tree.collapseAll();
  };

  // 이름 변경
  const handleRename = async () => {
    const selectedItems = tree.getSelectedItems();
    if (selectedItems.length > 0) {
      selectedItems[0]!.startRenaming();
      await delay(100);
      selectedItems[0]!.getElement()?.focus();
    }
  };

  // 하위에 항목 추가
  const handleAddItem = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selectedItems = tree.getSelectedItems();
    if (selectedItems.length === 0) {
      return;
    }

    const selectedItem = selectedItems[0]!;
    const newItemId = `item-${Date.now() + Math.floor(Math.random() * 1000000)}`;
    const parentId = selectedItem.getId();

    setItems(
      produce((draft) => {
        if (!draft[parentId]) {
          return;
        }

        if (!draft[parentId].children) {
          draft[parentId].children = [];
        }

        draft[parentId].children.push(newItemId);

        draft[newItemId] = {
          name: `New Item ${newItemId}`,
          children: [],
        };
      }),
    );

    await delay(100);
    tree.rebuildTree();
    selectedItem.expand();
  };

  // 형제에 항목 추가
  const handleAddSiblingItem = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const selectedItems = tree.getSelectedItems();
    if (selectedItems.length === 0) {
      return;
    }

    const parentItem = selectedItems[0]!.getParent();
    if (!parentItem) {
      return;
    }

    const newItemId = `item-${Date.now() + Math.floor(Math.random() * 1000000)}`;
    const parentId = parentItem.getId();

    setItems(
      produce((draft) => {
        if (!draft[parentId]) {
          return;
        }

        if (!draft[parentId].children) {
          draft[parentId].children = [];
        }

        draft[parentId].children.push(newItemId);
        draft[newItemId] = {
          name: `New Item ${newItemId}`,
          children: [],
        };
      }),
    );

    await delay(100);
    tree.rebuildTree();
    parentItem.expand();
  };

  // 항목 삭제
  const handleDeleteItem = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const selectedItems = tree.getSelectedItems();
    if (selectedItems.length === 0) {
      return;
    }

    const selectedItem = selectedItems[0]!;
    const parentId = selectedItem.getParent()!.getId();

    setItems(
      produce((draft) => {
        if (!draft[parentId]) {
          return;
        }

        if (!draft[parentId].children) {
          draft[parentId].children = [];
        }

        draft[parentId].children = draft[parentId].children.filter((childId) => childId !== selectedItem.getId());

        // 재귀적으로 자식들을 삭제 상태로 만드는 함수
        const markChildrenAsDeleted = (itemId: string) => {
          const item = draft[itemId];
          if (!item) return;

          // 현재 아이템을 삭제 상태로 표시
          item.status = 'deleted';

          // 자식들이 있다면 재귀적으로 처리
          if (item.children && item.children.length > 0) {
            item.children.forEach((childId: string) => {
              markChildrenAsDeleted(childId);
            });
          }
        };

        // 선택된 아이템과 모든 자식들을 삭제 상태로 표시
        markChildrenAsDeleted(selectedItem.getId());
      }),
    );

    await delay(100);
    tree.rebuildTree();
  };

  // 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      setItems(parseRoutesToTree(routes));
      await delay(50);
      tree.rebuildTree();
    };
    loadData();
  }, []);

  return {
    items,
    state,
    tree,
    handleSearch,
    handleExpandAll,
    handleCollapseAll,
    handleRename,
    handleAddItem,
    handleAddSiblingItem,
    handleDeleteItem,
  };
}

/**
 * 경로 배열을 트리 구조로 변환하는 함수
 * 루트 반드시 필요
 * @param routes - 경로 배열
 * @returns 트리 구조 객체
 */
function parseRoutesToTree(routes: string[]): Record<string, TreeData> {
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
