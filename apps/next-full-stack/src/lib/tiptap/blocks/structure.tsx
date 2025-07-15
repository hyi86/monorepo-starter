import { Toggle } from '@monorepo-starter/ui/components/toggle';
import { type Editor } from '@tiptap/react';
import { CornerDownLeftIcon, CornerUpRightIcon, SeparatorHorizontalIcon } from 'lucide-react';

export function StructureBlock({ editor }: { editor: Editor }) {
  // set hard break
  const handleSetHardBreak = () => {
    editor.chain().focus().setHardBreak().run();
  };

  // 맨 처음에 텍스트 블럭 넣기 (코드블럭이나 이미지가 맨 처음으로 오면 그 위에 뭘 쓸 수가 없음 - 그걸 방지)
  const handleAddFirstParagraph = () => {
    editor.chain().focus().insertContentAt(0, { type: 'paragraph' }).run();
    editor.commands.focus();
  };

  // set horizontal rule
  const handleSetHorizontalRule = () => {
    editor.chain().focus().setHorizontalRule().run();
  };

  return (
    <>
      <Toggle pressed={editor.isActive('hardBreak')} onPressedChange={handleSetHardBreak}>
        <CornerDownLeftIcon className="size-4" />
      </Toggle>

      <Toggle pressed={false} onPressedChange={handleAddFirstParagraph}>
        <CornerUpRightIcon className="size-4" />
      </Toggle>
      <Toggle onPressedChange={handleSetHorizontalRule}>
        <SeparatorHorizontalIcon className="size-4" />
      </Toggle>
    </>
  );
}
