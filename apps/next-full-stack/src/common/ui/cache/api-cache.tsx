import { devLog } from '@henry-hong/common-utils/console';
import { format } from '@henry-hong/common-utils/number';
import parseDuration from 'parse-duration';
import { apiHybridCache } from '~/common/lib/api-cache';

export async function ExampleCacheData() {
  const offset = 10;
  const limit = 20;
  const ttl = '20s';

  const { data, traceId, cacheStatus, compressedSize } = await apiHybridCache({
    key: `users:all:${offset}:${limit}`,
    ttl: parseDuration(ttl, 'ms') ?? undefined,
    fetcher: async () => {
      try {
        const res = await fetch(`https://api.disneyapi.dev/character`, {
          cache: 'no-store',
        });
        return res.json();
      } catch (error) {
        devLog('error', error);
        return [];
      }
    },
  });

  return (
    <div>
      <ul>
        <li>
          <strong>TTL</strong>: <code>{ttl}</code>
        </li>
        <li>
          <strong>cacheStatus</strong>: <code>{cacheStatus}</code>
        </li>
        <li>
          <strong>traceId</strong>: <code>{traceId}</code>
        </li>
        <li>
          <strong>data Count</strong>: <code>{JSON.stringify(data.data.length)}</code>
        </li>
        <li>
          <strong>compressedSize</strong>: <code>{format(compressedSize)} Bytes</code>
        </li>
      </ul>
      <pre className="h-120">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
