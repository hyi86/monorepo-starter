/**
 * revalidateTag / revalidatePath 예제
 *
 * 캐시를 수동으로 무효화하는 방법을 보여줍니다.
 */

import { Button } from '@monorepo-starter/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import { revalidatePath, revalidateTag } from 'next/cache';
import { Suspense } from 'react';

async function getCachedData() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js', {
    next: {
      tags: ['github-repo'], // 태그 설정
    },
  });
  return res.json();
}

/**
 * 캐시된 데이터를 표시하는 서버 컴포넌트 (Suspense 경계 내에서 실행)
 */
async function CachedDataDisplay() {
  const data = await getCachedData();

  return (
    <div>
      <p className="mb-2 text-sm font-medium">현재 캐시된 데이터:</p>
      <pre className="bg-muted max-h-40 overflow-auto rounded-md p-3 text-sm">
        {JSON.stringify({ name: data.name, updated_at: data.updated_at }, null, 2)}
      </pre>
    </div>
  );
}

async function RevalidateActions() {
  'use server';

  async function handleRevalidateTag() {
    'use server';
    await revalidateTag('github-repo', 'max');
  }

  async function handleRevalidatePath() {
    'use server';
    await revalidatePath('/example/cache/05-revalidate', 'page');
  }

  return (
    <div className="space-y-2">
      <form action={handleRevalidateTag}>
        <Button type="submit" variant="outline">
          revalidateTag('github-repo') 실행
        </Button>
      </form>
      <form action={handleRevalidatePath}>
        <Button type="submit" variant="outline">
          revalidatePath('/example/cache/05-revalidate') 실행
        </Button>
      </form>
    </div>
  );
}

export default async function RevalidatePage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>캐시 무효화 (Revalidation)</CardTitle>
          <CardDescription>
            revalidateTag() 또는 revalidatePath()로 캐시를 수동으로 무효화할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Suspense
            fallback={
              <div>
                <p className="mb-2 text-sm font-medium">현재 캐시된 데이터:</p>
                <pre className="bg-muted max-h-40 overflow-auto rounded-md p-3 text-sm">로딩 중...</pre>
              </div>
            }
          >
            <CachedDataDisplay />
          </Suspense>

          <div>
            <p className="mb-2 text-sm font-medium">캐시 무효화:</p>
            <RevalidateActions />
            <p className="text-muted-foreground mt-2 text-xs">
              💡 버튼을 클릭한 후 페이지를 새로고침하면 새로운 데이터가 로드됩니다.
            </p>
          </div>

          <div className="text-muted-foreground space-y-1 text-sm">
            <p>
              <strong>revalidateTag('github-repo'):</strong> 해당 태그를 가진 모든 캐시 무효화
            </p>
            <p>
              <strong>revalidatePath('/example/cache/05-revalidate'):</strong> 해당 경로의 캐시 무효화
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
