import { findWorkspaceAndTsConfigPath } from '@henry-hong/common-utils/cli';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@henry-hong/common-utils/cli', () => ({
  findWorkspaceAndTsConfigPath: vi.fn(),
}));

describe('findWorkspaceAndTsConfigPath', () => {
  it('workspace와 tsConfigPath를 올바르게 반환해야 함', async () => {
    vi.mocked(findWorkspaceAndTsConfigPath).mockResolvedValue({
      workspace: 'apps/next-full-stack',
      tsConfigPath: 'tsconfig.json',
    });

    const result = await findWorkspaceAndTsConfigPath();

    expect(result).toEqual({
      workspace: 'apps/next-full-stack',
      tsConfigPath: 'tsconfig.json',
    });
  });
});
