export type EditorType =
  | 'cursor'
  | 'vscode'
  | 'windsurf'
  | 'webstorm'
  | 'intellij'
  | 'neovim'
  | 'sublimetext'
  | 'emacs';

/**
 * IDE에서 파일을 여는 명령어 (개발 전용)
 * 각 IDE에 맞는 `에디터로 열기` 명령어를 반환
 */
export function openInEditorCommand(editor: EditorType, fileName: string, lineNumber?: number) {
  switch (editor) {
    case 'cursor':
      return `cursor --goto ${fileName}:${lineNumber}`;

    case 'windsurf':
      return `windsurf ${fileName}:${lineNumber}`;

    case 'vscode':
      return `code -g ${fileName}:${lineNumber}`;

    case 'webstorm':
      return `webstorm --line ${lineNumber} ${fileName}`;

    case 'intellij':
      return `idea --line ${lineNumber} ${fileName}`;

    case 'neovim':
      return `nvim +${lineNumber} ${fileName}`;

    case 'sublimetext':
      return `subl ${fileName}:${lineNumber}`;

    case 'emacs':
      return `emacs +${lineNumber} ${fileName}`;

    default:
      throw new Error(`Unsupported editor: ${editor}`);
  }
}
