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
import { AssistiveTreeDescription, useTree } from '@headless-tree/react';
import { delay } from '@henry-hong/common-utils/fn';
import { Checkbox } from '@monorepo-starter/ui/components/checkbox';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@monorepo-starter/ui/components/context-menu';
import { Input } from '@monorepo-starter/ui/components/input';
import { ScrollArea } from '@monorepo-starter/ui/components/scroll-area';
import { Tree, TreeDragLine, TreeItem, TreeItemLabel } from '@monorepo-starter/ui/components/tree';
import { produce } from 'immer';
import {
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  ListCollapseIcon,
  ListTreeIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { appPathRoutes } from '~/app-path-types';
import { parseRoutesToTree, type TreeData } from './utils';

export default function TreeFull() {
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
      const data = appPathRoutes
        .filter((route) => !route.isParallelRoute && !route.isDynamicRoute)
        .map((route) => route.href);

      setItems(parseRoutesToTree(data));
      await delay(50);
      tree.rebuildTree();
    };
    loadData();
  }, []);

  return (
    <div className="max-w-lg flex-1 overflow-auto p-2 shadow">
      <div className="relative flex gap-2">
        <Input
          className="peer ps-9"
          {...{
            ...tree.getSearchInputElementProps(),
            onChange: handleSearch,
          }}
          type="search"
          placeholder="트리 검색..."
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon className="size-4" aria-hidden="true" />
        </div>
      </div>

      <ScrollArea className="mt-2 h-[500px]">
        <ContextMenu>
          <ContextMenuTrigger>
            <Tree
              className="before:ms-4.5 relative before:absolute before:inset-0 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
              indent={tree.getConfig().indent}
              tree={tree}
            >
              <AssistiveTreeDescription tree={tree} />
              {tree.getItems().map((item) => {
                return (
                  <div key={item.getId()} className="not-last:pb-0.5 flex items-center gap-1.5">
                    <Checkbox
                      checked={
                        item.getCheckedState() === 'indeterminate'
                          ? 'indeterminate'
                          : item.getCheckedState() === 'checked'
                      }
                      onCheckedChange={(checked) => {
                        const checkboxProps = item.getCheckboxProps();
                        checkboxProps.onChange?.({ target: { checked } });
                      }}
                    />
                    <TreeItem item={item} className="not-last:pb-0 relative flex-1">
                      <TreeItemLabel
                        className="before:bg-background relative before:absolute before:-inset-y-0.5 before:inset-x-0 before:-z-10"
                        onDoubleClick={() => {
                          item.startRenaming();
                        }}
                      >
                        <span className="flex items-center gap-2">
                          {item.isFolder() ? (
                            item.isExpanded() ? (
                              <FolderOpenIcon className="text-muted-foreground size-4 cursor-pointer" />
                            ) : (
                              <FolderIcon className="text-muted-foreground size-4 cursor-pointer" />
                            )
                          ) : (
                            <FileIcon className="text-muted-foreground pointer-events-none size-4" />
                          )}
                          {item.isRenaming() ? (
                            <Input {...item.getRenameInputProps()} autoFocus className="-my-0.5 h-6 px-1" />
                          ) : (
                            item.getItemName()
                          )}
                        </span>
                      </TreeItemLabel>
                    </TreeItem>
                  </div>
                );
              })}
              <TreeDragLine />
            </Tree>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              onClick={handleExpandAll}
              disabled={state.expandedItems?.length === tree.getItems().filter((item) => item.isFolder()).length}
            >
              <ListTreeIcon />
              Expand All
            </ContextMenuItem>
            <ContextMenuItem onClick={handleCollapseAll} disabled={state.expandedItems?.length === 0}>
              <ListCollapseIcon />
              Collapse All
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={handleRename} disabled={tree.getSelectedItems().length === 0}>
              <PencilIcon />
              Rename
            </ContextMenuItem>
            <ContextMenuItem onClick={handleAddItem} disabled={tree.getSelectedItems().length === 0}>
              <PlusIcon />
              Add Child
            </ContextMenuItem>
            <ContextMenuItem onClick={handleAddSiblingItem} disabled={tree.getSelectedItems().length === 0}>
              <PlusIcon />
              Add Sibling
            </ContextMenuItem>
            <ContextMenuItem onClick={handleDeleteItem} disabled={tree.getSelectedItems().length === 0}>
              <TrashIcon />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </ScrollArea>
    </div>
  );
}
