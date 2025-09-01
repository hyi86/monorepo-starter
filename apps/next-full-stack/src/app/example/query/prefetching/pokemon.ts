/**
 * TanStack Query 옵션 설정
 *
 * Next.js App Router와 TanStack Query 통합 패턴:
 * 1. queryOptions 사용: 타입 안전성과 재사용성 향상
 * 2. staleTime 설정: 불필요한 재요청 방지
 * 3. Next.js 캐싱과 통합: 이중 캐싱으로 성능 최적화
 * 4. ISR 지원: 정적 생성과 동적 업데이트의 조합
 */
import { queryOptions } from '@tanstack/react-query';

export const pokemonOptions = (id: string) =>
  queryOptions({
    // 쿼리 키: 캐싱과 무효화를 위한 고유 식별자
    queryKey: ['pokemon', id],

    // staleTime: 30초 동안 데이터를 "신선"하다고 간주
    // - 30초 내에는 같은 쿼리를 다시 요청하지 않음
    // - 서버 프리페칭과 함께 사용하여 초기 로딩 성능 향상
    staleTime: 30, // 30초

    // 쿼리 함수: 실제 데이터를 가져오는 함수
    queryFn: async () => {
      const numId = Number(id);

      // 여러 포켓몬 데이터를 병렬로 가져오기(다중 API 요청 패턴)
      const fetchPromises = [numId, numId + 1, numId + 2].map((id) => {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
          // Next.js 캐싱 설정과 통합
          next: {
            // ISR (Incremental Static Regeneration) 설정
            // - 60초마다 백그라운드에서 데이터 재검증
            // - TanStack Query 캐싱과 이중으로 성능 최적화
            revalidate: 60, // 1분
          },
        }).then((res) => res.json());
      });

      // 모든 요청을 병렬로 처리하여 성능 향상
      const result = await Promise.all(fetchPromises);
      return result;
    },
  });
