import { intro, isCancel, outro, select, text } from '@clack/prompts';
import FastGlob from 'fast-glob';

/**
 * 모노레포에서 워크스페이스와 tsconfig.json 경로를 찾는 기능
 */
export async function findWorkspaceAndTsConfigPath() {
  intro('Workspace Selectbox');
  const workspaceList = await FastGlob('apps/*', { onlyDirectories: true });
  const selectedWorkspace = await select({
    message: 'Pick a workspace',
    options: workspaceList.map((pathName) => ({ value: pathName })),
  });

  if (isCancel(selectedWorkspace)) {
    outro('Canceled');
    process.exit(0);
  }

  outro(`Workspace: ${selectedWorkspace.toString()}`);

  return selectedWorkspace.toString();
}

/**
 * 파일 경로 입력 인풋
 */
export async function findFilePathInput() {
  intro('File Path Input');
  const filePath = await text({ message: 'Enter the file path?', placeholder: 'ex) src/app/page.tsx' });
  outro(`File Path: ${filePath.toString()}`);
  return filePath as string;
}
