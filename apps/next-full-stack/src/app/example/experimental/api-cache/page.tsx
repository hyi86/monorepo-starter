import { Skeleton } from '@monorepo-starter/ui/components/skeleton';
import { Suspense } from 'react';
import { ExampleCacheData } from '~/shared/ui/cache/api-cache';

export const dynamic = 'force-dynamic';

export default async function ExampleCachePage() {
  return (
    <div>
      <h1>캐싱: `SQLite + File` 기반의 `Hybrid API Cache` 예제</h1>

      <Suspense
        fallback={
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        }
      >
        <ExampleCacheData />
      </Suspense>
    </div>
  );
}
