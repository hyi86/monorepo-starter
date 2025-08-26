import { type ImportMap } from '..';

const regExpList = [
  /(src\/)?((manifest|mdx-components|middleware|instrumentation|instrumentation-client)\.(ts|tsx))$/, // next.js
  /(src\/)?app\/.*((layout|page|loading|not-found|error|global-error|default|route|template|default)\.(ts|tsx))$/, // next.js
  /(test|spec)\.(ts|tsx)$/, // test files
  /src\/vite-env\.d\.ts$/, // vite vanilla
  /src\/main\.(ts|tsx)$/, // vite vanilla
];

export function analyzeImportMap(importMap: ImportMap[], dependencyList: string[]) {
  const localFilePathList = importMap
    .filter((item) => !regExpList.some((regExp) => item.filePath.match(regExp)))
    .reduce(
      (acc, item) => {
        acc[item.filePath] = 0;
        return acc;
      },
      {} as Record<string, number>,
    );

  const externalFilePathList = dependencyList.reduce(
    (acc, item) => {
      acc[item] = 0;
      return acc;
    },
    {} as Record<string, number>,
  );

  importMap.forEach((importInfo) => {
    importInfo.imports.forEach((importPath) => {
      if (importPath.startsWith('local:')) {
        const normalizedImportPath = importPath.replace('local:', '');
        if (normalizedImportPath in localFilePathList) {
          localFilePathList[normalizedImportPath]! += 1;
        }
        return;
      }

      if (importPath.startsWith('external:')) {
        const normalizedImportPath = importPath.replace('external:', '');
        if (normalizedImportPath in externalFilePathList) {
          externalFilePathList[normalizedImportPath]! += 1;
        }
      }
    });
  });

  return {
    local: localFilePathList,
    external: externalFilePathList,
  };
}
