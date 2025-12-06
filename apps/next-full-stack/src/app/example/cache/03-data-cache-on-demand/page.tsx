import { type AppRoutes } from '.next/types/routes';
import { Badge } from '@monorepo-starter/ui/components/badge';
import { Button } from '@monorepo-starter/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import { formatDate } from '@monorepo-starter/utils/date';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function DataCacheOnDemandPage() {
  const id = 19;
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    next: { tags: [`todos/${id}`] },
    cache: 'force-cache',
  });

  const responseTime = new Date(response.headers.get('Date')!);
  const currentTime = new Date();
  const fromNow = formatDistanceToNow(responseTime, { addSuffix: true, includeSeconds: true, locale: ko });
  const formattedResponseTime = formatDate(responseTime, 'HH:mm:ss');
  const formattedCurrentTime = formatDate(currentTime, 'HH:mm:ss');

  // 태그 기반 캐시는 수동으로 무효화할 때까지 계속 유지됨
  const cacheStatus = '캐시됨 (태그 기반)';
  const cacheColor = 'bg-purple-100 text-purple-800';

  async function handleRevalidateTag() {
    'use server';
    revalidateTag(`todos/${id}`, 'max');
  }

  async function handleRevalidatePath() {
    'use server';
    revalidatePath('/example/cache/03-data-cache-on-demand' as AppRoutes, 'page');
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">Data Cache - 태그 기반 재검증</h1>
        <p className="text-gray-600">fetch 요청에 next: tags 설정으로 태그 기반 캐시 무효화</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            캐시 상태
            <Badge className={cacheColor}>{cacheStatus}</Badge>
          </CardTitle>
          <CardDescription>태그 기반 캐시는 수동으로 무효화할 때까지 계속 유지됩니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">현재 시간</div>
              <div className="font-mono text-lg text-gray-900">{formattedCurrentTime}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">마지막 응답 시간</div>
              <div className="font-mono text-lg text-sky-700">{formattedResponseTime}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">마지막 응답으로부터</div>
            <div className="font-mono text-lg text-orange-600">{fromNow}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">사용된 태그</div>
            <div className="font-mono text-lg">
              <Badge variant="outline" className="border-purple-300 text-purple-600">
                todos/{id}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>수동 캐시 무효화</CardTitle>
          <CardDescription>태그 기반 캐시는 수동으로 무효화해야 새로운 데이터를 요청합니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">revalidateTag (권장)</h4>
            <p className="text-sm text-gray-600">
              특정 태그와 관련된 모든 캐시를 무효화합니다. 더 정확하고 효율적입니다.
            </p>
            <form action={handleRevalidateTag}>
              <Button type="submit" variant="outline" className="w-full">
                revalidateTag(`todos/{id}`)
              </Button>
            </form>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">revalidatePath</h4>
            <p className="text-sm text-gray-600">현재 페이지의 모든 캐시를 무효화합니다.</p>
            <form action={handleRevalidatePath}>
              <Button type="submit" variant="outline" className="w-full">
                revalidatePath (현재 페이지)
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>태그 기반 캐시의 장점</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>시간 제한 없이 캐시 유지</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>관련된 여러 데이터를 한 번에 무효화 가능</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>데이터 업데이트 시에만 캐시 무효화</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>더 정확한 캐시 제어</span>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>💡 revalidateTag 버튼을 클릭하면 해당 태그의 캐시가 무효화됩니다!</p>
        <p>태그 기반 캐시는 시간이 지나도 자동으로 만료되지 않습니다.</p>
      </div>
    </div>
  );
}
