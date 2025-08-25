import { Button } from '@monorepo-starter/ui/components/button';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { cache, serialize } from './searchParams';

/**
 * 서버 컴포넌트 - URL 파라미터를 읽고 링크로 업데이트
 * - 서버 사이드에서 URL 파라미터를 파싱하여 표시
 * - Link 컴포넌트를 사용하여 새로운 URL로 네비게이션
 * - 두 가지 방법으로 파라미터 처리:
 *   1. cache.all() - 캐시된 파라미터 사용
 *   2. loadSearchParams() - 직접 파라미터 로드
 */
export async function Server() {
  // 쿠키에서 현재 경로 가져오기
  const cookieStore = await cookies();
  const currentUrl = cookieStore.get('next-pathname')?.value || '/';

  // 방법 1: 캐시된 모든 파라미터 값 가져오기
  // cache.all()은 모든 파라미터의 현재 값을 반환
  const { str, int, bool, literal, float } = cache.all();

  // 방법 2: createLoader를 사용한 직접 파라미터 로드 (예시)
  // 이 방법은 캐시 없이 직접 파라미터를 파싱할 때 유용
  // const { str: strDirect, int: intDirect } = await loadSearchParams(searchParams);

  return (
    <>
      {/* 현재 파라미터 값을 JSON 형태로 표시 */}
      <pre>
        <code>{JSON.stringify({ str, int, bool, literal, float }, null, 2)}</code>
      </pre>

      <div>
        <div className="flex gap-2">
          {/* 모든 파라미터를 한 번에 업데이트하는 링크 */}
          <Button asChild variant="outline">
            <Link
              href={serialize(currentUrl, {
                str: 'test', // 문자열 업데이트
                int: 10, // 정수 업데이트
                bool: true, // 불린 업데이트
                literal: 'banana', // 리터럴 업데이트
                float: 10.1, // 실수 업데이트
              })}
            >
              Update Parameters
            </Link>
          </Button>

          {/* float 파라미터만 업데이트하는 링크 */}
          <Button asChild variant="outline">
            <Link href={serialize(currentUrl, { float: 999 })}>{serialize(currentUrl, { float: 999 })}</Link>
          </Button>

          {/* 현재 URL로 리셋하는 링크 (모든 파라미터 제거) */}
          <Button asChild variant="outline">
            <Link href={currentUrl}>{currentUrl}</Link>
          </Button>
        </div>
      </div>

      {/* 캐시 메서드 사용 예시 */}
      <div className="mt-4">
        <h4>캐시 메서드 사용 예시:</h4>
        <div className="space-y-1 text-sm">
          <div>특정 파라미터: {cache.get('str')}</div>
          <div>모든 파라미터: {JSON.stringify(cache.all())}</div>
        </div>
      </div>
    </>
  );
}
