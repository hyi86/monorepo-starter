/**
 * Next.js 서버 컴포넌트에서 TanStack Query 사용 패턴
 *
 * 이 패턴이 필요한 이유:
 * 1. 서버 사이드 프리페칭: 페이지 로드 전에 서버에서 데이터를 미리 가져와 초기 로딩 성능 향상
 * 2. SEO 최적화: 검색 엔진이 완전한 콘텐츠를 볼 수 있도록 서버에서 데이터 렌더링
 * 3. 하이드레이션 안전성: 서버와 클라이언트 간 데이터 상태 일관성 보장
 * 4. 중복 요청 방지: 클라이언트에서 같은 데이터를 다시 요청하지 않음
 */
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '~/shared/lib/query/client';
import { PokemonInfo } from './client';
import { pokemonOptions } from './pokemon';

export default async function Home(props: PageProps<'/example/query/prefetching'>) {
  const searchParams = await props.searchParams;
  const id = (searchParams.id as string) || '1';

  // 서버에서 새로운 QueryClient 인스턴스 생성
  // - 서버에서는 요청마다 새로운 인스턴스를 생성하여 메모리 누수 방지
  // - 클라이언트와 상태가 섞이지 않도록 격리
  const queryClient = getQueryClient();

  // 서버 사이드 프리페칭 실행
  // - 페이지가 클라이언트에 전달되기 전에 서버에서 데이터를 미리 가져옴
  // - void를 사용하여 Promise를 무시 (서버 컴포넌트에서는 await 불필요)
  // - 이렇게 하면 클라이언트에서 추가 로딩 없이 즉시 콘텐츠 표시 가능
  void queryClient.prefetchQuery(pokemonOptions(id));

  return (
    <div>
      <h1>Tanstack Query Prefetching Example</h1>
      <div>
        {/*
         * HydrationBoundary: 서버에서 가져온 데이터를 클라이언트로 안전하게 전달
         *
         * dehydrate(queryClient):
         * - 서버의 QueryClient 상태를 직렬화하여 클라이언트로 전달
         * - 클라이언트에서 같은 쿼리를 다시 요청하지 않도록 함
         * - 서버와 클라이언트 간의 데이터 상태 동기화 보장
         *
         * 이 패턴이 없으면:
         * - 클라이언트에서 데이터를 다시 요청하여 불필요한 네트워크 요청 발생
         * - 서버에서 렌더링된 HTML과 클라이언트 상태가 불일치할 수 있음
         * - 초기 로딩 성능이 저하됨
         */}
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PokemonInfo id={id} />
        </HydrationBoundary>
      </div>
    </div>
  );
}
