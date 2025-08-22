import { Toggle } from '@monorepo-starter/ui/components/toggle';
import { type Editor } from '@tiptap/react';
import { TableIcon } from 'lucide-react';

export function TablesBlock({ editor, isBubbleMenu = false }: { editor: Editor; isBubbleMenu?: boolean }) {
  const handleInsertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const handleInsertRowAfter = () => {
    editor.chain().focus().addRowAfter().run();
  };

  const handleInsertRowBefore = () => {
    editor.chain().focus().addRowBefore().run();
  };

  const handleDeleteRow = () => {
    editor.chain().focus().deleteRow().run();
  };

  const handleAddColumnAfter = () => {
    editor.chain().focus().addColumnAfter().run();
  };

  const handleAddColumnBefore = () => {
    editor.chain().focus().addColumnBefore().run();
  };

  const handleDeleteColumn = () => {
    editor.chain().focus().deleteColumn().run();
  };

  const handleMergeOrSplit = () => {
    editor.chain().focus().mergeOrSplit().run();
  };

  const handleToggleHeaderRow = () => {
    editor.chain().focus().toggleHeaderRow().run();
  };

  const handleToggleHeaderColumn = () => {
    editor.chain().focus().toggleHeaderColumn().run();
  };

  return (
    <>
      {!isBubbleMenu && (
        <Toggle onPressedChange={handleInsertTable} pressed={false}>
          <TableIcon className="size-4" />
        </Toggle>
      )}

      <Toggle disabled={!editor.can().addColumnAfter()} onPressedChange={handleInsertRowAfter} pressed={false}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22 10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3h2v2h4V3h2v2h4V3h2v2h4V3h2zM4 10h4V7H4zm6 0h4V7h-4zm10 0V7h-4v3zm-9 4h2v3h3v2h-3v3h-2v-3H8v-2h3z"
          />
        </svg>
      </Toggle>
      <Toggle disabled={!editor.can().addColumnBefore()} onPressedChange={handleInsertRowBefore} pressed={false}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22 14a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7h2v-2h4v2h2v-2h4v2h2v-2h4v2h2zM4 14h4v3H4zm6 0h4v3h-4zm10 0v3h-4v-3zm-9-4h2V7h3V5h-3V2h-2v3H8v2h3z"
          />
        </svg>
      </Toggle>
      <Toggle disabled={!editor.can().deleteRow()} onPressedChange={handleDeleteRow} pressed={false}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M9.41 13L12 15.59L14.59 13L16 14.41L13.41 17L16 19.59L14.59 21L12 18.41L9.41 21L8 19.59L10.59 17L8 14.41zM22 9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2zM4 9h4V6H4zm6 0h4V6h-4zm6 0h4V6h-4z"
          />
        </svg>
      </Toggle>
      <Toggle disabled={!editor.can().addColumnAfter()} onPressedChange={handleAddColumnAfter} pressed={false}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M11 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H2V2zm-7 8v4h7v-4zm0 6v4h7v-4zM4 4v4h7V4zm11 7h3V8h2v3h3v2h-3v3h-2v-3h-3z"
          />
        </svg>
      </Toggle>
      <Toggle disabled={!editor.can().addColumnBefore()} onPressedChange={handleAddColumnBefore} pressed={false}>
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M13 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h9V2zm7 8v4h-7v-4zm0 6v4h-7v-4zm0-12v4h-7V4zM9 11H6V8H4v3H1v2h3v3h2v-3h3z"
          />
        </svg>
      </Toggle>
      <Toggle disabled={!editor.can().deleteColumn()} onPressedChange={handleDeleteColumn} pressed={false}>
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M4 2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m0 8v4h7v-4zm0 6v4h7v-4zM4 4v4h7V4zm13.59 8L15 9.41L16.41 8L19 10.59L21.59 8L23 9.41L20.41 12L23 14.59L21.59 16L19 13.41L16.41 16L15 14.59z"
          />
        </svg>
      </Toggle>
      <Toggle disabled={!editor.can().mergeOrSplit()} onPressedChange={handleMergeOrSplit} pressed={false}>
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M5 10H3V4h8v2H5zm14 8h-6v2h8v-6h-2zM5 18v-4H3v6h8v-2zM21 4h-8v2h6v4h2zM8 13v2l3-3l-3-3v2H3v2zm8-2V9l-3 3l3 3v-2h5v-2z"
          />
        </svg>
      </Toggle>
      <Toggle disabled={!editor.can().toggleHeaderRow()} onPressedChange={handleToggleHeaderRow} pressed={false}>
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2zM4 14h4v-4H4zm6 0h4v-4h-4zm6 0h4v-4h-4z"
          />
        </svg>
      </Toggle>
      <Toggle disabled={!editor.can().toggleHeaderColumn()} onPressedChange={handleToggleHeaderColumn} pressed={false}>
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m0 8v4h8v-4zm0 6v4h8v-4zM8 4v4h8V4z"
          />
        </svg>
      </Toggle>
    </>
  );
}
