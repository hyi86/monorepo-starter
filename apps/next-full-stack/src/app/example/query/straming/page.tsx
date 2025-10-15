'use client';

import { isServer, useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { env } from '~/env';

// export const runtime = 'edge'; // 'nodejs' (default) | 'edge'

function getBaseURL() {
  if (!isServer) {
    return '';
  }

  return env.NEXT_PUBLIC_URL;
}

const baseUrl = getBaseURL();

function useWaitQuery(props: { wait: number }) {
  const query = useSuspenseQuery({
    queryKey: ['wait', props.wait],
    queryFn: async () => {
      const path = `/api/query/streaming?wait=${props.wait}`;
      const url = baseUrl + path;

      const res: string = await (
        await fetch(url, {
          cache: 'no-store',
        })
      ).json();
      return res;
    },
  });

  return [query.data as string, query] as const;
}

function StreamingComponent(props: { wait: number }) {
  const [data] = useWaitQuery(props);

  return <div>result: {data}</div>;
}

export default function QueryStreamingPage() {
  return (
    <div>
      <h1>Tanstack Query Streaming Example</h1>
      <div>
        <Suspense fallback={<div>waiting 100....</div>}>
          <StreamingComponent wait={100} />
        </Suspense>
        <Suspense fallback={<div>waiting 200....</div>}>
          <StreamingComponent wait={200} />
        </Suspense>
        <Suspense fallback={<div>waiting 300....</div>}>
          <StreamingComponent wait={300} />
        </Suspense>
        <Suspense fallback={<div>waiting 400....</div>}>
          <StreamingComponent wait={400} />
        </Suspense>
        <Suspense fallback={<div>waiting 500....</div>}>
          <StreamingComponent wait={500} />
        </Suspense>
        <Suspense fallback={<div>waiting 600....</div>}>
          <StreamingComponent wait={600} />
        </Suspense>
        <Suspense fallback={<div>waiting 700....</div>}>
          <StreamingComponent wait={700} />
        </Suspense>

        <fieldset>
          <legend>
            combined <code>Suspense</code>-container
          </legend>
          <Suspense
            fallback={
              <>
                <div>waiting 800....</div>
                <div>waiting 900....</div>
                <div>waiting 1000....</div>
              </>
            }
          >
            <StreamingComponent wait={800} />
            <StreamingComponent wait={900} />
            <StreamingComponent wait={1000} />
          </Suspense>
        </fieldset>
      </div>
    </div>
  );
}
