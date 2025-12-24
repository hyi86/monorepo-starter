import { Badge } from '@monorepo-starter/ui/components/badge';
import { Button } from '@monorepo-starter/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import { formatDate } from '@monorepo-starter/utils/date';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { revalidatePath } from 'next/cache';

export default async function DataCacheTimeBasedPage() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/11`, { next: { revalidate: 10 } });
  const responseTime = new Date(response.headers.get('Date')!);
  const currentTime = new Date();
  const fromNow = formatDistanceToNow(responseTime, { addSuffix: true, includeSeconds: true, locale: ko });
  const formattedResponseTime = formatDate(responseTime, 'HH:mm:ss');
  const formattedCurrentTime = formatDate(currentTime, 'HH:mm:ss');

  // 캐시 상태 확인 (10초 이내면 캐시된 데이터)
  const timeDiff = (currentTime.getTime() - responseTime.getTime()) / 1000;
  const isCached = timeDiff < 10;
  const cacheStatus = isCached ? '캐시됨' : '새로 요청됨';
  const cacheColor = isCached ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';

  async function handleRevalidatePath() {
    revalidatePath('/example/cache/02-data-cache-time-based', 'page');
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">Data Cache - 시간 기반 재검증 (10초)</h1>
        <p className="text-gray-600">fetch 요청에 next: revalidate: 10 설정</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            캐시 상태
            <Badge className={cacheColor}>{cacheStatus}</Badge>
          </CardTitle>
          <CardDescription>마지막 API 응답으로부터 10초가 지나면 새로운 데이터를 요청합니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">현재 시간</div>
              <div className="font-mono text-lg text-gray-900">{formattedCurrentTime}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">응답 시간</div>
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
                <span className="text-green-600">{Math.max(0, Math.floor(10 - timeDiff))}초</span>
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
          <CardDescription>버튼을 클릭하면 즉시 캐시를 무효화하고 새로운 데이터를 요청합니다</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleRevalidatePath}>
            <Button type="submit" variant="outline" className="w-full">
              캐시 무효화 (revalidatePath)
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>💡 페이지를 새로고침하거나 10초 후 다시 방문해보세요!</p>
        <p>캐시가 만료되면 새로운 API 요청이 발생합니다.</p>
      </div>
    </div>
  );
}
