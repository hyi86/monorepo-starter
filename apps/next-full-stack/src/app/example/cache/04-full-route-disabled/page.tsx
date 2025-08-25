import { Badge } from '@monorepo-starter/ui/components/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import { cookies, headers } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = false;

export default async function FullRouteCacheDisabledPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  void (await headers());
  void (await cookies());
  void (await searchParams);

  const renderTime = new Date().toLocaleTimeString('ko-KR');

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">Full Route Cache - 비활성화</h1>
        <p className="text-gray-600">동적 API 사용으로 인한 자동 캐시 비활성화</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            캐시 상태
            <Badge className="bg-red-100 text-red-800">비활성화됨</Badge>
          </CardTitle>
          <CardDescription>매 요청마다 새로운 페이지가 생성됩니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">현재 렌더링 시간</div>
            <div className="font-mono text-lg text-red-600">{renderTime}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>캐시 비활성화 조건</CardTitle>
          <CardDescription>다음 조건 중 하나라도 충족되면 Full Route Cache가 자동으로 비활성화됩니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="border-orange-300 bg-orange-50 text-orange-700">
                1
              </Badge>
              <div>
                <h4 className="font-medium">Dynamic API 사용</h4>
                <p className="text-sm text-gray-600">
                  <code className="rounded bg-gray-100 px-1">cookies()</code>,{' '}
                  <code className="rounded bg-gray-100 px-1">headers()</code>,{' '}
                  <code className="rounded bg-gray-100 px-1">searchParams</code> 등
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Badge variant="outline" className="border-orange-300 bg-orange-50 text-orange-700">
                2
              </Badge>
              <div>
                <h4 className="font-medium">Route Segment 설정</h4>
                <p className="text-sm text-gray-600">
                  <code className="rounded bg-gray-100 px-1">dynamic = &apos;force-dynamic&apos;</code> 또는{' '}
                  <code className="rounded bg-gray-100 px-1">revalidate = 0</code>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Badge variant="outline" className="border-orange-300 bg-orange-50 text-orange-700">
                3
              </Badge>
              <div>
                <h4 className="font-medium">fetch 옵션</h4>
                <p className="text-sm text-gray-600">
                  <code className="rounded bg-gray-100 px-1">cache: &apos;no-store&apos;</code> 옵션 사용
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>현재 페이지 설정</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <code className="rounded bg-gray-100 px-2 py-1">export const dynamic = &apos;force-dynamic&apos;</code>
            </div>
            <div className="flex items-center gap-2">
              <code className="rounded bg-gray-100 px-2 py-1">export const revalidate = false</code>
            </div>
            <div className="flex items-center gap-2">
              <code className="rounded bg-gray-100 px-2 py-1">cookies(), headers(), searchParams 사용</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>💡 페이지를 새로고침하면 매번 다른 렌더링 시간이 표시됩니다!</p>
        <p>이는 캐시가 비활성화되어 매번 새로운 페이지가 생성되기 때문입니다.</p>
      </div>
    </div>
  );
}
