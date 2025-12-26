/**
 * Next.js의 unstable_cache 예제
 *
 * unstable_cache는 Next.js의 캐시 API로,
 * 더 세밀한 캐시 제어가 가능합니다.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import { unstable_cache } from 'next/cache';

// unstable_cache로 감싼 함수
const getCachedData = unstable_cache(
  async (key: string) => {
    // 시뮬레이션: API 호출
    await new Promise((resolve) => setTimeout(resolve, 100));

    return {
      key,
      value: `캐시된 데이터: ${key}`,
      timestamp: new Date().toISOString(),
    };
  },
  ['data-key'], // 캐시 키
  {
    revalidate: 10, // 10초마다 재검증
    tags: ['example'], // 태그로 그룹화
  },
);

export default async function UnstableCachePage() {
  const result = await getCachedData('test');

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>unstable_cache</CardTitle>
          <CardDescription>Next.js의 캐시 API로 세밀한 제어가 가능합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">캐시된 데이터:</p>
            <pre className="bg-muted rounded-md p-3 text-sm">{JSON.stringify(result, null, 2)}</pre>
          </div>
          <div className="text-muted-foreground space-y-1 text-sm">
            <p>💡 revalidate: 10초마다 자동 재검증</p>
            <p>💡 tags: ['example'] 태그로 그룹화되어 revalidateTag()로 무효화 가능</p>
            <p>💡 캐시 키는 ['data-key']로 설정되어 동일한 키에 대해 캐시됨</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
