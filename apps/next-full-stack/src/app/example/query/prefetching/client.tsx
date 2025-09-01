'use client';

/**
 * 클라이언트 컴포넌트에서 TanStack Query 사용 패턴
 *
 * useSuspenseQuery를 사용하는 이유:
 * 1. Suspense 통합: React 18의 Suspense 기능과 완벽 호환
 * 2. 로딩 상태 자동 처리: 별도의 로딩 상태 관리 불필요
 * 3. 에러 경계와 통합: 에러 처리를 Error Boundary에서 중앙 관리
 * 4. 서버 프리페칭과 연동: 서버에서 미리 가져온 데이터를 즉시 사용
 */
import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import { pokemonOptions } from './pokemon';

export function PokemonInfo({ id }: { id: string }) {
  // useSuspenseQuery 사용
  // - 서버에서 prefetchQuery로 미리 가져온 데이터를 즉시 사용
  // - 데이터가 없으면 Suspense가 활성화되어 로딩 상태 표시
  // - 별도의 로딩 상태나 에러 상태 관리 불필요
  // - HydrationBoundary를 통해 전달된 서버 상태와 자동으로 동기화
  const { data } = useSuspenseQuery(pokemonOptions(id));

  return (
    <div className="flex items-center gap-4">
      {data.map((item) => {
        return (
          <figure key={item.id}>
            <Image src={item.sprites.front_shiny} width={96} height={96} alt={item.name} />
            <h2>
              No.{item.id} <strong>{item.name}</strong>
            </h2>
          </figure>
        );
      })}
    </div>
  );
}
