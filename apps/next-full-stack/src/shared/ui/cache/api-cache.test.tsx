import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ExampleCacheData } from './api-cache';

// Mock dependencies
vi.mock('@henry-hong/common-utils/console', () => ({
  devLog: vi.fn(),
}));

vi.mock('@henry-hong/common-utils/number', () => ({
  format: vi.fn((bytes: number) => `${bytes}`),
}));

vi.mock('parse-duration', () => ({
  default: vi.fn(() => 20000), // 20s in ms
}));

vi.mock('~/shared/lib/api-cache', () => ({
  apiHybridCache: vi.fn(),
}));

// Mock fetch
global.fetch = vi.fn();

describe('ExampleCacheData 컴포넌트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('캐시 정보가 올바르게 렌더링되어야 함', async () => {
    const mockData = {
      data: [
        { id: 1, name: 'Mickey Mouse' },
        { id: 2, name: 'Donald Duck' },
      ],
    };

    const mockCacheResult = {
      data: mockData,
      traceId: 'test-trace-id-123',
      cacheStatus: 'MISS' as const,
      compressedSize: 1024,
    };

    const { apiHybridCache } = await import('~/shared/lib/api-cache');
    vi.mocked(apiHybridCache).mockResolvedValue(mockCacheResult);

    (global.fetch as any).mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    render(await ExampleCacheData());

    await waitFor(() => {
      expect(screen.getByText('TTL')).toBeDefined();
      expect(screen.getByText('20s')).toBeDefined();
      expect(screen.getByText('MISS')).toBeDefined();
      expect(screen.getByText('test-trace-id-123')).toBeDefined();
      expect(screen.getByText('2')).toBeDefined(); // data count
      expect(screen.getByText('1024 Bytes')).toBeDefined();
    });
  });

  it('apiHybridCache가 올바른 파라미터로 호출되어야 함', async () => {
    const mockData = { data: [] };
    const mockCacheResult = {
      data: mockData,
      traceId: 'test-trace-id',
      cacheStatus: 'HIT:SQLite' as const,
      compressedSize: 512,
    };

    const { apiHybridCache } = await import('~/shared/lib/api-cache');
    vi.mocked(apiHybridCache).mockResolvedValue(mockCacheResult);

    (global.fetch as any).mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    render(await ExampleCacheData());

    await waitFor(() => {
      expect(apiHybridCache).toHaveBeenCalledWith({
        key: 'users:all:10:20',
        ttl: 20000,
        fetcher: expect.any(Function),
      });
    });
  });
});
