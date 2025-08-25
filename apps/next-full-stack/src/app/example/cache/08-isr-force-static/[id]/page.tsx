import { formatDate } from '@henry-hong/common-utils/date';
import { Badge } from '@monorepo-starter/ui/components/badge';
import { Button } from '@monorepo-starter/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({ id: (i + 1).toString() }));
}

export default async function ISRForceStaticPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { cache: 'force-cache' });
  const responseTime = new Date(response.headers.get('Date')!);
  const currentTime = new Date();
  const fromNow = formatDistanceToNow(responseTime, { addSuffix: true, includeSeconds: true, locale: ko });
  const formattedResponseTime = formatDate(responseTime, 'HH:mm:ss');
  const formattedRenderTime = formatDate(currentTime, 'HH:mm:ss');

  // 강제 정적 ISR은 수동으로 무효화할 때까지 계속 유지됨
  const cacheStatus = '정적 생성됨';
  const cacheColor = 'bg-green-100 text-green-800';

  async function handleRevalidatePath() {
    'use server';
    revalidatePath(`/example/cache/08-isr-force-static/${id}`);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">ISR - 강제 정적 페이지</h1>
        <p className="text-gray-600">ID: {id} - 빌드 타임에 생성되어 무제한 캐시</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            페이지 정보
            <Badge className="bg-green-100 text-green-800">ID: {id}</Badge>
          </CardTitle>
          <CardDescription>빌드 타임에 생성된 페이지로 수동으로 무효화할 때까지 캐시됩니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">현재 URL</div>
            <div className="rounded bg-gray-100 p-2 font-mono text-sm">
              {`/example/cache/08-isr-force-static/${id}`}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            캐시 상태
            <Badge className={cacheColor}>{cacheStatus}</Badge>
          </CardTitle>
          <CardDescription>빌드 타임에 생성되어 수동으로 무효화할 때까지 캐시됩니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">현재 시간</div>
              <div className="font-mono text-lg text-gray-900">{formattedRenderTime}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">빌드 타임</div>
              <div className="font-mono text-lg text-green-600">{formattedResponseTime}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">빌드로부터 경과</div>
            <div className="font-mono text-lg text-orange-600">{fromNow}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">캐시 정책</div>
            <div className="font-mono text-lg text-green-600">무제한 캐시</div>
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
          <CardTitle>현재 페이지 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <code className="rounded bg-gray-100 px-2 py-1">export const dynamic = &apos;force-static&apos;</code>
          </div>
          <div className="flex items-center gap-2">
            <code className="rounded bg-gray-100 px-2 py-1">cache: &apos;force-cache&apos; (데이터 캐시)</code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>강제 정적 ISR의 특징</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>빌드 타임에 모든 페이지가 생성됨</span>
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
            <span className="text-green-600">✓</span>
            <span>수동으로만 캐시 무효화 가능</span>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>💡 강제 정적 ISR은 빌드 타임에 모든 페이지가 생성됩니다!</p>
        <p>프로덕션 빌드에서 실제 동작을 확인해보세요.</p>
      </div>
    </div>
  );
}
