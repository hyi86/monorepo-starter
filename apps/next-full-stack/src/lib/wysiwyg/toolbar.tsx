'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { Separator } from '@monorepo-starter/ui/components/separator';
import { Toggle } from '@monorepo-starter/ui/components/toggle';
import { cn } from '@monorepo-starter/ui/lib/utils';
import CharacterCount from '@tiptap/extension-character-count';
import { Color } from '@tiptap/extension-color';
import FileHandler from '@tiptap/extension-file-handler';
import InvisibleCharacters from '@tiptap/extension-invisible-characters';
import Link from '@tiptap/extension-link';
import { getHierarchicalIndexes, TableOfContentData, TableOfContents } from '@tiptap/extension-table-of-contents';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BaselineIcon,
  BoldIcon,
  ChevronDownIcon,
  CodeIcon,
  CornerDownLeftIcon,
  EraserIcon,
  EyeIcon,
  EyeOffIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  IndentIcon,
  ItalicIcon,
  LayoutTemplateIcon,
  LinkIcon,
  ListEndIcon,
  ListIcon,
  ListOrderedIcon,
  OutdentIcon,
  PaletteIcon,
  PencilIcon,
  QuoteIcon,
  SaveIcon,
  StrikethroughIcon,
  TrashIcon,
  UnderlineIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import ImageResize from 'tiptap-extension-resize-image';
import { ToC } from './table-of-contents';

