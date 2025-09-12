import { type AppRoutes } from '.next/types/routes';
import { Badge } from '@monorepo-starter/ui/components/badge';
import { Button } from '@monorepo-starter/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import { formatDate } from '@monorepo-starter/utils/date';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-static';

export default async function FullRouteCacheForceStaticPage() {
  const renderTime = new Date();
  const formattedRenderTime = formatDate(renderTime, 'HH:mm:ss');

  async function handleRevalidatePath() {
    'use server';
    revalidatePath('/example/cache/05-full-route-force-static' as AppRoutes, 'page');
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">Full Route Cache - 강제 정적 생성</h1>
        <p className="text-gray-600">빌드 타임에 생성되어 항상 캐시됩니다</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            캐시 상태
            <Badge className="bg-green-100 text-green-800">정적 생성됨</Badge>
          </CardTitle>
          <CardDescription>빌드 타임에 생성되어 수동으로 무효화할 때까지 캐시됩니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">빌드 타임</div>
            <div className="font-mono text-lg text-green-600">{formattedRenderTime}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">현재 페이지 설정</div>
            <div className="font-mono text-sm">
              <code className="rounded bg-gray-100 px-2 py-1">export const dynamic = &apos;force-static&apos;</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>수동 캐시 무효화</CardTitle>
          <CardDescription>버튼을 클릭하면 캐시를 무효화하고 새로운 빌드 타임으로 업데이트됩니다</CardDescription>
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
          <CardTitle>강제 정적 생성의 특징</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>빌드 타임에 페이지가 생성됨</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>시간 제한 없이 캐시 유지</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>최고의 성능과 빠른 로딩</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-orange-600">⚠</span>
            <span>개발 환경에서는 캐시가 비활성화됨</span>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>💡 프로덕션 빌드에서 실제 캐시 동작을 확인해보세요!</p>
        <p>개발 환경에서는 캐시가 비활성화되어 매번 새로운 페이지가 생성됩니다.</p>
      </div>
    </div>
  );
}
