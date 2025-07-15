'use client';

import { Toggle } from '@monorepo-starter/ui/components/toggle';
import { type Editor } from '@tiptap/react';
import { IndentIcon, ListEndIcon, ListIcon, ListOrderedIcon, OutdentIcon } from 'lucide-react';

export function ListBlock({ editor }: { editor: Editor }) {
  // toggle bullet list
  const handleToggleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  // toggle ordered list
  const handleToggleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  // split list item
  const handleSplitListItem = () => {
    editor.chain().focus().splitListItem('listItem').run();
  };

  // sink list item
  const handleSinkListItem = () => {
    editor.chain().focus().sinkListItem('listItem').run();
  };

  // lift list item
  const handleLiftListItem = () => {
    editor.chain().focus().liftListItem('listItem').run();
  };

  return (
    <>
      <Toggle pressed={editor.isActive('bulletList')} onPressedChange={handleToggleBulletList}>
        <ListIcon className="size-4" />
      </Toggle>

      <Toggle pressed={editor.isActive('orderedList')} onPressedChange={handleToggleOrderedList}>
        <ListOrderedIcon className="size-4" />
      </Toggle>

      <Toggle disabled={!editor.can().splitListItem('listItem')} onPressedChange={handleSplitListItem}>
        <ListEndIcon className="size-4" />
      </Toggle>
      <Toggle disabled={!editor.can().sinkListItem('listItem')} onPressedChange={handleSinkListItem}>
        <IndentIcon className="size-4" />
      </Toggle>

      <Toggle disabled={!editor.can().liftListItem('listItem')} onPressedChange={handleLiftListItem}>
        <OutdentIcon className="size-4" />
      </Toggle>
    </>
  );
}
