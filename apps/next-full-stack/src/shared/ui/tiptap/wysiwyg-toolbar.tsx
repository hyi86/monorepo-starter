'use client';

import { Separator } from '@monorepo-starter/ui/components/separator';
import { type Editor } from '@tiptap/react';
import { AlignBlock } from './align-block';
import { CodeBlockBlock } from './code-block';
import { DocumentBlock } from './document-block';
import { LinkBlock } from './link-block';
import { ListBlock } from './list-block';
import { MediaBlock } from './media-block';
import { TablesBlock } from './tables-block';
import { TextBasicBlock } from './text-basic-block';
import { TextColorBlock } from './text-color-block';
import { TextStylesBlock } from './text-styles-block';
import { UndoRedoBlock } from './undo-redo-block';

export function WysiwygToolbar({ editor }: { editor: Editor }) {
  if (!editor) return null;

  return (
    <div className="bg-background sticky top-15 z-10 flex flex-wrap items-center justify-start gap-x-0.5 gap-y-2 border p-2">
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
      <MediaBlock editor={editor} />
      <LinkBlock editor={editor} />
      <Separator className="mx-1 data-[orientation=vertical]:h-6" orientation="vertical" />
      <CodeBlockBlock editor={editor} />
      <Separator className="mx-1 data-[orientation=vertical]:h-6" orientation="vertical" />
      <TextColorBlock editor={editor} />
      <Separator className="mx-1 data-[orientation=vertical]:h-6" orientation="vertical" />
      <AlignBlock editor={editor} />
      <Separator className="mx-1 data-[orientation=vertical]:h-6" orientation="vertical" />
      <TablesBlock editor={editor} />
    </div>
  );
}
