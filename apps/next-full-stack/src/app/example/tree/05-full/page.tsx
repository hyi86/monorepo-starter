'use client';

import {
  checkboxesFeature,
  createOnDropHandler,
  dragAndDropFeature,
  expandAllFeature,
  FeatureImplementation,
  hotkeysCoreFeature,
  keyboardDragAndDropFeature,
  renamingFeature,
  searchFeature,
  selectionFeature,
  syncDataLoaderFeature,
  TreeState,
} from '@headless-tree/core';
import { AssistiveTreeDescription, useTree } from '@headless-tree/react';
import { Button } from '@monorepo-starter/ui/components/button';
import { Checkbox } from '@monorepo-starter/ui/components/checkbox';
import { Input } from '@monorepo-starter/ui/components/input';
import { Tree, TreeDragLine, TreeItem, TreeItemLabel } from '@monorepo-starter/ui/components/tree';
import { cn } from '@monorepo-starter/ui/lib/utils';
import {
  ExternalLinkIcon,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  LinkIcon,
  ListCollapseIcon,
  ListTreeIcon,
  PencilIcon,
  SearchIcon,
} from 'lucide-react';
import { useState } from 'react';

interface Item {
  name: string;
  url?: string;
  children?: string[];
}

const initialItems: Record<string, Item> = {
  company: {
    name: 'Company',
    url: 'https://www.google.com',
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

const indent = 20;

export default function TreeFull() {
  const [items, setItems] = useState(initialItems);
  const initialExpandedItems = ['engineering', 'frontend', 'design-system'];
  const [state, setState] = useState<Partial<TreeState<Item>>>({});

  const doubleClickExpandFeature: FeatureImplementation = {
    itemInstance: {
      getProps: ({ tree, item, prev }) => ({
        ...prev?.(),
        onDoubleClick: (e: React.MouseEvent) => {
          item.primaryAction();

          if (!item.isFolder()) {
            return;
          }

          if (item.isExpanded()) {
            item.collapse();
          } else {
            item.expand();
          }
        },
        onClick: (e: React.MouseEvent) => {
          if (e.shiftKey) {
            item.selectUpTo(e.ctrlKey || e.metaKey);
          } else if (e.ctrlKey || e.metaKey) {
            item.toggleSelect();
          } else {
            tree.setSelectedItems([item.getItemMeta().itemId]);
          }

          item.setFocused();
        },
      }),
    },
  };

  const tree = useTree<Item>({
    state,
    setState,
    initialState: {
      expandedItems: initialExpandedItems,
      selectedItems: ['components'],
      checkedItems: ['components', 'tokens'],
    },
    indent,
    rootItemId: 'company',
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
      getItem: (itemId: any) => items[itemId]!,
      getChildren: (itemId: any) => items[itemId]!.children ?? [],
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
      doubleClickExpandFeature,
    ],
  });

  return (
    <div className="max-w-140 flex h-full w-full flex-col gap-4 p-4">
      {/* 검색 및 컨트롤 섹션 */}
      <div className="flex flex-col gap-2">
        <div className="relative">
          <Input
            className="peer ps-9"
            {...{
              ...tree.getSearchInputElementProps(),
              onChange: (e) => {
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
              },
            }}
            type="search"
            placeholder="트리 검색..."
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon className="size-4" aria-hidden="true" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => tree.expandAll()}>
            <ListTreeIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
            모두 펼치기
          </Button>
          <Button size="sm" variant="outline" onClick={tree.collapseAll}>
            <ListCollapseIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
            모두 접기
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={tree.getSelectedItems().length === 0}
            onClick={() => {
              const selectedItems = tree.getSelectedItems();
              if (selectedItems.length > 0) {
                selectedItems[0]!.startRenaming();
              }
            }}
          >
            <PencilIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
            이름변경
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const selectedItems = tree.getSelectedItems();
              if (selectedItems.length === 0) {
                return;
              }

              const selectedItem = selectedItems[0]!;
              const newItemId = `new-item-${Date.now()}`;

              // TODO: 새 항목 추가 로직 구현
            }}
          >
            항목 추가
          </Button>
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
                    disableChevron
                    className="before:bg-background relative before:absolute before:-inset-y-0.5 before:inset-x-0 before:-z-10"
                    // onDoubleClick={(e) => {
                    //   item.startRenaming();
                    // }}
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
    </div>
  );
}
