export type EditorType = 'cursor' | 'vscode' | 'webstorm' | 'intellij' | 'neovim' | 'sublimetext';

/**
 * IDE에서 파일을 여는 명령어 (개발 전용)
 * 각 IDE에 맞는 `에디터로 열기` 명령어를 반환
 *
 * 각 에디터별 명령어 설치 방법
 * - cursor: Ctrl+Shift+P -> Shell Command: Install 'cursor' command in PATH
 * - vscode: Ctrl+Shift+P -> Shell Command: Install 'code' command in PATH
 * - webstorm: echo 'export PATH="/Applications/WebStorm.app/Contents/MacOS:$PATH"' >> ~/.zshrc
 * - intellij: echo 'export PATH="/Applications/IntelliJ IDEA.app/Contents/MacOS:$PATH"' >> ~/.zshrc
 * - neovim: 설정 없음(자동 실행)
 * - sublimetext: 설정 없음(자동 실행)
 * - windsurf: (공식 지원 안함)
 */
export function openInEditorCommand(editor: EditorType, fileName: string, lineNumber?: number) {
  switch (editor) {
    case 'cursor':
      if (lineNumber) {
        return `cursor --goto ${fileName}:${lineNumber}`;
      } else {
        return `cursor ${fileName}`;
      }

    case 'vscode':
      if (lineNumber) {
        return `code -g ${fileName}:${lineNumber}`;
      } else {
        return `code ${fileName}`;
      }

    case 'webstorm':
      if (lineNumber) {
        return `webstorm --line ${lineNumber} ${fileName}`;
      } else {
        return `webstorm ${fileName}`;
      }

    case 'intellij':
      if (lineNumber) {
        return `idea --line ${lineNumber} ${fileName}`;
      } else {
        return `idea ${fileName}`;
      }

    case 'neovim':
      if (lineNumber) {
        return `nvim +${lineNumber} ${fileName}`;
      } else {
        return `nvim ${fileName}`;
      }

    case 'sublimetext':
      if (lineNumber) {
        return `subl ${fileName}:${lineNumber}`;
      } else {
        return `subl ${fileName}`;
      }

    default:
      throw new Error(`Unsupported editor: ${editor}`);
  }
}
