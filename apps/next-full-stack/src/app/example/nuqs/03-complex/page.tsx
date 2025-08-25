import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import { Client } from './client';
import { cache } from './searchParams';
import { Server } from './server';

/**
 * 메인 페이지 컴포넌트 - Nuqs 복합 예제
 * - 서버 컴포넌트와 클라이언트 컴포넌트를 모두 사용하여 URL 파라미터 처리
 * - 두 컴포넌트가 동일한 파라미터 정의를 공유하여 일관성 보장
 * - Suspense를 사용하여 클라이언트 컴포넌트의 로딩 상태 처리
 */
export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  // URL 파라미터를 파싱하여 캐시에 저장
  // 이 함수는 서버 사이드에서 실행되며, 파라미터를 파싱하여 메모리에 캐시
  await cache.parse(searchParams);

  return (
    <div>
      <h1>Nuqs Complex</h1>
      <p>모두 같은 값을 사용</p>

      {/* 서버 컴포넌트 섹션 */}
      <h3 className="text-cyan-600">Using Server Component With Link Update</h3>
      <Server />

      {/* 클라이언트 컴포넌트 섹션 */}
      <h3 className="text-sky-600">Using Client Component With Realtime Update</h3>
      {/* Suspense로 클라이언트 컴포넌트 래핑 */}
      {/* 클라이언트 컴포넌트가 로딩 중일 때 fallback UI 표시 */}
      <Suspense fallback={<div>Loading...</div>}>
        <Client />
      </Suspense>
    </div>
  );
}
