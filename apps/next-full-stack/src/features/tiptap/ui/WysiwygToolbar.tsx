'use client';

import { Separator } from '@monorepo-starter/ui/components/separator';
import { type Editor } from '@tiptap/react';
import { AlignBlock } from './AlignBlock';
import { CodeBlockBlock } from './CodeBlock';
import { DocumentBlock } from './DocumentBlock';
import { LinkBlock } from './LinkBlock';
import { ListBlock } from './ListBlock';
import { MediaBlock } from './MediaBlock';
import { TablesBlock } from './TablesBlock';
import { TextBasicBlock } from './TextBasicBlock';
import { TextColorBlock } from './TextColorBlock';
import { TextStylesBlock } from './TextStylesBlock';
import { UndoRedoBlock } from './UndoRedoBlock';

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
