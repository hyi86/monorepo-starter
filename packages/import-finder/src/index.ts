import { devLog, red } from '@henry-hong/common-utils/console';
import fs from 'node:fs';
import path from 'node:path';
import { Project } from 'ts-morph';
import { parse } from 'yaml';
import { findFilePathInput, findWorkspaceAndTsConfigPath } from './utils/cli';
import { findRecursiveImports } from './utils/import-finder';
import { buildTree, renderTreeInTerminal } from './utils/tree-renderer';

export type ImportMap = {
  filePath: string;
  imports: string[];
};

// 현재 파일의 실행 경로를 프로젝트 루트로 변경
process.chdir(path.join(import.meta.dirname, '../../..'));

// Run
await main();

/**
 * Import Finder CLI
 * @example
 * // 루트에서 실행 (Terminal UI 모드)
 * pnpm -F \@monorepo-starter/import-finder run start
 *
 * // 루트에서 CLI 모드로 실행 (workspace 경로 입력)
 * pnpm -F \@monorepo-starter/import-finder run start apps/next-full-stack
 *
 * // 루트에서 CLI 모드로 실행 (workspace 경로 입력 및 시작 파일 경로 입력)
 * pnpm -F \@monorepo-starter/import-finder run start apps/next-full-stack src/app/page.tsx
 *
 * // 워크스페이스에서 실행 (Terminal UI 모드)
 * pnpm start
 *
 * // 워크스페이스에서 CLI 모드로 실행 (workspace 경로 입력)
 * pnpm start apps/next-full-stack
 *
 * // 워크스페이스에서 CLI 모드로 실행 (workspace 경로 입력 및 시작 파일 경로 입력)
 * pnpm start apps/next-full-stack src/app/page.tsx
 */
export async function main() {
  const lockFile = parse(fs.readFileSync('pnpm-lock.yaml', 'utf8'));
  const args = process.argv;

  /**
   * --------------------------------
   * Workspace
   * --------------------------------
   */

  let workspace = '';

  // CLI mode - workspace path 체크
  if (args[2]) {
    workspace = args[2] as string;
    try {
      fs.accessSync(workspace, fs.constants.F_OK);
    } catch {
      devLog('error', `Workspace ${red(workspace)} not found`);
      return;
    }
  } else {
    // TUI mode - workspace path 가져오기
    workspace = await findWorkspaceAndTsConfigPath();
  }

  // pnpm-lock.yaml 에서 workspace 체크
  if (!lockFile.importers[workspace]) {
    devLog('error', `Workspace ${red(workspace)} not found in pnpm-lock.yaml`);
    return;
  }

  /**
   * --------------------------------
   * Start File Path
   * --------------------------------
   */

  let startFilePath = '';

  if (args[3]) {
    startFilePath = args[3] as string;
  } else {
    startFilePath = await findFilePathInput();
  }

  startFilePath = path.resolve(workspace, startFilePath);

  try {
    fs.accessSync(startFilePath, fs.constants.F_OK);
  } catch {
    devLog('error', `Start file path ${red(startFilePath)} not found`);
    return;
  }

  /**
   * --------------------------------
   * Search import files
   * --------------------------------
   */

  devLog('info', `Workspace: ${workspace}`);
  devLog('process', 'Start finding...');

  // ts-morph 프로젝트 생성
  const project = new Project({
    tsConfigFilePath: path.join(workspace, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
  });

  // 재귀적으로 모든 import 찾기
  const recursiveResults = findRecursiveImports(project, startFilePath, process.cwd());

  // 트리구조 생성
  const tree = buildTree(recursiveResults);

  // 트리구조 출력
  devLog('info', '.');
  renderTreeInTerminal(tree);
}
