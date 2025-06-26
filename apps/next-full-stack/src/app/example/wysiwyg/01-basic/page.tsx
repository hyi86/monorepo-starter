'use client';

import { Skeleton } from '@monorepo-starter/ui/components/skeleton';
import { EditorContent, useEditor } from '@tiptap/react';
import { useState } from 'react';
import { extensions } from '~/lib/wysiwyg/extensions';
import { WysiwygToolbar } from '~/lib/wysiwyg/toolbar';

export default function WysiwygBasicPage() {
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
          'p-4 mt-8 focus-visible:outline-none max-w-xl border-r border-l border-blue-500 mx-auto prose dark:prose-invert',
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
    <div className="relative">
      <WysiwygToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
