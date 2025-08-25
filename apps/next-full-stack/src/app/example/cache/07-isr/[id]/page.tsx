import { formatDate } from '@henry-hong/common-utils/date';
import { Badge } from '@monorepo-starter/ui/components/badge';
import { Button } from '@monorepo-starter/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { revalidatePath } from 'next/cache';

// Next.js는 요청이 들어올 때 캐시를 무효화
// 최대 20초에 한 번씩만 실행
export const revalidate = 20;

// 빌드 시점에 `generateStaticParams`의 파라미터만 미리 렌더링
// 생성되지 않은 경로에 대한 요청이 들어오면,
// Next.js는 해당 페이지를 요청 시점에 서버에서 렌더링
export const dynamicParams = false; // false 로 설정하면 generateStaticParams()에서 제외된 경로에서 404를 반환

export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({ id: (i + 1).toString() }));
}

export default async function ISRPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const currentPath = `/example/cache/07-isr`;

  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { next: { revalidate: 10 } });
  const responseTime = new Date(response.headers.get('Date')!);
  const currentTime = new Date();
  const fromNow = formatDistanceToNow(responseTime, { addSuffix: true, includeSeconds: true, locale: ko });
  const formattedResponseTime = formatDate(responseTime, 'HH:mm:ss');
  const formattedRenderTime = formatDate(currentTime, 'HH:mm:ss');

  // 캐시 상태 확인 (20초 이내면 캐시된 페이지)
  const timeDiff = (currentTime.getTime() - responseTime.getTime()) / 1000;
  const isCached = timeDiff < 20;
  const cacheStatus = isCached ? '캐시됨' : '만료됨';
  const cacheColor = isCached ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  async function handleRevalidatePath() {
    'use server';
    revalidatePath(`${currentPath}/${id}`);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">ISR - 동적 페이지</h1>
        <p className="text-gray-600">ID: {id} - 20초마다 자동 재생성</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            페이지 정보
            <Badge className="bg-blue-100 text-blue-800">ID: {id}</Badge>
          </CardTitle>
          <CardDescription>현재 페이지의 캐시 상태와 시간 정보를 확인할 수 있습니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">현재 URL</div>
            <div className="rounded bg-gray-100 p-2 font-mono text-sm">{`${currentPath}/${id}`}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            캐시 상태
            <Badge className={cacheColor}>{cacheStatus}</Badge>
          </CardTitle>
          <CardDescription>마지막 응답으로부터 20초가 지나면 새로운 페이지가 생성됩니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">현재 시간</div>
              <div className="font-mono text-lg text-gray-900">{formattedRenderTime}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">마지막 응답 시간</div>
              <div className="font-mono text-lg text-sky-700">{formattedResponseTime}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">경과 시간</div>
            <div className="font-mono text-lg text-orange-600">{fromNow}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">남은 캐시 시간</div>
            <div className="font-mono text-lg">
              {isCached ? (
                <span className="text-green-600">{Math.max(0, Math.floor(20 - timeDiff))}초</span>
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
            <code className="rounded bg-gray-100 px-2 py-1">export const revalidate = 20</code>
          </div>
          <div className="flex items-center gap-2">
            <code className="rounded bg-gray-100 px-2 py-1">export const dynamicParams = false</code>
          </div>
          <div className="flex items-center gap-2">
            <code className="rounded bg-gray-100 px-2 py-1">next: revalidate: 10 (데이터 캐시)</code>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>💡 20초 후 페이지를 새로고침하면 새로운 렌더링 시간이 표시됩니다!</p>
        <p>프로덕션 빌드에서 실제 ISR 동작을 확인해보세요.</p>
      </div>
    </div>
  );
}
