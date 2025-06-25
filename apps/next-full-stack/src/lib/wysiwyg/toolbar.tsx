'use client';

import { CodeEditor } from '@monorepo-starter/ui/blocks/code-editor/editor';
import { Button } from '@monorepo-starter/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@monorepo-starter/ui/components/dropdown-menu';
import { Input } from '@monorepo-starter/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { Separator } from '@monorepo-starter/ui/components/separator';
import { Toggle } from '@monorepo-starter/ui/components/toggle';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { Level } from '@tiptap/extension-heading';
import { EditorContent, useEditor } from '@tiptap/react';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BanIcon,
  BoldIcon,
  ChevronDownIcon,
  CircleIcon,
  CodeIcon,
  CodeXmlIcon,
  Columns2Icon,
  CornerDownLeftIcon,
  EraserIcon,
  EyeIcon,
  EyeOffIcon,
  HeadingIcon,
  IndentIcon,
  ItalicIcon,
  LinkIcon,
  ListEndIcon,
  ListIcon,
  ListOrderedIcon,
  OutdentIcon,
  PaletteIcon,
  PencilIcon,
  QuoteIcon,
  Redo2Icon,
  SaveIcon,
  StrikethroughIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from 'lucide-react';
import parserHtml from 'prettier/parser-html';
import { format } from 'prettier/standalone';
import { useEffect, useState } from 'react';
import { ButtonWithTooltip } from './button-with-tooltip';
import { extensions } from './extensions';

export function WysiwygToolbar({ content, setContent }: { content: string; setContent: (content: string) => void }) {
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

  const [isEditing, setIsEditing] = useState(true);
  const [isCodeView, setIsCodeView] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editable: true,
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm prose-zinc dark:prose-invert max-w-none [&_li>p]:my-0 p-4 focus-visible:outline-none',
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
    <div className="space-y-4">
      <span className="flex items-center justify-end text-sm">
        글자수(Bytes): {editor.storage.characterCount.characters()} / 단어수(Words):{' '}
        {editor.storage.characterCount.words()}
      </span>
      <div className="flex flex-wrap items-center justify-start space-x-1.5 border p-2">
        <ButtonWithTooltip tooltip={!isEditing ? 'Preview Mode' : 'Edit Mode'}>
          <Button size="sm" variant="outline" onClick={() => setIsEditing(!isEditing)}>
            {!isEditing ? <Columns2Icon className="size-4" /> : <PencilIcon className="size-4" />}
          </Button>
        </ButtonWithTooltip>

        <ButtonWithTooltip
          tooltip={
            editor.storage.invisibleCharacters.visibility() ? 'Hide Invisible Characters' : 'Show Invisible Characters'
          }
        >
          <Button size="sm" variant="outline" onClick={handleToggleInvisibleCharacters}>
            {editor.storage.invisibleCharacters.visibility() ? (
              <EyeOffIcon className="size-4" />
            ) : (
              <EyeIcon className="size-4" />
            )}
          </Button>
        </ButtonWithTooltip>

        <ButtonWithTooltip tooltip={isCodeView ? 'Preview View' : 'Code View'}>
          <Button
            size="sm"
            variant={isCodeView ? 'default' : 'outline'}
            onClick={async () => {
              const formatted = await format(editor.getHTML(), { parser: 'html', plugins: [parserHtml] });
              setContent(formatted);
              setIsCodeView(!isCodeView);
            }}
          >
            <CodeXmlIcon className="size-4" />
          </Button>
        </ButtonWithTooltip>

        <Separator className="data-[orientation=vertical]:h-6" orientation="vertical" />

        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo2Icon className="size-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo2Icon className="size-4" />
        </Button>

        <Separator className="data-[orientation=vertical]:h-6" orientation="vertical" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline" className={cn(editor.isActive('heading') && 'bg-muted-foreground/10')}>
              <HeadingIcon className="size-4" />
              <ChevronDownIcon className="size-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[1, 2, 3, 4].map((level) => (
              <DropdownMenuItem
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: level as Level })
                    .run()
                }
                disabled={!isEditing}
                className={cn(editor.isActive('heading', { level }) && 'bg-muted-foreground/10')}
                key={level}
              >
                Heading {level}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Toggle size="sm" pressed={editor.isActive('bold')} onClick={handleToggleBold} disabled={!isEditing}>
          <BoldIcon className="size-4" />
        </Toggle>
        <Toggle size="sm" pressed={editor.isActive('italic')} onClick={handleToggleItalic} disabled={!isEditing}>
          <ItalicIcon className="size-4" />
        </Toggle>
        <Toggle size="sm" pressed={editor.isActive('underline')} onClick={handleToggleUnderline} disabled={!isEditing}>
          <UnderlineIcon className="size-4" />
        </Toggle>
        <Toggle size="sm" pressed={editor.isActive('strike')} onClick={handleToggleStrikethrough} disabled={!isEditing}>
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

        <Toggle
          size="sm"
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          disabled={!isEditing}
        >
          <EraserIcon className="size-4" />
        </Toggle>

        <Separator className="data-[orientation=vertical]:h-8" orientation="vertical" />

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

        <Separator className="data-[orientation=vertical]:h-6" orientation="vertical" />

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
            <div className="flex flex-wrap items-start gap-0.5">
              {Object.entries(colors).map(([name, value]) => (
                <Toggle
                  key={name}
                  size="sm"
                  title={name}
                  pressed={editor.isActive('textStyle', { color: value })}
                  onClick={() => handleToggleColor(value)}
                >
                  <CircleIcon className="size-5" stroke={value} strokeWidth={1} fill={value} fillOpacity={0.5} />
                </Toggle>
              ))}
              <Toggle size="sm" onClick={() => editor?.chain().focus().unsetColor().run()}>
                <BanIcon className="size-5" />
              </Toggle>
            </div>
          </PopoverContent>
        </Popover>

        <Separator className="data-[orientation=vertical]:h-6" orientation="vertical" />

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
          pressed={editor.isActive({ textAlign: 'justify' })}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          disabled={!isEditing}
        >
          <AlignJustifyIcon className="size-4" />
        </Toggle>
      </div>
      {!isCodeView ? (
        <EditorContent editor={editor} />
      ) : (
        <CodeEditor language="html" onChange={(value) => editor.commands.setContent(value)}>
          {content}
        </CodeEditor>
      )}
    </div>
  );
}
