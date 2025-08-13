import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Home from './page';

// next/navigation의 redirect 함수를 모킹
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('Home', () => {
  beforeEach(() => {
    // 각 테스트 전에 모킹된 함수들을 초기화
    vi.clearAllMocks();
  });

  it('함수 컴포넌트이면서 기본 내보내기, 리턴타입이 void여야 함', () => {
    // Home이 함수 컴포넌트인지 확인
    expect(typeof Home).toBe('function');
    // Home이 default export인지 확인
    expect(Home).toBeDefined();
    // Home 함수가 void를 반환하는지 확인
    const result = Home();
    expect(result).toBeUndefined();
  });

  it('호출 시 /example로 리다이렉트해야 함', () => {
    // Home 컴포넌트를 호출
    Home();

    // redirect 함수가 호출되었는지 확인
    expect(redirect).toHaveBeenCalledWith('/example');

    // redirect 함수가 정확히 한 번 호출되었는지 확인
    expect(redirect).toHaveBeenCalledTimes(1);
  });

  it('여러 번 호출해도 올바르게 처리해야 함', () => {
    // 여러 번 호출해도 redirect가 올바르게 호출되는지 확인
    Home();
    Home();
    Home();

    // redirect 함수가 3번 호출되었는지 확인
    expect(redirect).toHaveBeenCalledTimes(3);

    // 모든 호출이 올바른 경로로 되었는지 확인
    expect(redirect).toHaveBeenNthCalledWith(1, '/example');
    expect(redirect).toHaveBeenNthCalledWith(2, '/example');
    expect(redirect).toHaveBeenNthCalledWith(3, '/example');
  });
});
