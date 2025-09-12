import { Badge } from '@monorepo-starter/ui/components/badge';
import { Button } from '@monorepo-starter/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import { formatDate } from '@monorepo-starter/utils/date';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({ id: (i + 1).toString() }));
}

export default async function ISRDataCacheRevalidatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { next: { revalidate: 10 } });
  const responseTime = new Date(response.headers.get('Date')!);
  const currentTime = new Date();
  const fromNow = formatDistanceToNow(responseTime, { addSuffix: true, includeSeconds: true, locale: ko });
  const formattedResponseTime = formatDate(responseTime, 'HH:mm:ss');
  const formattedRenderTime = formatDate(currentTime, 'HH:mm:ss');

  // 데이터 캐시 상태 확인 (10초 이내면 캐시된 데이터)
  const timeDiff = (currentTime.getTime() - responseTime.getTime()) / 1000;
  const isDataCached = timeDiff < 10;
  const dataCacheStatus = isDataCached ? '데이터 캐시됨' : '데이터 만료됨';
  const dataCacheColor = isDataCached ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  async function handleRevalidatePath() {
    'use server';
    revalidatePath(`/example/cache/09-isr-data-cache-revalidate/${id}`);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">ISR - 데이터 캐시 재검증</h1>
        <p className="text-gray-600">ID: {id} - ISR과 데이터 캐시 조합</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            페이지 정보
            <Badge className="bg-purple-100 text-purple-800">ID: {id}</Badge>
          </CardTitle>
          <CardDescription>빌드 타임에 생성된 페이지 구조와 10초마다 갱신되는 데이터를 조합합니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">현재 URL</div>
            <div className="rounded bg-gray-100 p-2 font-mono text-sm">
              {`/example/cache/09-isr-data-cache-revalidate/${id}`}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            캐시 상태
            <Badge className="bg-blue-100 text-blue-800">페이지 정적</Badge>
            <Badge className={dataCacheColor}>{dataCacheStatus}</Badge>
          </CardTitle>
          <CardDescription>페이지는 정적으로 생성되고, 데이터는 10초마다 자동 갱신됩니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">현재 시간</div>
              <div className="font-mono text-lg text-gray-900">{formattedRenderTime}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">마지막 데이터 응답</div>
              <div className="font-mono text-lg text-sky-700">{formattedResponseTime}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">데이터 경과 시간</div>
            <div className="font-mono text-lg text-orange-600">{fromNow}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">남은 데이터 캐시 시간</div>
            <div className="font-mono text-lg">
              {isDataCached ? (
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
          <CardDescription>버튼을 클릭하면 페이지와 데이터 캐시를 모두 무효화합니다</CardDescription>
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
            <code className="rounded bg-gray-100 px-2 py-1">next: revalidate: 10 (데이터 캐시)</code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>캐싱 레이어 구조</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-blue-300 bg-blue-50 text-blue-700">
                1
              </Badge>
              <span className="font-medium">페이지 레이어 (ISR)</span>
            </div>
            <p className="ml-8 text-gray-600">빌드 타임에 페이지 구조가 생성되어 캐시됨</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-green-300 bg-green-50 text-green-700">
                2
              </Badge>
              <span className="font-medium">데이터 레이어 (Data Cache)</span>
            </div>
            <p className="ml-8 text-gray-600">10초마다 데이터가 자동으로 갱신됨</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-purple-300 bg-purple-50 text-purple-700">
                3
              </Badge>
              <span className="font-medium">결과</span>
            </div>
            <p className="ml-8 text-gray-600">안정적인 페이지 구조 + 최신 데이터</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ISR + 데이터 캐시 조합의 장점</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>빌드 타임에 페이지 구조 생성</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>데이터는 10초마다 자동 갱신</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>페이지와 데이터의 독립적 캐싱</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>최적화된 성능과 최신 데이터</span>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>💡 이 조합은 안정적인 페이지 구조와 최신 데이터를 동시에 제공합니다!</p>
        <p>프로덕션 빌드에서 실제 동작을 확인해보세요.</p>
      </div>
    </div>
  );
}
