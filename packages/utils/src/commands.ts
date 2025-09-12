export type EditorType =
  | 'cursor'
  | 'vscode'
  | 'windsurf'
  | 'webstorm'
  | 'intellij'
  | 'neovim'
  | 'sublimetext'
  | 'emacs';

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
