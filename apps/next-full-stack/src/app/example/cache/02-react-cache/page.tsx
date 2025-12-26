/**
 * React의 cache() 함수 예제
 *
 * cache()는 React 19에서 제공하는 함수로,
 * 동일한 인자에 대해 동일한 결과를 캐싱합니다.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import { cookies } from 'next/headers';
import { cache, Suspense } from 'react';

// cache()로 감싼 함수는 동일한 인자에 대해 캐시된 결과를 반환
const getCachedUser = cache(async (id: string) => {
  // Next.js 16 Cache Components 모드에서는 new Promise()나 new Date()를 사용하기 전에
  // 먼저 uncached data나 Request data에 접근해야 합니다.
  await cookies();

  // 시뮬레이션: API 호출
  await new Promise((resolve) => setTimeout(resolve, 100));

  // cookies() 호출 후에 new Date()를 사용할 수 있습니다.
  return {
    id,
    name: `사용자 ${id}`,
    timestamp: new Date().toISOString(),
  };
});

/**
 * 캐시된 사용자 데이터를 표시하는 서버 컴포넌트 (Suspense 경계 내에서 실행)
 */
async function CachedUsersDisplay() {
  // 같은 id로 여러 번 호출해도 한 번만 실행됨
  const user1 = await getCachedUser('1');
  const user2 = await getCachedUser('1'); // 캐시에서 반환
  const user3 = await getCachedUser('2'); // 새로운 호출

  return (
    <>
      <div>
        <p className="mb-2 text-sm font-medium">사용자 1 (첫 번째 호출):</p>
        <pre className="bg-muted rounded-md p-3 text-sm">{JSON.stringify(user1, null, 2)}</pre>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">사용자 1 (두 번째 호출 - 캐시됨):</p>
        <pre className="bg-muted rounded-md p-3 text-sm">{JSON.stringify(user2, null, 2)}</pre>
        <p className="text-muted-foreground mt-1 text-xs">✅ 타임스탬프가 동일합니다 (캐시된 결과)</p>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">사용자 2 (새로운 호출):</p>
        <pre className="bg-muted rounded-md p-3 text-sm">{JSON.stringify(user3, null, 2)}</pre>
      </div>
    </>
  );
}

export default async function ReactCachePage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>React cache() 함수</CardTitle>
          <CardDescription>cache()로 감싼 함수는 동일한 인자에 대해 캐시된 결과를 반환합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Suspense
            fallback={
              <div>
                <p className="mb-2 text-sm font-medium">로딩 중...</p>
                <pre className="bg-muted rounded-md p-3 text-sm">데이터를 가져오는 중...</pre>
              </div>
            }
          >
            <CachedUsersDisplay />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
