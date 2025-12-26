/**
 * fetch 캐싱 옵션 예제
 *
 * Next.js의 fetch는 기본적으로 캐싱되며,
 * next 옵션으로 캐시 동작을 제어할 수 있습니다.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';

async function getDataWithCache() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js', {
    next: {
      revalidate: 30, // 30초마다 재검증
      tags: ['github'], // 태그 설정
    },
  });
  return res.json();
}

async function getDataWithoutCache() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js', {
    cache: 'no-store', // 캐시 비활성화
  });
  return res.json();
}

async function getDataWithForceCache() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js', {
    cache: 'force-cache', // 강제 캐시
  });
  return res.json();
}

export default async function FetchCachePage() {
  const [cached, noCache, forceCache] = await Promise.all([
    getDataWithCache(),
    getDataWithoutCache(),
    getDataWithForceCache(),
  ]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>fetch 캐싱 옵션</CardTitle>
          <CardDescription>fetch의 next 옵션으로 캐시 동작을 제어할 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-medium">1. revalidate 옵션 (30초):</p>
            <pre className="bg-muted max-h-40 overflow-auto rounded-md p-3 text-sm">
              {JSON.stringify({ name: cached.name, description: cached.description }, null, 2)}
            </pre>
            <p className="text-muted-foreground mt-1 text-xs">✅ 30초마다 자동 재검증, tags: ['github']로 그룹화</p>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">2. cache: 'no-store':</p>
            <pre className="bg-muted max-h-40 overflow-auto rounded-md p-3 text-sm">
              {JSON.stringify({ name: noCache.name, description: noCache.description }, null, 2)}
            </pre>
            <p className="text-muted-foreground mt-1 text-xs">⚠️ 매번 새로운 요청, 캐시 사용 안 함</p>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">3. cache: 'force-cache':</p>
            <pre className="bg-muted max-h-40 overflow-auto rounded-md p-3 text-sm">
              {JSON.stringify({ name: forceCache.name, description: forceCache.description }, null, 2)}
            </pre>
            <p className="text-muted-foreground mt-1 text-xs">💾 강제 캐시, 만료되지 않음</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
