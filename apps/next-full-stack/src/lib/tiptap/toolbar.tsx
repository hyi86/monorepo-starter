'use client';

import { Separator } from '@monorepo-starter/ui/components/separator';
import { type Editor } from '@tiptap/react';
import { AlignBlock } from './blocks/align';
import { DocumentBlock } from './blocks/document';
import { LinkBlock } from './blocks/link';
import { ListBlock } from './blocks/list';
import { MediaBlock } from './blocks/media';
import { TablesBlock } from './blocks/tables';
import { TextBasicBlock } from './blocks/text-basic';
import { TextColorBlock } from './blocks/text-color';
import { TextStylesBlock } from './blocks/text-styles';
import { UndoRedoBlock } from './blocks/undo-redo';

export function WysiwygToolbar({ editor }: { editor: Editor }) {
  if (!editor) return null;

  return (
    <div className="bg-background top-15 sticky z-10 flex flex-wrap items-center justify-start gap-x-0.5 gap-y-2 border p-2">
      <DocumentBlock editor={editor} />
      <Separator className="mx-1 data-[orientation=vertical]:h-6" orientation="vertical" />
      <UndoRedoBlock editor={editor} />
      <Separator className="mx-1 data-[orientation=vertical]:h-6" orientation="vertical" />
      <TextStylesBlock editor={editor} />
      <Separator className="mx-1 data-[orientation=vertical]:h-6" orientation="vertical" />
      <TextBasicBlock editor={editor} />
      <Separator className="mx-1 data-[orientation=vertical]:h-6" orientation="vertical" />
      <ListBlock editor={editor} />
      <Separator className="mx-1 data-[orientation=vertical]:h-6" orientation="vertical" />
      <LinkBlock editor={editor} />
      <MediaBlock editor={editor} />
      <Separator className="mx-1 data-[orientation=vertical]:h-6" orientation="vertical" />
      <TextColorBlock editor={editor} />
      <Separator className="mx-1 data-[orientation=vertical]:h-6" orientation="vertical" />
      <AlignBlock editor={editor} />
      <Separator className="mx-1 data-[orientation=vertical]:h-6" orientation="vertical" />
      <TablesBlock editor={editor} />
    </div>
  );
}
