import { Badge } from '@monorepo-starter/ui/components/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import Link from 'next/link';

export default function IncrementalStaticRegenerationPage() {
  const currentPath = `/example/cache/07-isr`;

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">ISR - Incremental Static Regeneration</h1>
        <p className="text-gray-600">동적 라우트에서 20초마다 페이지를 재생성합니다</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ISR 특징
            <Badge className="bg-blue-100 text-blue-800">동적 라우트</Badge>
          </CardTitle>
          <CardDescription>각 동적 세그먼트가 20초마다 자동으로 재생성됩니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">재검증 주기</div>
            <div className="font-mono text-lg text-blue-600">20초</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">동적 라우트 패턴</div>
            <div className="font-mono text-sm">
              <code className="rounded bg-gray-100 px-2 py-1">/example/cache/07-isr/[id]</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>테스트 페이지들</CardTitle>
          <CardDescription>각 링크를 클릭하여 ISR 동작을 확인해보세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <Link
              href={`${currentPath}/1`}
              className="flex h-12 items-center justify-center rounded-lg border bg-white p-4 text-center text-sm font-medium transition-colors hover:bg-gray-50 hover:text-blue-600"
            >
              ID: 1
            </Link>
            <Link
              href={`${currentPath}/2`}
              className="flex h-12 items-center justify-center rounded-lg border bg-white p-4 text-center text-sm font-medium transition-colors hover:bg-gray-50 hover:text-blue-600"
            >
              ID: 2
            </Link>
            <Link
              href={`${currentPath}/3`}
              className="flex h-12 items-center justify-center rounded-lg border bg-white p-4 text-center text-sm font-medium transition-colors hover:bg-gray-50 hover:text-blue-600"
            >
              ID: 3
            </Link>
            <Link
              href={`${currentPath}/4`}
              className="flex h-12 items-center justify-center rounded-lg border bg-white p-4 text-center text-sm font-medium transition-colors hover:bg-gray-50 hover:text-blue-600"
            >
              ID: 4
            </Link>
            <Link
              href={`${currentPath}/5`}
              className="flex h-12 items-center justify-center rounded-lg border bg-white p-4 text-center text-sm font-medium transition-colors hover:bg-gray-50 hover:text-blue-600"
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
          <CardTitle>ISR의 장점</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>빌드 타임에 모든 페이지를 생성할 필요 없음</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>요청 시 동적으로 페이지 생성</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>설정된 시간마다 자동 재생성</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>대용량 사이트에서도 효율적</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-orange-600">⚠</span>
            <span>개발 환경에서는 캐시가 비활성화됨</span>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>💡 각 페이지를 방문한 후 20초 뒤에 다시 방문해보세요!</p>
        <p>프로덕션 빌드에서 실제 ISR 동작을 확인할 수 있습니다.</p>
      </div>
    </div>
  );
}
