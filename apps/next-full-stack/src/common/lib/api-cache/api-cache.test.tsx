import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ExampleCacheData } from '~/app/example/experimental/api-cache/client';

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

// Mock the apiHybridCache function
vi.mock('~/common/lib/api-cache/instance', () => ({
  apiHybridCache: vi.fn(),
}));

describe('ExampleCacheData 컴포넌트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('기본 캐시 정보가 렌더링되어야 함', async () => {
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

    const { apiHybridCache } = await import('~/common/lib/api-cache/instance');
    vi.mocked(apiHybridCache).mockResolvedValue(mockCacheResult);

    const component = await ExampleCacheData();
    render(component);

    // 기본 텍스트들이 렌더링되는지 확인
    expect(screen.getByText('TTL')).toBeDefined();
    expect(screen.getByText('cacheStatus')).toBeDefined();
    expect(screen.getByText('traceId')).toBeDefined();
    expect(screen.getByText('data Count')).toBeDefined();
    expect(screen.getByText('compressedSize')).toBeDefined();
  });

  it('apiHybridCache가 올바른 파라미터로 호출되어야 함', async () => {
    const mockData = { data: [] };
    const mockCacheResult = {
      data: mockData,
      traceId: 'test-trace-id',
      cacheStatus: 'HIT:SQLite' as const,
      compressedSize: 512,
    };

    const { apiHybridCache } = await import('~/common/lib/api-cache/instance');
    vi.mocked(apiHybridCache).mockResolvedValue(mockCacheResult);

    await ExampleCacheData();

    expect(apiHybridCache).toHaveBeenCalledWith({
      key: 'users:all:10:20',
      ttl: 20000,
      fetcher: expect.any(Function),
    });
  });

  it('캐시 상태 값이 올바르게 표시되어야 함', async () => {
    const mockData = { data: [{ id: 1, name: 'Test' }] };
    const mockCacheResult = {
      data: mockData,
      traceId: 'unique-test-trace-id',
      cacheStatus: 'MISS' as const,
      compressedSize: 256,
    };

    const { apiHybridCache } = await import('~/common/lib/api-cache/instance');
    vi.mocked(apiHybridCache).mockResolvedValue(mockCacheResult);

    const component = await ExampleCacheData();
    render(component);

    // 실제 값들이 렌더링되는지 확인
    expect(screen.getByText('unique-test-trace-id')).toBeDefined();
    expect(screen.getByText('1')).toBeDefined(); // data.data.length
    expect(screen.getByText('256 Bytes')).toBeDefined();
  });

  it('컴포넌트가 ul 리스트를 렌더링해야 함', async () => {
    const mockData = { data: [] };
    const mockCacheResult = {
      data: mockData,
      traceId: 'list-test-trace-id',
      cacheStatus: 'MISS' as const,
      compressedSize: 0,
    };

    const { apiHybridCache } = await import('~/common/lib/api-cache/instance');
    vi.mocked(apiHybridCache).mockResolvedValue(mockCacheResult);

    const component = await ExampleCacheData();
    render(component);

    // ul 태그가 존재하는지 확인
    const lists = screen.getAllByRole('list');
    expect(lists.length).toBe(1);

    // li 항목들이 존재하는지 확인
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBeGreaterThan(0);
  });
});
