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
import { Button } from '@monorepo-starter/ui/components/button';
import { Checkbox } from '@monorepo-starter/ui/components/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@monorepo-starter/ui/components/dialog';
import { Input } from '@monorepo-starter/ui/components/input';
import { ScrollArea } from '@monorepo-starter/ui/components/scroll-area';
import { Tree, TreeDragLine, TreeItem, TreeItemLabel } from '@monorepo-starter/ui/components/tree';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { produce } from 'immer';
import {
  ExternalLinkIcon,
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
import { useState } from 'react';

type Item = {
  name: string;
  url?: string;
  children?: string[];
};

/**
 * 데이터 구조
 * [id]: { name: "Name", children: ['id1', 'id2', 'id3'] } 의 배열로 들어감
 *
 * - 데이터 구조가 단순하고 직관적임
 * - 정렬이 간단함(children 배열의 순서를 변경하면 됨)
 * - 무조건 루트가 필요함 (루트의 자식들만 노출)
 * - 신규 생성시,
 *   items에 신규항목을 push 하고, 루트에서부터 부모노드를 찾아서 children 배열에 추가해야 함
 * - 삭제 시,
 *   items에서 선택된 항목을 삭제하고, 부모노드의 children 배열에서 해당 항목을 제거해야 함
 */

const initialItems: Record<string, Item> = {
  root: {
    name: 'root',
    children: ['engineering', 'marketing', 'operations'],
  },
  engineering: {
    name: 'Engineering',
    url: 'https://www.kakao.com',
    children: ['frontend', 'backend', 'platform-team'],
  },
  frontend: { name: 'Frontend', children: ['design-system', 'web-platform'] },
  'design-system': {
    name: 'Design System',
    children: ['components', 'tokens', 'guidelines'],
  },
  components: { name: 'Components' },
  tokens: { name: 'Tokens' },
  guidelines: { name: 'Guidelines' },
  'web-platform': { name: 'Web Platform' },
  backend: { name: 'Backend', children: ['apis', 'infrastructure'] },
  apis: { name: 'APIs' },
  infrastructure: { name: 'Infrastructure' },
  'platform-team': { name: 'Platform Team' },
  marketing: { name: 'Marketing', children: ['content', 'seo'] },
  content: { name: 'Content' },
  seo: { name: 'SEO' },
  operations: { name: 'Operations', children: ['hr', 'finance'] },
  hr: { name: 'HR' },
  finance: { name: 'Finance' },
};

const initialExpandedItems = ['engineering', 'frontend', 'design-system'];
const initialSelectedItems = ['components'];
const initialCheckedItems = ['components', 'tokens'];

const indent = 20;

export default function TreeFull() {
  const [newItemIndex, setNewItemIndex] = useState(1);
  const [items, setItems] = useState(initialItems);
  const [state, setState] = useState<Partial<TreeState<Item>>>({});

  const tree = useTree<Item>({
    state,
    setState,
    initialState: {
      expandedItems: initialExpandedItems,
      selectedItems: initialSelectedItems,
      checkedItems: initialCheckedItems,
    },
    indent,
    rootItemId: 'root',
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
    canReorder: true,
    canCheckFolders: true,
    onDrop: createOnDropHandler((parentItem: any, newChildrenIds: any) => {
      setItems((prevItems) => ({
        ...prevItems,
        [parentItem.getId()]: {
          ...prevItems[parentItem.getId()]!,
          children: newChildrenIds,
        },
      }));
    }),
    onRename: (item: any, newName: any) => {
      const itemId = item.getId();
      setItems((prevItems) => ({
        ...prevItems,
        [itemId]: {
          ...prevItems[itemId],
          name: newName,
        },
      }));
    },
    dataLoader: {
      getItem: (itemId: string) => items[itemId]!,
      getChildren: (itemId: string) => items[itemId]!.children ?? [],
    },
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
        expandedItems: initialExpandedItems,
      }));
    }
  };

  // 모두 펼치기
  const handleExpandAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    tree.expandAll();
  };

  // 모두 접기
  const handleCollapseAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    tree.collapseAll();
  };

  // 이름 변경
  const handleRename = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const selectedItems = tree.getSelectedItems();
    if (selectedItems.length > 0) {
      selectedItems[0]!.startRenaming();
    }
  };

  // 하위에 항목 추가
  const handleAddItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const selectedItems = tree.getSelectedItems();
    if (selectedItems.length === 0) {
      return;
    }

    const selectedItem = selectedItems[0]!;
    const newItemId = `item-${Date.now()}`;
    const parentId = selectedItem.getId();

    setItems(
      produce(items, (draft) => {
        if (!draft[parentId]) {
          return;
        }

        if (!draft[parentId].children) {
          draft[parentId].children = [];
        }

        draft[parentId].children.push(newItemId);

        draft[newItemId] = {
          name: `New Item ${newItemIndex}`,
          children: [],
        };

        setNewItemIndex(newItemIndex + 1);
      }),
    );

    await delay(100);
    tree.rebuildTree();
    selectedItem.expand();
  };

  // 형제에 항목 추가
  const handleAddSiblingItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const selectedItems = tree.getSelectedItems();
    if (selectedItems.length === 0) {
      return;
    }

    const parentItem = selectedItems[0]!.getParent();
    if (!parentItem) {
      return;
    }

    const newItemId = `item-${Date.now()}`;
    const parentId = parentItem.getId();

    setItems(
      produce(items, (draft) => {
        if (!draft[parentId]) {
          return;
        }

        if (!draft[parentId].children) {
          draft[parentId].children = [];
        }

        draft[parentId].children.push(newItemId);

        draft[newItemId] = {
          name: `New Item ${newItemIndex}`,
          children: [],
        };

        setNewItemIndex(newItemIndex + 1);
      }),
    );

    await delay(100);
    tree.rebuildTree();
    parentItem.expand();
  };

  // 항목 삭제
  const handleDeleteItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const selectedItems = tree.getSelectedItems();
    if (selectedItems.length === 0) {
      return;
    }

    const selectedItem = selectedItems[0]!;
    const parentId = selectedItem.getParent()!.getId();

    setItems(
      produce(items, (draft) => {
        if (!draft[parentId]) {
          return;
        }

        if (!draft[parentId].children) {
          draft[parentId].children = [];
        }

        draft[parentId].children = draft[parentId].children.filter((childId) => childId !== selectedItem.getId());
      }),
    );

    await delay(100);
    tree.rebuildTree();
  };

  return (
    <div className="max-w-140 flex h-full w-full flex-col gap-4 p-4">
      {/* 검색 및 컨트롤 섹션 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleExpandAll}
            disabled={state.expandedItems?.length === tree.getItems().filter((item) => item.isFolder()).length}
          >
            <ListTreeIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
            모두 펼치기
          </Button>
          <Button size="sm" variant="outline" onClick={handleCollapseAll} disabled={state.expandedItems?.length === 0}>
            <ListCollapseIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
            모두 접기
          </Button>
          <Button size="sm" variant="outline" onClick={handleRename}>
            <PencilIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
            이름변경
          </Button>
          <Button size="sm" variant="outline" onClick={handleAddItem}>
            <PlusIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
            하위에 항목 추가
          </Button>
          <Button size="sm" variant="outline" onClick={handleAddSiblingItem}>
            <TrashIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
            형제에 항목 추가
          </Button>
          <Button size="sm" variant="outline" onClick={handleDeleteItem}>
            <TrashIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
            항목 삭제
          </Button>
        </div>
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
      </div>

      {/* 트리 섹션 */}
      <div className="flex-1 overflow-auto p-2">
        <Tree
          className="before:ms-4.5 relative before:absolute before:inset-0 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
          indent={indent}
          tree={tree}
        >
          <AssistiveTreeDescription tree={tree} />
          {tree.getItems().map((item) => {
            return (
              <div key={item.getId()} className="not-last:pb-0.5 flex items-center gap-1.5">
                <Checkbox
                  checked={
                    item.getCheckedState() === 'indeterminate' ? 'indeterminate' : item.getCheckedState() === 'checked'
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
                  <ExternalLinkIcon
                    className={cn(
                      'text-muted-foreground absolute right-1 top-1.5 size-4 cursor-pointer',
                      !item.getItemData().url && 'opacity-20',
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (item.getItemData().url) {
                        window.open(item.getItemData().url, '_blank');
                      }
                    }}
                  />
                </TreeItem>
              </div>
            );
          })}
          <TreeDragLine />
        </Tree>
      </div>

      {/* 상태 정보 섹션 */}
      <div className="border-t pt-4">
        <div className="text-muted-foreground text-sm">
          <div>
            선택된 항목:{' '}
            {tree
              .getSelectedItems()
              .map((item: any) => item.getItemName())
              .join(', ') || '없음'}
          </div>
          <div>
            체크된 항목:{' '}
            {tree
              .getItems()
              .filter((item: any) => item.getCheckedState() === 'checked')
              .map((item: any) => item.getItemName())
              .join(', ') || '없음'}
          </div>
          <div>검색 결과: {tree.getItems().filter((item: any) => item.isMatchingSearch?.()).length}개 항목</div>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">데이터 조회</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>데이터 조회</DialogTitle>
            <DialogDescription>데이터를 조회합니다.</DialogDescription>
            <ScrollArea className="h-[500px]">
              <pre className="bg-muted-foreground/30 p-4 text-xs">{JSON.stringify(items, null, 2)}</pre>
            </ScrollArea>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
