import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { main } from './index';

describe('CLI', () => {
  let consoleSpy: any;
  let originalCwd: string;

  beforeEach(() => {
    // console.log를 모킹하여 출력을 캡처
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    // 현재 작업 디렉토리 저장
    originalCwd = process.cwd();
  });

  afterEach(() => {
    // 테스트 후 모킹 복원 및 작업 디렉토리 복원
    consoleSpy.mockRestore();
    process.chdir(originalCwd);
  });

  it('main 함수가 "Hello, World!"를 출력해야 함', async () => {
    await main();

    expect(consoleSpy).toHaveBeenCalledWith('Hello, World!');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it('main 함수가 정상적으로 실행되어야 함', async () => {
    // main 함수가 에러 없이 실행되는지 확인
    await expect(main()).resolves.not.toThrow();
  });

  it('실행 경로가 프로젝트 루트로 변경되어야 함', async () => {
    // 테스트를 다른 디렉토리에서 시작
    const tempDir = path.join(process.cwd(), 'apps');
    process.chdir(tempDir);

    const beforeCwd = process.cwd();

    await main();

    // main 함수 실행 후 작업 디렉토리가 변경되었는지 확인
    const afterCwd = process.cwd();
    expect(afterCwd).not.toBe(beforeCwd);

    // 프로젝트 루트 디렉토리인지 확인 (monorepo-starter 폴더)
    expect(afterCwd).toContain('monorepo-starter');
  });

  it('정확한 프로젝트 루트 경로로 이동해야 함', async () => {
    await main();

    const currentCwd = process.cwd();
    const expectedRoot = path.resolve(import.meta.dirname, '../../..');

    // 정규화된 경로로 비교
    expect(path.resolve(currentCwd)).toBe(path.resolve(expectedRoot));
  });
});
