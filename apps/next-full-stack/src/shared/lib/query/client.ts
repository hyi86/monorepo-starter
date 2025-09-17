/**
 * TanStack Query 클라이언트 설정 (@tanstack/react-query 공식문서 참조)
 *
 * Next.js App Router에서 서버와 클라이언트 환경을 구분하여
 * 각각에 최적화된 QueryClient 인스턴스를 제공하는 패턴
 * @see {@link https://tanstack.com/query/latest/docs/framework/react/guides/ssr}
 */
import { QueryClient, defaultShouldDehydrateQuery, isServer } from '@tanstack/react-query';

/**
 * QueryClient 인스턴스 생성 함수
 *
 * 서버와 클라이언트 환경에 최적화된 설정을 적용
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR에서 staleTime을 0보다 크게 설정하여 즉시 재검색 방지
        // - 서버에서 렌더링된 데이터가 클라이언트에서 즉시 무효화되는 것을 방지
        // - 하이드레이션 과정에서 불필요한 네트워크 요청 차단
        staleTime: 60 * 1000, // SSR 에서는 일반적으로 0 이상의 staleTime을 설정하여 즉시 재검색을 방지
      },
      dehydrate: {
        // 서버에서 클라이언트로 데이터를 전달할 때의 설정
        shouldDehydrateQuery: (query) =>
          // 기본 규칙: 성공한 쿼리와 에러 쿼리는 항상 전달
          defaultShouldDehydrateQuery(query) ||
          // 추가 규칙: 진행 중인(pending) 쿼리도 포함
          // - 서버에서 시작된 요청이 클라이언트에서 완료될 수 있도록 함
          // - 부분적으로 로드된 데이터도 클라이언트로 전달
          query.state.status === 'pending',
      },
    },
  });
}

// 브라우저 환경에서 사용할 QueryClient 인스턴스 (싱글톤)
let browserQueryClient: QueryClient | undefined = undefined;

/**
 * 환경에 따른 QueryClient 인스턴스 반환
 *
 * 서버와 클라이언트 환경을 구분하여 각각에 최적화된 인스턴스 제공
 */
export function getQueryClient() {
  if (isServer) {
    // 서버 환경: 항상 새로운 QueryClient 인스턴스 생성
    //
    // 이유:
    // 1. 메모리 누수 방지: 요청마다 새로운 인스턴스로 메모리 정리 보장
    // 2. 요청 격리: 각 요청 간의 상태가 섞이지 않음
    // 3. 보안: 사용자 간 데이터가 공유되지 않음
    // 4. 하이드레이션 안전성: 서버 상태가 클라이언트로 정확히 전달됨
    return makeQueryClient();
  } else {
    // 브라우저 환경: 싱글톤 패턴으로 QueryClient 인스턴스 관리
    //
    // 이유:
    // 1. 성능 최적화: 인스턴스 재사용으로 메모리 효율성 향상
    // 2. 상태 지속성: 페이지 내비게이션 시에도 쿼리 상태 유지
    // 3. React 렌더링 최적화: 불필요한 리렌더링 방지
    // 4. 개발자 경험: React DevTools에서 일관된 상태 확인 가능
    //
    // 주의사항:
    // - React가 초기 렌더링 중에 일시 중단되더라도 새로운 클라이언트가 재생성되지 않도록 함
    // - Suspense 경계 아래에 있는 경우에는 필요하지 않을 수 있음
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
