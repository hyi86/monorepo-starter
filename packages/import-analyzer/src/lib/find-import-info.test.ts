import { ImportDeclaration } from 'ts-morph';
import { describe, expect, it, vi } from 'vitest';
import { findImportInfo } from './find-import-info';

// 모킹
vi.mock('./package-name-from-pnpm', () => ({
  getPackageNameFromPnpmPath: vi.fn((path) => path.split('/').pop()),
}));

describe('findImportInfo', () => {
  it('로컬 파일 import를 올바르게 처리해야 함', () => {
    const mockImport = {
      getModuleSpecifierSourceFile: () => ({
        getFilePath: () => '/workspace/src/components/Button.tsx',
      }),
    } as ImportDeclaration;

    const result = findImportInfo('/workspace', 'src/pages/index.tsx', [mockImport]);

    expect(result.filePath).toBe('src/pages/index.tsx');
    expect(result.imports).toContain('local:src/components/Button.tsx');
  });

  it('외부 라이브러리 import를 올바르게 처리해야 함', () => {
    const mockImport = {
      getModuleSpecifierSourceFile: () => ({
        getFilePath: () => '/workspace/../../node_modules/react/index.d.ts',
      }),
    } as ImportDeclaration;

    const result = findImportInfo('/workspace', 'src/App.tsx', [mockImport]);

    expect(result.imports).toContain('local:../node_modules/react/index.d.ts');
  });
});
