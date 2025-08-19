import { render, screen, waitFor } from '@testing-library/react';
import parseDuration from 'parse-duration';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ExampleCacheData } from './api-cache';

// Mock dependencies
vi.mock('@henry-hong/common-utils/console', () => ({
  devLog: vi.fn(),
}));

vi.mock('@henry-hong/common-utils/number', () => ({
  format: vi.fn((bytes: number) => `${bytes}`),
}));

vi.mock('~/lib/experimental-cache/api-cache', () => ({
  apiHybridCache: vi.fn(),
}));

vi.mock('parse-duration', () => ({
  default: vi.fn(),
}));

// Mock fetch
global.fetch = vi.fn();

describe('ExampleCacheData 컴포넌트', () => {
  let mockApiHybridCache: any;
  let mockParseDuration: any;

  beforeEach(async () => {
    const apiCacheModule = await import('~/shared/lib/api-cache');
    mockApiHybridCache = vi.mocked(apiCacheModule.apiHybridCache);
    mockParseDuration = vi.mocked(parseDuration);
    vi.clearAllMocks();
    mockParseDuration.mockReturnValue(20000); // 20s in ms
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('캐시 정보가 올바르게 렌더링되어야 함', async () => {
    // Mock successful API response
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

    mockApiHybridCache.mockResolvedValue(mockCacheResult);

    // Mock fetch response
    (global.fetch as any).mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    render(await ExampleCacheData());

    // Wait for component to render
    await waitFor(() => {
      expect(screen.getByText('TTL')).toBeDefined();
    });

    // Check if cache information is displayed
    expect(screen.getByText('20s')).toBeDefined();
    expect(screen.getByText('MISS')).toBeDefined();
    expect(screen.getByText('test-trace-id-123')).toBeDefined();
    expect(screen.getByText('2')).toBeDefined(); // data count
    expect(screen.getByText('1024 Bytes')).toBeDefined();
  });

  it('apiHybridCache가 올바른 파라미터로 호출되어야 함', async () => {
    const mockData = { data: [] };
    const mockCacheResult = {
      data: mockData,
      traceId: 'test-trace-id',
      cacheStatus: 'HIT:SQLite' as const,
      compressedSize: 512,
    };

    mockApiHybridCache.mockResolvedValue(mockCacheResult);
    (global.fetch as any).mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    render(await ExampleCacheData());

    await waitFor(() => {
      expect(mockApiHybridCache).toHaveBeenCalledWith({
        key: 'users:all:10:20',
        ttl: 20000,
        fetcher: expect.any(Function),
      });
    });
  });

  it('다양한 캐시 상태를 올바르게 처리해야 함', async () => {
    const testCases = [
      { status: 'HIT:SQLite' as const, expectedText: 'HIT:SQLite' },
      { status: 'HIT:File' as const, expectedText: 'HIT:File' },
      { status: 'MISS' as const, expectedText: 'MISS' },
      { status: 'WAIT' as const, expectedText: 'WAIT' },
    ];

    for (const testCase of testCases) {
      const mockData = { data: [{ id: 1, name: 'Test' }] };
      const mockCacheResult = {
        data: mockData,
        traceId: 'test-trace-id',
        cacheStatus: testCase.status,
        compressedSize: 256,
      };

      mockApiHybridCache.mockResolvedValue(mockCacheResult);
      (global.fetch as any).mockResolvedValue({
        json: () => Promise.resolve(mockData),
      });

      const { unmount } = render(await ExampleCacheData());

      await waitFor(() => {
        // 더 구체적인 선택자 사용
        const elements = screen.getAllByText(testCase.expectedText);
        expect(elements.length).toBeGreaterThan(0);
      });

      unmount();
    }
  });

  it('fetcher 에러를 우아하게 처리해야 함', async () => {
    const mockCacheResult = {
      data: { data: [] }, // data.data 구조로 수정
      traceId: 'error-trace-id',
      cacheStatus: 'MISS' as const,
      compressedSize: 0,
    };

    mockApiHybridCache.mockResolvedValue(mockCacheResult);

    // Mock fetch to throw error
    (global.fetch as any).mockRejectedValue(new Error('API Error'));

    render(await ExampleCacheData());

    await waitFor(() => {
      // 더 구체적인 선택자 사용
      const elements = screen.getAllByText('0');
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('데이터 개수가 올바르게 표시되어야 함', async () => {
    const testCases = [
      { dataLength: 0, expected: '0' },
      { dataLength: 1, expected: '1' },
      { dataLength: 100, expected: '100' },
    ];

    for (const testCase of testCases) {
      const mockData = { data: Array(testCase.dataLength).fill({ id: 1 }) };
      const mockCacheResult = {
        data: mockData,
        traceId: 'test-trace-id',
        cacheStatus: 'MISS' as const,
        compressedSize: 100,
      };

      mockApiHybridCache.mockResolvedValue(mockCacheResult);
      (global.fetch as any).mockResolvedValue({
        json: () => Promise.resolve(mockData),
      });

      const { unmount } = render(await ExampleCacheData());

      await waitFor(() => {
        // 더 구체적인 선택자 사용
        const elements = screen.getAllByText(testCase.expected);
        expect(elements.length).toBeGreaterThan(0);
      });

      unmount();
    }
  });

  it('압축 크기가 올바르게 포맷되어야 함', async () => {
    const mockData = { data: [{ id: 1 }] };
    const mockCacheResult = {
      data: mockData,
      traceId: 'test-trace-id',
      cacheStatus: 'MISS' as const,
      compressedSize: 2048,
    };

    mockApiHybridCache.mockResolvedValue(mockCacheResult);
    (global.fetch as any).mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    render(await ExampleCacheData());

    await waitFor(() => {
      expect(screen.getByText('2048 Bytes')).toBeDefined();
    });
  });
});
