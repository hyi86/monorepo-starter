import path from 'node:path';
import { ImportDeclaration } from 'ts-morph';
import { getPackageNameFromPnpmPath } from './package-name-from-pnpm';

export function findImportInfo(workspacePath: string, relativePath: string, importDeclarations: ImportDeclaration[]) {
  const result: { filePath: string; imports: string[] } = { filePath: relativePath, imports: [] };
  importDeclarations.forEach((importDeclaration) => {
    const importFullPath = importDeclaration.getModuleSpecifierSourceFile()?.getFilePath();
    if (!importFullPath) {
      return;
    }

    const relativeImportFullPath = path.relative(workspacePath, importFullPath);

    // 외부 라이브러리 사용
    if (relativeImportFullPath.startsWith('../../node_modules')) {
      result.imports.push(`external:${getPackageNameFromPnpmPath(relativeImportFullPath)}`);
      return;
    }

    // 워크스페이스 패키지 사용 Skip
    if (relativeImportFullPath.startsWith('../../packages/')) {
      // result.imports.push(`workspace:${relativeImportFullPath.replace('../../packages/', '')}`);
      return;
    }

    // 로컬 파일 추가
    result.imports.push(`local:${relativeImportFullPath}`);
  });
  return result;
}
