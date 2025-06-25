'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { Toggle } from '@monorepo-starter/ui/components/toggle';
import { cn } from '@monorepo-starter/ui/lib/utils';
import CharacterCount from '@tiptap/extension-character-count';
import { Color } from '@tiptap/extension-color';
import Dropcursor from '@tiptap/extension-dropcursor';
import FileHandler from '@tiptap/extension-file-handler';
import Image from '@tiptap/extension-image';
import InvisibleCharacters from '@tiptap/extension-invisible-characters';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  BaselineIcon,
  Bold,
  ChevronDownIcon,
  CodeIcon,
  EraserIcon,
  Italic,
  LinkIcon,
  PaletteIcon,
  SaveIcon,
  StrikethroughIcon,
  TrashIcon,
  UnderlineIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import ImageResize from 'tiptap-extension-resize-image';

const colors = {
  red: '#f94d4d',
  orange: '#e86d00',
  amber: '#e1a200',
  yellow: '#e1c200',
  lime: '#6fd100',
  green: '#00d100',
  emerald: '#00d15e',
  teal: '#00d1a3',
  cyan: '#009fe1',
  sky: '#006fd1',
  blue: '#0000d1',
  indigo: '#2e00d1',
  violet: '#4d00d1',
  purple: '#6d00e8',
  fuchsia: '#a300d1',
  pink: '#d1004d',
  rose: '#f94d9e',
  slate: '#475569',
  gray: '#4b5563',
  zinc: '#52525b',
  neutral: '#525252',
  stone: '#57534e',
};

export default function WysiwygBubbleMenuPage() {
  const [isEditing, setIsEditing] = useState(true);
  const [linkUrl, setLinkUrl] = useState('');

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
        onDrop(editor, files, pos) {
          console.log(editor, files, pos);
        },
        onPaste(editor, files, pasteContent) {
          console.log(editor, files, pasteContent);
        },
      }),
      InvisibleCharacters.configure({
        visible: false,
      }),
      Link.configure({
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com'];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
      TextStyle,
      Color,
    ],
    immediatelyRender: false,
    content: '<p>Hello World! 🌎️</p><p>Hello World2! 🌎️</p> <img src="https://placehold.co/800x400" />',
    editable: true,
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm prose-zinc dark:prose-invert max-w-none [&_li>p]:my-0 p-6',
          `prose-code:before:content-none
            prose-code:after:content-none
            prose-code:border
            prose-code:font-normal
            prose-code:text-xs
            prose-code:rounded
            prose-code:px-1.5
            prose-code:py-0.5
            prose-code:border-zinc-200
            prose-code:bg-zinc-100
            prose-code:text-zinc-500
            dark:prose-code:border-zinc-700
            dark:prose-code:bg-zinc-800
            dark:prose-code:text-zinc-400`,
          !isEditing ? 'bg-muted-foreground/20 opacity-80' : 'bg-background opacity-100',
        ),
      },
    },
  });

  // invisible characters(space, tab, ...) 토글
  const handleToggleInvisibleCharacters = () => {
    editor?.commands.toggleInvisibleCharacters();
  };

  // bold 토글
  const handleToggleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  // italic 토글
  const handleToggleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  // underline 토글
  const handleToggleUnderline = () => {
    editor?.chain().focus().toggleUnderline().run();
  };

  // strikethrough 토글
  const handleToggleStrikethrough = () => {
    editor?.chain().focus().toggleStrike().run();
  };

  // code 토글
  const handleToggleCode = () => {
    editor?.chain().focus().toggleCode().run();
  };

  // link 제거
  const handleRemoveLink = () => {
    editor?.chain().focus().unsetLink().run();
  };

  // link 추가
  const handleAddLink = () => {
    if (linkUrl.trim().length < 1) return;

    let href = linkUrl;
    if (!href.startsWith('http')) {
      href = `https://${href}`;
    }

    editor?.chain().focus().setLink({ href }).run();
    setLinkUrl('');
  };

  // color 토글
  const handleToggleColor = (color: string) => {
    editor?.chain().focus().setColor(color).run();
  };

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
        <Button variant="outline" onClick={handleToggleInvisibleCharacters}>
          {editor.storage.invisibleCharacters.visible ? 'Hide Invisible Characters' : 'Show Invisible Characters'}
        </Button>
        <span className="ml-auto">
          글자수(Bytes): {editor.storage.characterCount.characters()} / 단어수(Words):{' '}
          {editor.storage.characterCount.words()}
        </span>
      </div>

      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100, placement: 'bottom-start' }}
          className="bg-background flex gap-0.5 rounded-md border shadow-md"
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
          <Toggle size="sm" pressed={editor.isActive('bold')} onClick={handleToggleBold}>
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive('italic')} onClick={handleToggleItalic}>
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive('underline')} onClick={handleToggleUnderline}>
            <UnderlineIcon className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive('strike')} onClick={handleToggleStrikethrough}>
            <StrikethroughIcon className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive('code')} onClick={handleToggleCode}>
            <CodeIcon className="h-4 w-4" />
          </Toggle>

          {/* Link Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('link')}
                className={cn(editor.isActive('link') && 'bg-muted-foreground/10')}
              >
                <LinkIcon className="size-4" />
                <ChevronDownIcon className="size-3 opacity-50" />
              </Toggle>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              side="bottom"
              sideOffset={3}
              alignOffset={-172}
              className="flex flex-col items-start gap-4"
            >
              <Input
                type="text"
                placeholder="링크 입력"
                className="w-full"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && linkUrl.trim().length > 0) {
                    handleAddLink();
                    e.preventDefault();
                  }
                }}
              />
              <div className="flex w-full items-center justify-end gap-2">
                <Button variant="outline" size="sm" disabled={linkUrl.trim().length < 1} onClick={handleAddLink}>
                  <SaveIcon className="size-4" /> 저장
                </Button>
                <Button variant="ghost" size="sm" onClick={handleRemoveLink} disabled={!editor.isActive('link')}>
                  <TrashIcon className="size-4" /> 링크 제거
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Color Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('textStyle')}
                className={cn(editor.isActive('textStyle') && 'bg-muted-foreground/10')}
              >
                <PaletteIcon className="size-4" />
                <ChevronDownIcon className="size-3 opacity-50" />
              </Toggle>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              side="bottom"
              sideOffset={3}
              alignOffset={-220}
              className="flex flex-col items-start gap-4"
            >
              <div className="flex flex-wrap items-start gap-1">
                {Object.entries(colors).map(([name, value]) => (
                  <Toggle
                    key={name}
                    size="sm"
                    title={name}
                    pressed={editor.isActive('textStyle', { color: value })}
                    onClick={() => handleToggleColor(value)}
                  >
                    <BaselineIcon className="size-5" color={value} />
                  </Toggle>
                ))}
                <Toggle size="sm" onClick={() => editor?.chain().focus().unsetColor().run()}>
                  <EraserIcon className="size-5" />
                </Toggle>
              </div>
            </PopoverContent>
          </Popover>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
