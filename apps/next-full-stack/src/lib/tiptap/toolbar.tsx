'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { Separator } from '@monorepo-starter/ui/components/separator';
import { Toggle } from '@monorepo-starter/ui/components/toggle';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { Level } from '@tiptap/extension-heading';
import { type Editor } from '@tiptap/react';
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
  CornerDownLeftIcon,
  CornerUpRightIcon,
  EraserIcon,
  EyeIcon,
  FileCodeIcon,
  HeadingIcon,
  ImagePlusIcon,
  IndentIcon,
  ItalicIcon,
  LinkIcon,
  ListEndIcon,
  ListIcon,
  ListOrderedIcon,
  OutdentIcon,
  PaletteIcon,
  QuoteIcon,
  Redo2Icon,
  SaveIcon,
  SeparatorHorizontalIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
  VideoIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useTables } from './hooks/use-tables';

export function WysiwygToolbar({ editor, isBubbleMenu = false }: { editor: Editor; isBubbleMenu?: boolean }) {
  const {
    renderInsertTableButton,
    renderInsertRowAfterButton,
    renderInsertRowBeforeButton,
    renderDeleteRowButton,
    renderAddColumnAfterButton,
    renderAddColumnBeforeButton,
    renderDeleteColumnButton,
    renderMergeOrSplitButton,
    renderToggleHeaderRowButton,
    renderToggleHeaderColumnButton,
  } = useTables(editor);
  const [linkUrl, setLinkUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

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

  // invisible characters(space, tab, ...) 토글
  const handleToggleInvisibleCharacters = () => {
    editor.commands.toggleInvisibleCharacters();
  };

  // Undo
  const handleUndo = () => {
    editor.chain().focus().undo().run();
  };

  // Redo
  const handleRedo = () => {
    editor.chain().focus().redo().run();
  };

  // Heading Dropdown Select
  const handleHeadingDropdownSelect = (level: Level) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  // bold 토글
  const handleToggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  // italic 토글
  const handleToggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  // underline 토글
  const handleToggleUnderline = () => {
    editor.chain().focus().toggleUnderline().run();
  };

  // strikethrough 토글
  const handleToggleStrikethrough = () => {
    editor.chain().focus().toggleStrike().run();
  };

  // code 토글
  const handleToggleCode = () => {
    editor.chain().focus().toggleCode().run();
  };

  // blockquote 토글
  const handleToggleBlockquote = () => {
    editor.chain().focus().toggleBlockquote().run();
  };

  // clear nodes
  const handleClearNodes = () => {
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  };

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

  // set hard break
  const handleSetHardBreak = () => {
    editor.chain().focus().setHardBreak().run();
  };

  // 맨 처음에 텍스트 블럭 넣기 (코드블럭이나 이미지가 맨 처음으로 오면 그 위에 뭘 쓸 수가 없음 - 그걸 방지)
  const handleAddFirstParagraph = () => {
    editor.chain().focus().insertContentAt(0, { type: 'paragraph' }).run();
    editor.commands.focus();
  };

  // link 제거
  const handleRemoveLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  // link 추가
  const handleAddLink = () => {
    if (linkUrl.trim().length < 1) return;

    let href = linkUrl;
    if (!href.startsWith('http')) {
      href = `https://${href}`;
    }

    editor.chain().focus().setLink({ href }).run();
    setLinkUrl('');
  };

  // color 토글
  const handleToggleColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  // unset color
  const handleUnsetColor = () => {
    editor.chain().focus().unsetColor().run();
  };

  // set text align
  const handleSetTextAlign = (align: string) => () => {
    editor.chain().focus().setTextAlign(align).run();
  };

  // toggle code block
  const handleToggleCodeBlock = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };

  // toggle subscript
  const handleToggleSubscript = () => {
    editor.chain().focus().toggleSubscript().run();
  };

  // toggle superscript
  const handleToggleSuperscript = () => {
    editor.chain().focus().toggleSuperscript().run();
  };

  // set horizontal rule
  const handleSetHorizontalRule = () => {
    editor.chain().focus().setHorizontalRule().run();
  };

  // add youtube
  const handleAddYoutube = () => {
    editor.commands.setYoutubeVideo({
      src: youtubeUrl,
      width: 640,
      height: 480,
    });
    setYoutubeUrl('');
  };

  if (!editor) return null;

  return (
    <div className="bg-background top-14.25 sticky z-10 flex flex-wrap items-center justify-start gap-x-0.5 gap-y-2 border p-2">
      {!isBubbleMenu && (
        <>
          <Separator className="data-[orientation=vertical]:h-6" orientation="vertical" />

          <Button size="sm" variant="outline" onClick={handleUndo} disabled={!editor.can().undo()}>
            <Undo2Icon className="size-4" />
          </Button>

          <Button size="sm" variant="outline" onClick={handleRedo} disabled={!editor.can().redo()}>
            <Redo2Icon className="size-4" />
          </Button>
        </>
      )}
      <Button
        variant={editor.storage.invisibleCharacters.visibility() ? 'default' : 'outline'}
        onClick={handleToggleInvisibleCharacters}
      >
        <EyeIcon className="size-4" />
      </Button>

      <Separator className="data-[orientation=vertical]:h-6" orientation="vertical" />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant={editor.isActive('heading') ? 'default' : 'outline'}>
            <HeadingIcon className="size-4" />
            <ChevronDownIcon className="size-3 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" side="bottom" sideOffset={1} alignOffset={1} className="z-50 w-40">
          <div className="flex flex-col items-start gap-1">
            {[1, 2, 3, 4].map((level) => (
              <Button
                variant="ghost"
                key={level}
                onClick={() => {
                  handleHeadingDropdownSelect(level as Level);
                }}
                className={cn(
                  'w-full cursor-pointer',
                  editor.isActive('heading', { level }) && 'bg-muted-foreground/10',
                )}
              >
                Heading {level}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Toggle pressed={editor.isActive('bold')} onPressedChange={handleToggleBold}>
        <BoldIcon className="size-4" />
      </Toggle>
      <Toggle pressed={editor.isActive('italic')} onPressedChange={handleToggleItalic}>
        <ItalicIcon className="size-4" />
      </Toggle>
      <Toggle pressed={editor.isActive('underline')} onPressedChange={handleToggleUnderline}>
        <UnderlineIcon className="size-4" />
      </Toggle>
      <Toggle pressed={editor.isActive('strike')} onPressedChange={handleToggleStrikethrough}>
        <StrikethroughIcon className="size-4" />
      </Toggle>
      <Toggle pressed={editor.isActive('code')} onPressedChange={handleToggleCode}>
        <CodeIcon className="size-4" />
      </Toggle>
      <Toggle pressed={editor.isActive('blockquote')} onPressedChange={handleToggleBlockquote}>
        <QuoteIcon className="size-4" />
      </Toggle>
      <Toggle onPressedChange={handleClearNodes}>
        <EraserIcon className="size-4" />
      </Toggle>

      <Separator className="data-[orientation=vertical]:h-8" orientation="vertical" />

      <Toggle pressed={editor.isActive('bulletList')} onPressedChange={handleToggleBulletList}>
        <ListIcon className="size-4" />
      </Toggle>

      <Toggle pressed={editor.isActive('orderedList')} onPressedChange={handleToggleOrderedList}>
        <ListOrderedIcon className="size-4" />
      </Toggle>

      {!isBubbleMenu && (
        <>
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
      )}

      <Separator className="data-[orientation=vertical]:h-6" orientation="vertical" />

      <Toggle pressed={editor.isActive('hardBreak')} onPressedChange={handleSetHardBreak}>
        <CornerDownLeftIcon className="size-4" />
      </Toggle>

      <Toggle pressed={false} onPressedChange={handleAddFirstParagraph}>
        <CornerUpRightIcon className="size-4" />
      </Toggle>

      {/* Link Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Toggle pressed={editor.isActive('link')}>
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

      <Popover>
        <PopoverTrigger asChild>
          <Toggle pressed={editor.isActive('youtube')}>
            <VideoIcon className="size-4" />
            <ChevronDownIcon className="size-3 opacity-50" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="bottom"
          sideOffset={1}
          alignOffset={-1}
          className="flex flex-col items-start gap-4"
        >
          <Input
            type="text"
            placeholder="영상 링크 입력"
            className="w-full"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && youtubeUrl.trim().length > 0) {
                handleAddYoutube();
                e.preventDefault();
              }
            }}
          />
          <div className="flex w-full items-center justify-end gap-2">
            <Button variant="outline" size="sm" disabled={youtubeUrl.trim().length < 1} onClick={handleAddYoutube}>
              <SaveIcon className="size-4" /> 저장
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
        <PopoverContent align="start" side="bottom" sideOffset={1} alignOffset={-1}>
          {Object.entries(colors).map(([name, value]) => (
            <Toggle
              key={name}
              title={name}
              pressed={editor.isActive('textStyle', { color: value })}
              onPressedChange={() => handleToggleColor(value)}
            >
              <CircleIcon className="size-5" stroke={value} strokeWidth={1} fill={value} fillOpacity={0.5} />
            </Toggle>
          ))}
          <Toggle onPressedChange={handleUnsetColor}>
            <BanIcon className="size-5" />
          </Toggle>
        </PopoverContent>
      </Popover>

      <Separator className="data-[orientation=vertical]:h-6" orientation="vertical" />

      <Toggle pressed={editor.isActive({ textAlign: 'left' })} onPressedChange={handleSetTextAlign('left')}>
        <AlignLeftIcon className="size-4" />
      </Toggle>

      <Toggle pressed={editor.isActive({ textAlign: 'center' })} onPressedChange={handleSetTextAlign('center')}>
        <AlignCenterIcon className="size-4" />
      </Toggle>

      <Toggle pressed={editor.isActive({ textAlign: 'right' })} onPressedChange={handleSetTextAlign('right')}>
        <AlignRightIcon className="size-4" />
      </Toggle>

      <Toggle pressed={editor.isActive({ textAlign: 'justify' })} onPressedChange={handleSetTextAlign('justify')}>
        <AlignJustifyIcon className="size-4" />
      </Toggle>

      <Separator className="data-[orientation=vertical]:h-6" orientation="vertical" />

      <Toggle pressed={editor.isActive('codeBlock')} onPressedChange={handleToggleCodeBlock}>
        <FileCodeIcon className="size-4" />
      </Toggle>

      <Toggle pressed={editor.isActive('subscript')} onPressedChange={handleToggleSubscript}>
        <SubscriptIcon className="size-4" />
      </Toggle>

      <Toggle pressed={editor.isActive('superscript')} onPressedChange={handleToggleSuperscript}>
        <SuperscriptIcon className="size-4" />
      </Toggle>

      <Toggle onPressedChange={handleSetHorizontalRule}>
        <SeparatorHorizontalIcon className="size-4" />
      </Toggle>

      <div className="w-full"></div>

      <Separator className="data-[orientation=vertical]:h-6" orientation="vertical" />

      {renderInsertTableButton()}
      {renderInsertRowAfterButton()}
      {renderInsertRowBeforeButton()}
      {renderDeleteRowButton()}
      {renderAddColumnAfterButton()}
      {renderAddColumnBeforeButton()}
      {renderDeleteColumnButton()}
      {renderMergeOrSplitButton()}
      {renderToggleHeaderRowButton()}
      {renderToggleHeaderColumnButton()}

      <Button variant="outline" onClick={() => editor.commands.insertImagePlaceholder()}>
        <ImagePlusIcon className="size-4" />
      </Button>
    </div>
  );
}
