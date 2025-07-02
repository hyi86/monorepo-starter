import { Editor } from '@tiptap/react';

export function WysiwygFooter({ editor }: { editor: Editor }) {
  return (
    <div>
      <span className="text-sm">
        글자수(Bytes): {editor.storage.characterCount.characters()} / 단어수(Words):{' '}
        {editor.storage.characterCount.words()}
      </span>
    </div>
  );
}
