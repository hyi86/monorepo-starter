import { Badge } from '@monorepo-starter/ui/components/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import { format } from '@monorepo-starter/utils/number';
import parseDuration from 'parse-duration';
import { apiHybridCache } from '~/shared/lib/api-cache/instance';

export default async function ExampleCacheDataPage() {
  const offset = 10;
  const limit = 20;
  const ttl = '20s';

  const { data, traceId, cacheStatus, compressedSize } = await apiHybridCache({
    key: `users:all:${offset}:${limit}`,
    ttl: parseDuration(ttl, 'ms') ?? undefined,
    fetcher: async () => {
      try {
        const res = await fetch(`https://api.disneyapi.dev/character`, {
          cache: 'no-store',
        });
        return res.json();
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });

  // 캐시 상태에 따른 색상 결정
  const getCacheStatusColor = (status: string) => {
    if (status.includes('HIT')) {
      return 'bg-green-100 text-green-800 border-green-300';
    } else if (status === 'MISS') {
      return 'bg-red-100 text-red-800 border-red-300';
    } else if (status === 'WAIT') {
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    } else {
      return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API 캐시 정보</CardTitle>
          <CardDescription>Disney API 캐싱 시스템의 현재 상태와 성능 지표</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">캐시 상태</span>
                <Badge variant="outline" className={getCacheStatusColor(cacheStatus)}>
                  {cacheStatus}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">TTL (Time To Live)</span>
                <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">{ttl}</code>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">데이터 개수</span>
                <Badge variant="secondary">{data.data?.length || 0}개</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">압축 크기</span>
                <code className="rounded bg-blue-100 px-2 py-1 font-mono text-sm text-blue-800">
                  {format(compressedSize)} Bytes
                </code>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Trace ID</span>
                <code className="max-w-32 truncate rounded bg-gray-100 px-2 py-1 font-mono text-sm text-gray-600">
                  {traceId}
                </code>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">API 엔드포인트</span>
                <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm text-gray-600">disneyapi.dev</code>
              </div>
            </div>
          </div>

          <div className="mt-2 rounded-lg bg-gray-50 p-4">
            <h4 className="mb-2 font-medium text-gray-900">성능 지표</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">캐시 효율성:</span>
                <span className="ml-2 font-medium">
                  {cacheStatus.includes('HIT') ? '높음' : cacheStatus === 'MISS' ? '낮음' : '보통'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">데이터 압축률:</span>
                <span className="ml-2 font-medium">{compressedSize > 0 ? '적용됨' : '적용 안됨'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
