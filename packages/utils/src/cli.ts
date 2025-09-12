import { intro, isCancel, outro, select } from '@clack/prompts';
import FastGlob from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';

export async function findWorkspaceAndTsConfigPath() {
  let workspace = '';
  if (process.argv.length === 3) {
    workspace = process.argv[2] as string;
  } else {
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
    workspace = selectedWorkspace.toString();
  }

  try {
    fs.accessSync(path.join(workspace), fs.constants.F_OK); // 존재만 확인
  } catch {
    throw new Error(`Workspace ${workspace} not found`);
  }

  let tsConfigPath = '';
  try {
    fs.accessSync(path.join(workspace, 'tsconfig.app.json'), fs.constants.F_OK); // 존재만 확인
    tsConfigPath = 'tsconfig.app.json';
  } catch {
    tsConfigPath = 'tsconfig.json';
  }

  return { workspace, tsConfigPath };
}
