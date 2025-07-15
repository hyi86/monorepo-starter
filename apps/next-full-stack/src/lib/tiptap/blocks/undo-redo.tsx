'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { type Editor } from '@tiptap/react';
import { Redo2Icon, Undo2Icon } from 'lucide-react';

export function UndoRedoBlock({ editor }: { editor: Editor }) {
  const handleUndo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    editor.chain().focus().undo().run();
  };

  const handleRedo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    editor.chain().focus().redo().run();
  };

  return (
    <>
      <Button size="sm" variant="outline" onClick={handleUndo} disabled={!editor.can().undo()} title="Undo">
        <Undo2Icon className="size-4" />
      </Button>
      <Button size="sm" variant="outline" onClick={handleRedo} disabled={!editor.can().redo()} title="Redo">
        <Redo2Icon className="size-4" />
      </Button>
    </>
  );
}
