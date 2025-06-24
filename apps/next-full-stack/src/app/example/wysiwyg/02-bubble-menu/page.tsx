'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Toggle } from '@monorepo-starter/ui/components/toggle';
import { cn } from '@monorepo-starter/ui/lib/utils';
import CharacterCount from '@tiptap/extension-character-count';
import Dropcursor from '@tiptap/extension-dropcursor';
import FileHandler from '@tiptap/extension-file-handler';
import Image from '@tiptap/extension-image';
import InvisibleCharacters from '@tiptap/extension-invisible-characters';
import { getHierarchicalIndexes, TableOfContents } from '@tiptap/extension-table-of-contents';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, UnderlineIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import ImageResize from 'tiptap-extension-resize-image';

export default function WysiwygBubbleMenuPage() {
  const [isEditing, setIsEditing] = useState(true);
  const [items, setItems] = useState([]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit: 200,
      }),
      Dropcursor,
      Image,
      ImageResize.configure({
        inline: true,
      }),
      Underline,
      FileHandler.configure({
        allowedMimeTypes: ['image/*'],
        onDrop(editor, files, pos) {},
        onPaste(editor, files, pasteContent) {},
      }),
      InvisibleCharacters.configure({
        visible: true,
      }),
    ],
    immediatelyRender: false,
    content: '<p>Hello World! 🌎️</p><p>Hello World2! 🌎️</p> <img src="https://placehold.co/800x400" />',
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

  if (!editor) return null;

  return (
    <div className="relative">
      <div className="mb-4 flex items-center gap-2">
        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'View' : 'Edit'}
        </Button>
        <span className="ml-auto">
          글자수(Bytes): {editor.storage.characterCount.characters()} / 단어수(Words):{' '}
          {editor.storage.characterCount.words()}
        </span>
      </div>

      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100, placement: 'auto-start' }}
          className="bg-background flex gap-1"
          // shouldShow={({ state }) => {
          //   const { selection } = state;
          //   const { $from, $to } = selection;

          //   // 이미지 노드가 선택된 경우: 해당 범위 안에 이미지 노드가 있는지 확인
          //   let isImageSelected = false;

          //   state.doc.nodesBetween($from.pos, $to.pos, (node) => {
          //     if (node.type.name === 'image') {
          //       isImageSelected = true;
          //       return false; // 더 이상 탐색할 필요 없음
          //     }
          //     return true;
          //   });

          //   // 이미지가 선택된 경우엔 숨김
          //   return !isImageSelected;
          // }}
        >
          <Toggle
            variant="outline"
            size="sm"
            pressed={editor.isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle
            variant="outline"
            size="sm"
            pressed={editor.isActive('italic')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle
            variant="outline"
            size="sm"
            pressed={editor.isActive('underline')}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Toggle>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
