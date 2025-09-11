'use client';

import { AssistiveTreeDescription } from '@headless-tree/react';
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
import { appPathRoutes } from '~/app-path-types';
import { useTreeMenu } from '~/shared/model/use-tree-menu';

const routes = appPathRoutes
  .filter((route) => !route.isParallelRoute && !route.isDynamicRoute)
  .map((route) => route.href);

export default function TreeFull() {
  const {
    state,
    tree,
    handleSearch,
    handleExpandAll,
    handleCollapseAll,
    handleRename,
    handleAddItem,
    handleAddSiblingItem,
    handleDeleteItem,
  } = useTreeMenu({ routes });

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
