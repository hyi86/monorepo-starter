import { Toggle } from '@monorepo-starter/ui/components/toggle';
import { type Editor } from '@tiptap/react';
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';

export function AlignBlock({ editor }: { editor: Editor }) {
  // set text align
  const handleSetTextAlign = (align: string) => () => {
    editor.chain().focus().setTextAlign(align).run();
  };

  return (
    <>
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
    </>
  );
}
