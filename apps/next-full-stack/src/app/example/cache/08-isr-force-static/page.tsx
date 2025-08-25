import { Badge } from '@monorepo-starter/ui/components/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import Link from 'next/link';

export default function ISRForceStaticPage() {
  const currentPath = `/example/cache/08-isr-force-static`;

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">ISR - 강제 정적 생성</h1>
        <p className="text-gray-600">빌드 타임에 생성된 페이지를 항상 캐시합니다</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ISR 특징
            <Badge className="bg-green-100 text-green-800">강제 정적</Badge>
          </CardTitle>
          <CardDescription>빌드 타임에 모든 페이지가 생성되어 시간 제한 없이 캐시됩니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">캐시 정책</div>
            <div className="font-mono text-lg text-green-600">무제한 캐시</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">동적 라우트 패턴</div>
            <div className="font-mono text-sm">
              <code className="rounded bg-gray-100 px-2 py-1">/example/cache/08-isr-force-static/[id]</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>테스트 페이지들</CardTitle>
          <CardDescription>각 링크를 클릭하여 강제 정적 ISR 동작을 확인해보세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <Link
              href={`${currentPath}/1`}
              className="flex h-12 items-center justify-center rounded-lg border bg-white p-4 text-center text-sm font-medium transition-colors hover:bg-gray-50 hover:text-green-600"
            >
              ID: 1
            </Link>
            <Link
              href={`${currentPath}/2`}
              className="flex h-12 items-center justify-center rounded-lg border bg-white p-4 text-center text-sm font-medium transition-colors hover:bg-gray-50 hover:text-green-600"
            >
              ID: 2
            </Link>
            <Link
              href={`${currentPath}/3`}
              className="flex h-12 items-center justify-center rounded-lg border bg-white p-4 text-center text-sm font-medium transition-colors hover:bg-gray-50 hover:text-green-600"
            >
              ID: 3
            </Link>
            <Link
              href={`${currentPath}/4`}
              className="flex h-12 items-center justify-center rounded-lg border bg-white p-4 text-center text-sm font-medium transition-colors hover:bg-gray-50 hover:text-green-600"
            >
              ID: 4
            </Link>
            <Link
              href={`${currentPath}/5`}
              className="flex h-12 items-center justify-center rounded-lg border bg-white p-4 text-center text-sm font-medium transition-colors hover:bg-gray-50 hover:text-green-600"
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
          <div className="flex items-start gap-2">
            <span className="text-orange-600">⚠</span>
            <span>개발 환경에서는 캐시가 비활성화됨</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>일반 ISR vs 강제 정적 ISR</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-600">일반 ISR</h4>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• 요청 시 동적 생성</li>
                <li>• 시간 기반 재검증</li>
                <li>• 메모리 효율적</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-600">강제 정적 ISR</h4>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• 빌드 타임에 생성</li>
                <li>• 무제한 캐시</li>
                <li>• 최고 성능</li>
              </ul>
            </div>
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
