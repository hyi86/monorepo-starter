'use client';

import { Toggle } from '@monorepo-starter/ui/components/toggle';
import { type Editor } from '@tiptap/react';
import {
  BoldIcon,
  CodeIcon,
  EraserIcon,
  ItalicIcon,
  QuoteIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
} from 'lucide-react';

export function TextBasicBlock({ editor }: { editor: Editor }) {
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

  // toggle subscript
  const handleToggleSubscript = () => {
    editor.chain().focus().toggleSubscript().run();
  };

  // toggle superscript
  const handleToggleSuperscript = () => {
    editor.chain().focus().toggleSuperscript().run();
  };

  // clear nodes
  const handleClearNodes = () => {
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  };

  return (
    <>
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
      <Toggle pressed={editor.isActive('subscript')} onPressedChange={handleToggleSubscript}>
        <SubscriptIcon className="size-4" />
      </Toggle>
      <Toggle pressed={editor.isActive('superscript')} onPressedChange={handleToggleSuperscript}>
        <SuperscriptIcon className="size-4" />
      </Toggle>
      <Toggle onPressedChange={handleClearNodes}>
        <EraserIcon className="size-4" />
      </Toggle>
    </>
  );
}
