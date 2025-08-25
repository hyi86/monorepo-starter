import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '~/common/lib/query/client';
import { PokemonInfo } from './client';
import { pokemonOptions } from './pokemon';

export default async function Home(props: PageProps<'/example/query/prefetching'>) {
  const searchParams = await props.searchParams;
  const id = searchParams.id as string;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(pokemonOptions(id));

  return (
    <div>
      <h1>Tanstack Query Prefetching Example</h1>
      <div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PokemonInfo id={id} />
        </HydrationBoundary>
      </div>
    </div>
  );
}
