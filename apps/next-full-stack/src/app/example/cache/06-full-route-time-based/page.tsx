import { type AppRoutes } from '.next/types/routes';
import { formatDate } from '@henry-hong/common-utils/date';
import { Badge } from '@monorepo-starter/ui/components/badge';
import { Button } from '@monorepo-starter/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-static';
export const revalidate = 15;

export default async function FullRouteCacheRevalidatePage() {
  const renderTime = new Date();
  const currentTime = new Date();
  const formattedRenderTime = formatDate(renderTime, 'HH:mm:ss');
  const formattedCurrentTime = formatDate(currentTime, 'HH:mm:ss');

  // 캐시 상태 확인 (15초 이내면 캐시된 데이터)
  const timeDiff = (currentTime.getTime() - renderTime.getTime()) / 1000;
  const isCached = timeDiff < 15;
  const cacheStatus = isCached ? '캐시됨' : '만료됨';
  const cacheColor = isCached ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  async function handleRevalidatePath() {
    'use server';
    revalidatePath('/example/cache/06-full-route-time-based' as AppRoutes, 'page');
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">Full Route Cache - 시간 기반 재검증</h1>
        <p className="text-gray-600">15초마다 페이지를 자동으로 재생성합니다</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            캐시 상태
            <Badge className={cacheColor}>{cacheStatus}</Badge>
          </CardTitle>
          <CardDescription>마지막 빌드로부터 15초가 지나면 새로운 페이지가 생성됩니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">현재 시간</div>
              <div className="font-mono text-lg text-gray-900">{formattedCurrentTime}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">마지막 빌드 시간</div>
              <div className="font-mono text-lg text-sky-700">{formattedRenderTime}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">경과 시간</div>
            <div className="font-mono text-lg text-orange-600">{Math.floor(timeDiff)}초</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">남은 캐시 시간</div>
            <div className="font-mono text-lg">
              {isCached ? (
                <span className="text-green-600">{Math.max(0, Math.floor(15 - timeDiff))}초</span>
              ) : (
                <span className="text-red-600">만료됨</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>수동 캐시 무효화</CardTitle>
          <CardDescription>버튼을 클릭하면 즉시 캐시를 무효화하고 새로운 페이지를 생성합니다</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleRevalidatePath}>
            <Button type="submit" variant="outline" className="w-full">
              캐시 무효화 (revalidatePath)
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>현재 페이지 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <code className="rounded bg-gray-100 px-2 py-1">export const dynamic = &apos;force-static&apos;</code>
          </div>
          <div className="flex items-center gap-2">
            <code className="rounded bg-gray-100 px-2 py-1">export const revalidate = 15</code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>시간 기반 재검증의 특징</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>빌드 타임에 페이지가 생성됨</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>설정된 시간(15초)마다 자동 재생성</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>수동으로도 언제든지 무효화 가능</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-orange-600">⚠</span>
            <span>개발 환경에서는 캐시가 비활성화됨</span>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>💡 15초 후 페이지를 새로고침하면 새로운 빌드 시간이 표시됩니다!</p>
        <p>프로덕션 빌드에서 실제 시간 기반 재검증 동작을 확인해보세요.</p>
      </div>
    </div>
  );
}
