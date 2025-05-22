import { formatDate, formatDistanceToNow, localeKo } from '@monorepo-starter/utils/date';

export default async function DataCacheDisabledPage() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/20`);
  const responseTime = new Date(response.headers.get('Date')!);
  const fromNow = formatDistanceToNow(responseTime, { addSuffix: true, includeSeconds: true, locale: localeKo });
  const formattedResponseTime = formatDate(responseTime, 'HH:mm:ss');

  return (
    <div>
      <h1>캐싱: Data Cache - Default</h1>
      <div>
        Response Time: <code className="text-sky-700">{formattedResponseTime}</code> <br />
        From Now: <code className="text-sky-700">{fromNow}</code>
      </div>
    </div>
  );
}
