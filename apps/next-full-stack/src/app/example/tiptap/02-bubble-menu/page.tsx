'use client';

import { Skeleton } from '@monorepo-starter/ui/components/skeleton';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import { useState } from 'react';
import { extensions } from '~/lib/tiptap/extensions';
import { WysiwygToolbar } from '~/lib/tiptap/toolbar';

export default function WysiwygBubbleMenuPage() {
  const [content, setContent] = useState('');

  const editor = useEditor({
    editable: true,
    autofocus: true,
    immediatelyRender: false,
    extensions,
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'p-4 mt-8 focus-visible:outline-none max-w-xl bg-zinc-100 dark:bg-zinc-900 mx-auto prose dark:prose-invert',
      },
    },
  });

  if (!editor) {
    return (
      <div>
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  return (
    <div>
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100, placement: 'bottom-start', maxWidth: 600, zIndex: 40 }}
        className="bg-background"
      >
        <WysiwygToolbar editor={editor} isBubbleMenu />
      </BubbleMenu>
      <EditorContent editor={editor} />
    </div>
  );
}