export function WysiwygToolbar({ content, setContent }: { content: string; setContent: (content: string) => void }) {
  const CHUNK_SIZE = 1024 * 1024; // 1MB
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

  const [toc, setToc] = useState<TableOfContentData>([]);
  const [isEditing, setIsEditing] = useState(true);
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit: 200,
      }),
      ImageResize.configure({
        inline: true,
      }),
      Underline,
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        // @see https://github.com/ueberdosis/tiptap/blob/main/demos/src/Extensions/FileHandler/React/index.jsx
        async onDrop(currentEditor, files, pos) {
          // const totalSize = files.reduce((sum, file) => sum + file.size, 0);
          // let uploaded = 0;
          for (const file of files) {
            const totalSizeOfFile = file.size;
            const chunkCount = Math.ceil(totalSizeOfFile / CHUNK_SIZE);
            for (let chunkIndex = 0; chunkIndex < chunkCount; chunkIndex++) {
              const start = chunkIndex * CHUNK_SIZE;
              const end = Math.min(start + CHUNK_SIZE, totalSizeOfFile);
              const chunk = file.slice(start, end);

              await fetch('/api/upload', {
                method: 'POST',
                headers: {
                  'x-file-name': encodeURIComponent(file.name),
                  'x-chunk-index': chunkIndex.toString(),
                  'x-total-size': totalSizeOfFile.toString(),
                },
                body: chunk,
              });

              // 전체 진행률
              // uploaded += chunk.size;
            }

            const fileUrl = `/upload/${encodeURIComponent(file.name)}`;
            currentEditor
              .chain()
              .insertContentAt(pos, {
                type: 'image',
                attrs: {
                  src: fileUrl,
                  alt: file.name,
                },
              })
              .focus()
              .run();
          }
        },
        async onPaste(currentEditor, files, htmlContent) {
          if (htmlContent) {
            console.log(htmlContent);
            return false;
          }

          // const totalSize = files.reduce((sum, file) => sum + file.size, 0);
          // let uploaded = 0;
          for (const file of files) {
            const totalSizeOfFile = file.size;
            const chunkCount = Math.ceil(totalSizeOfFile / CHUNK_SIZE);
            for (let chunkIndex = 0; chunkIndex < chunkCount; chunkIndex++) {
              const start = chunkIndex * CHUNK_SIZE;
              const end = Math.min(start + CHUNK_SIZE, totalSizeOfFile);
              const chunk = file.slice(start, end);

              await fetch('/api/upload', {
                method: 'POST',
                headers: {
                  'x-file-name': encodeURIComponent(file.name),
                  'x-chunk-index': chunkIndex.toString(),
                  'x-total-size': totalSizeOfFile.toString(),
                },
                body: chunk,
              });

              // 전체 진행률
              // uploaded += chunk.size;
            }

            const fileUrl = `/upload/${encodeURIComponent(file.name)}`;
            currentEditor
              .chain()
              .insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: {
                  src: fileUrl,
                  alt: file.name,
                },
              })
              .focus()
              .run();
          }
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
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
        onUpdate: (content) => {
          setToc(content);
        },
      }),
    ],
    immediatelyRender: false,
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
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

  // blockquote 토글
  const handleToggleBlockquote = () => {
    editor?.chain().focus().toggleBlockquote().run();
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
    <div className="flex flex-wrap gap-4 space-y-4">
      <div className="flex-1">
        <div className="flex h-10 flex-1 items-center justify-start space-x-2 border p-2">
          <Button size="sm" variant="outline" onClick={() => setIsEditing(!isEditing)}>
            {!isEditing ? <LayoutTemplateIcon className="size-4" /> : <PencilIcon className="size-4" />}
          </Button>
          <Button size="sm" variant="outline" onClick={handleToggleInvisibleCharacters}>
            {editor.storage.invisibleCharacters.visible ? (
              <EyeOffIcon className="size-4" />
            ) : (
              <EyeIcon className="size-4" />
            )}
          </Button>

          <Separator orientation="vertical" />

          <Toggle size="sm" pressed={editor.isActive('bold')} onClick={handleToggleBold} disabled={!isEditing}>
            <BoldIcon className="size-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive('italic')} onClick={handleToggleItalic} disabled={!isEditing}>
            <ItalicIcon className="size-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive('underline')}
            onClick={handleToggleUnderline}
            disabled={!isEditing}
          >
            <UnderlineIcon className="size-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive('strike')}
            onClick={handleToggleStrikethrough}
            disabled={!isEditing}
          >
            <StrikethroughIcon className="size-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive('code')} onClick={handleToggleCode} disabled={!isEditing}>
            <CodeIcon className="size-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive('blockquote')}
            onClick={handleToggleBlockquote}
            disabled={!isEditing}
          >
            <QuoteIcon className="size-4" />
          </Toggle>

          <Separator orientation="vertical" />

          <Toggle
            size="sm"
            pressed={editor.isActive('bulletList')}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={!isEditing}
          >
            <ListIcon className="size-4" />
          </Toggle>

          <Toggle
            size="sm"
            pressed={editor.isActive('orderedList')}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={!isEditing}
          >
            <ListOrderedIcon className="size-4" />
          </Toggle>

          <Toggle
            size="sm"
            onClick={() => editor.chain().focus().splitListItem('listItem').run()}
            disabled={!editor.can().splitListItem('listItem')}
          >
            <ListEndIcon className="size-4" />
          </Toggle>
          <Toggle
            size="sm"
            onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
            disabled={!editor.can().sinkListItem('listItem')}
          >
            <IndentIcon className="size-4" />
          </Toggle>
          <Toggle
            size="sm"
            onClick={() => editor.chain().focus().liftListItem('listItem').run()}
            disabled={!editor.can().liftListItem('listItem')}
          >
            <OutdentIcon className="size-4" />
          </Toggle>

          <Separator orientation="vertical" />

          <Toggle
            size="sm"
            pressed={editor.isActive('orderedList')}
            onClick={() => editor.chain().focus().setHardBreak().run()}
            disabled={!isEditing}
          >
            <CornerDownLeftIcon className="size-4" />
          </Toggle>

          {/* Link Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('link')}
                className={cn(editor.isActive('link') && 'bg-muted-foreground/10')}
                disabled={!isEditing}
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
                disabled={!isEditing}
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

          <Separator orientation="vertical" />

          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: 'left' })}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            disabled={!isEditing}
          >
            <AlignLeftIcon className="size-4" />
          </Toggle>

          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: 'center' })}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            disabled={!isEditing}
          >
            <AlignCenterIcon className="size-4" />
          </Toggle>

          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: 'right' })}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            disabled={!isEditing}
          >
            <AlignRightIcon className="size-4" />
          </Toggle>

          <Toggle
            size="sm"
            pressed={editor.isActive('')}
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            disabled={!isEditing}
          >
            <EraserIcon className="size-4" />
          </Toggle>

          <Separator orientation="vertical" />

          <Toggle
            size="sm"
            pressed={editor.isActive('heading', { level: 1 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            disabled={!isEditing}
          >
            <Heading1Icon className="size-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive('heading', { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            disabled={!isEditing}
          >
            <Heading2Icon className="size-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive('heading', { level: 3 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            disabled={!isEditing}
          >
            <Heading3Icon className="size-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive('heading', { level: 4 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            disabled={!isEditing}
          >
            <Heading4Icon className="size-4" />
          </Toggle>
        </div>
        <EditorContent editor={editor} className="border shadow" />
        <div>
          <span className="text-sm">
            글자수(Bytes): {editor.storage.characterCount.characters()} / 단어수(Words):{' '}
            {editor.storage.characterCount.words()}
          </span>
        </div>
      </div>
      <div className="w-1/5">
        <ToC items={toc} editor={editor} />
      </div>
    </div>
  );
}
