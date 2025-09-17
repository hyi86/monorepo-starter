'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '~/shared/lib/query/client';

/**
 * 서버, 클라이언트 컴포넌트 모두에서 Tanstack query 를 사용하기 위한 Provider
 * @see {@link https://tanstack.com/query/latest/docs/framework/react/guides/ssr}
 */
export function TanstackQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
