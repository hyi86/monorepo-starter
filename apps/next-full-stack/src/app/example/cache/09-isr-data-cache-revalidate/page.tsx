import { Badge } from '@monorepo-starter/ui/components/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import Link from 'next/link';

export default function ISRDataCacheRevalidatePage() {
  const currentPath = `/example/cache/09-isr-data-cache-revalidate`;

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">ISR - 데이터 캐시 재검증</h1>
        <p className="text-gray-600">ISR과 데이터 캐시를 조합한 고급 캐싱 전략</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            캐싱 전략
            <Badge className="bg-purple-100 text-purple-800">ISR + Data Cache</Badge>
          </CardTitle>
          <CardDescription>빌드 타임에 생성된 페이지를 데이터 갱신 주기에 따라 캐시합니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">데이터 재검증 주기</div>
            <div className="font-mono text-lg text-purple-600">10초</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">동적 라우트 패턴</div>
            <div className="font-mono text-sm">
              <code className="rounded bg-gray-100 px-2 py-1">/example/cache/09-isr-data-cache-revalidate/[id]</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>테스트 페이지들</CardTitle>
          <CardDescription>각 링크를 클릭하여 ISR과 데이터 캐시 조합의 동작을 확인해보세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <Link
              href={`${currentPath}/1`}
              className="flex h-12 items-center justify-center rounded-lg border bg-white p-4 text-center text-sm font-medium transition-colors hover:bg-gray-50 hover:text-purple-600"
            >
              ID: 1
            </Link>
            <Link
              href={`${currentPath}/2`}
              className="flex h-12 items-center justify-center rounded-lg border bg-white p-4 text-center text-sm font-medium transition-colors hover:bg-gray-50 hover:text-purple-600"
            >
              ID: 2
            </Link>
            <Link
              href={`${currentPath}/3`}
              className="flex h-12 items-center justify-center rounded-lg border bg-white p-4 text-center text-sm font-medium transition-colors hover:bg-gray-50 hover:text-purple-600"
            >
              ID: 3
            </Link>
            <Link
              href={`${currentPath}/4`}
              className="flex h-12 items-center justify-center rounded-lg border bg-white p-4 text-center text-sm font-medium transition-colors hover:bg-gray-50 hover:text-purple-600"
            >
              ID: 4
            </Link>
            <Link
              href={`${currentPath}/5`}
              className="flex h-12 items-center justify-center rounded-lg border bg-white p-4 text-center text-sm font-medium transition-colors hover:bg-gray-50 hover:text-purple-600"
            >
              ID: 5
            </Link>
            <Link
              href={`${currentPath}/99`}
              className="flex h-12 items-center justify-center rounded-lg border bg-white p-4 text-center text-sm font-medium transition-colors hover:bg-gray-50 hover:text-red-600"
            >
              ID: 99 (404)
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ISR + 데이터 캐시 조합의 특징</CardTitle>
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
          <div className="flex items-start gap-2">
            <span className="text-orange-600">⚠</span>
            <span>개발 환경에서는 캐시가 비활성화됨</span>
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

      <div className="text-center text-sm text-gray-500">
        <p>💡 이 조합은 안정적인 페이지 구조와 최신 데이터를 동시에 제공합니다!</p>
        <p>프로덕션 빌드에서 실제 동작을 확인해보세요.</p>
      </div>
    </div>
  );
}
