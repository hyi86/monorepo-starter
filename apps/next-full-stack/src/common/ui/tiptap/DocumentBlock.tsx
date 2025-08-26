'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { type Editor } from '@tiptap/react';
import { EyeIcon } from 'lucide-react';

export function DocumentBlock({ editor }: { editor: Editor }) {
  const handleToggleInvisibleCharacters = () => {
    editor.chain().focus().toggleInvisibleCharacters().run();
  };

  return (
    <>
      <Button
        variant={editor.isActive('invisibleCharacters') ? 'default' : 'outline'}
        onClick={handleToggleInvisibleCharacters}
      >
        <EyeIcon className="size-4" />
      </Button>
    </>
  );
}
