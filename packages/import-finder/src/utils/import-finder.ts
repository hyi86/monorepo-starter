import path from 'node:path';
import type { Project } from 'ts-morph';

export type RecursiveImportResult = {
  filePath: string;
  imports: string[];
  depth: number;
};

/**
 * 특정 파일에서 시작해서 재귀적으로 모든 import를 찾기
 * node_modules는 제외하고, 중복 방지 및 순환 참조 방지를 포함
 */
export function findRecursiveImports(
  project: Project,
  startFilePath: string,
  pwd: string,
  maxDepth: number = 10,
): RecursiveImportResult[] {
  const visited = new Set<string>();
  const results: RecursiveImportResult[] = [];

  function traverseFile(filePath: string, depth: number = 0) {
    // 최대 깊이 체크
    if (depth > maxDepth) {
      return;
    }

    // 이미 방문한 파일 체크 (순환 참조 방지)
    if (visited.has(filePath)) {
      return;
    }

    visited.add(filePath);

    try {
      const sourceFile = project.getSourceFile(filePath);
      if (!sourceFile) {
        return;
      }

      const imports: string[] = [];
      const importDeclarations = sourceFile.getImportDeclarations();

      importDeclarations.forEach((importDeclaration) => {
        const importFullPath = importDeclaration.getModuleSpecifierSourceFile()?.getFilePath();
        if (!importFullPath) {
          return;
        }

        // pwd 기준으로 상대 경로 변환
        const relativeImportPath = path.relative(pwd, importFullPath);

        // node_modules 제외
        if (relativeImportPath.includes('node_modules')) {
          return;
        }

        // 로컬 파일만 추가 (워크스페이스 패키지 포함)
        imports.push(relativeImportPath);

        // 재귀적으로 다음 파일 탐색
        traverseFile(importFullPath, depth + 1);
      });

      results.push({
        filePath: path.relative(pwd, filePath),
        imports,
        depth,
      });
    } catch (error) {
      console.warn(`파일 분석 중 오류 발생: ${filePath}`, error);
    }
  }

  traverseFile(startFilePath);
  return results;
}
