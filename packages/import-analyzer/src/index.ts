/**
 * Import Analyzer CLI
 * @example
 * -- Root
 * pnpm --filter @monorepo-starter/import-analyzer run start
 * pnpm --filter @monorepo-starter/import-analyzer run start apps/vanilla-ts
 * -- in Workspace
 * pnpm start
 */
import { findWorkspaceAndTsConfigPath } from '@henry-hong/common-utils/cli';
import { devLog, green } from '@henry-hong/common-utils/console';
import fs from 'node:fs';
import path from 'node:path';
import { Project } from 'ts-morph';
import { parse } from 'yaml';
import { analyzeImportMap } from './lib/analyze-import-map';
import { findImportInfo } from './lib/find-import-info';
import { reportResult } from './lib/report-result';

export type ImportMap = {
  filePath: string;
  imports: string[];
};

// 현재 파일의 실행 경로를 프로젝트 루트로 변경
process.chdir(path.join(import.meta.dirname, '../../..'));

// Run
await main();

export async function main() {
  const lockFile = parse(fs.readFileSync('pnpm-lock.yaml', 'utf8'));
  const { workspace, tsConfigPath } = await findWorkspaceAndTsConfigPath();

  devLog('info', `Workspace: ${workspace}`);
  devLog('info', `process.cwd(): ${process.cwd()}`);
  devLog('process', 'Start analyzing...');

  if (!lockFile.importers[workspace]) {
    devLog('error', `Workspace ${workspace} not found in pnpm-lock.yaml`);
    return;
  }

  const dependencyList = Object.keys(lockFile.importers[workspace].dependencies || {});
  const devDependencyList = Object.keys(lockFile.importers[workspace].devDependencies || {});

  const project = new Project({
    tsConfigFilePath: path.join(workspace, tsConfigPath),
    skipAddingFilesFromTsConfig: true,
  });

  let findPathGlob: string[] = [];
  try {
    fs.accessSync(path.join(workspace, 'src'), fs.constants.F_OK); // 존재만 확인
    findPathGlob = [`${workspace}/src/**/*.{ts,tsx}`];
  } catch {
    findPathGlob = [`${workspace}/**/*.{ts,tsx}`, `!${workspace}/{node_modules,public,dist,build}/**`];
  }

  project.addSourceFilesAtPaths(findPathGlob);
  const allFiles = project.getSourceFiles();

  devLog('process', `find ${green(allFiles.length.toString())} files to ${workspace}...`);

  const importMap: ImportMap[] = [];
  allFiles.forEach((sourceFile) => {
    const filePath = sourceFile.getFilePath();
    const relativePath = path.relative(workspace, filePath);
    const importDeclarations = sourceFile.getImportDeclarations();
    const importInfo = findImportInfo(workspace, relativePath, importDeclarations);
    importMap.push(importInfo);
  });

  const result = analyzeImportMap(importMap, [...dependencyList, ...devDependencyList]);
  reportResult(workspace, result);
}
