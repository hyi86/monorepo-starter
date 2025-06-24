'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';

export default function WysiwygBasicPage() {
  const [isEditing, setIsEditing] = useState(true);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    editable: true,
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-base md:prose-sm dark:prose-invert max-w-none [&_li>p]:my-0 p-2',
          !isEditing ? 'bg-muted-foreground/20 opacity-80' : 'bg-background opacity-100',
        ),
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditing);
    }
  }, [isEditing, editor]);

  return (
    <div>
      <div className="mb-4">
        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'View' : 'Edit'}
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
