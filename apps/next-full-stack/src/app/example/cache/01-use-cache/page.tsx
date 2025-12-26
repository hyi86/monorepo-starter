/**
 * Next.js 16의 캐싱 예제
 *
 * fetch API를 사용하여 데이터를 가져오면
 * Next.js가 자동으로 캐싱합니다.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

// fetch를 사용하면 Next.js가 자동으로 캐싱합니다
async function getCachedData() {
  // Next.js 16 Cache Components 모드에서는 new Date()를 사용하기 전에
  // 먼저 uncached data나 Request data에 접근해야 합니다.
  // cookies()를 먼저 호출하여 Request data에 접근합니다.
  await cookies();

  const res = await fetch('https://api.github.com/repos/vercel/next.js', {
    next: {
      revalidate: 60, // 60초마다 재검증
    },
  });
  const data = await res.json();

  // cookies() 호출 후에 new Date()를 사용할 수 있습니다.
  const timestamp = new Date().toISOString();

  return {
    timestamp,
    repoName: data.name,
    description: data.description,
    stars: data.stargazers_count,
  };
}

/**
 * 캐시된 데이터를 표시하는 서버 컴포넌트 (Suspense 경계 내에서 실행)
 */
async function CachedDataDisplay() {
  const result = await getCachedData();

  return (
    <div>
      <p className="mb-2 text-sm font-medium">캐시된 데이터:</p>
      <pre className="bg-muted rounded-md p-3 text-sm">{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export default async function UseCachePage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>fetch 자동 캐싱</CardTitle>
          <CardDescription>
            Next.js는 fetch를 사용한 데이터 요청을 자동으로 캐싱합니다. revalidate 옵션으로 재검증 주기를 설정할 수
            있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Suspense
            fallback={
              <div>
                <p className="mb-2 text-sm font-medium">캐시된 데이터:</p>
                <pre className="bg-muted rounded-md p-3 text-sm">로딩 중...</pre>
              </div>
            }
          >
            <CachedDataDisplay />
          </Suspense>
          <div className="text-muted-foreground text-sm">
            <p>💡 fetch는 기본적으로 캐시되며, revalidate 옵션으로 재검증 주기를 설정할 수 있습니다.</p>
            <p>💡 60초 이내에는 캐시된 데이터가 반환되며, 60초 후에는 백그라운드에서 재검증됩니다.</p>
            <p>💡 타임스탬프는 서버에서 생성되므로, 캐시된 데이터는 동일한 타임스탬프를 유지합니다.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
