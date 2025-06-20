import { formatDate } from '@henry-hong/common-utils/date';
import { Button } from '@monorepo-starter/ui/components/button';
import { formatDistanceToNow } from 'date-fns';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getTypedPath } from '~/app-path-types';

export default async function DataCacheOnDemandPage() {
  const id = 18;
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    next: { tags: [`todos/${id}`] },
    cache: 'force-cache',
  });
  const responseTime = new Date(response.headers.get('Date')!);
  const fromNow = formatDistanceToNow(responseTime, { addSuffix: true, includeSeconds: true });
  const formattedResponseTime = formatDate(responseTime, 'HH:mm:ss');

  async function handleRevalidateTag() {
    'use server';
    revalidateTag(`todos/${id}`);
  }

  async function handleRevalidatePath() {
    'use server';
    revalidatePath(getTypedPath('/example/cache/03-data-cache-on-demand'));
  }

  return (
    <div>
      <h1>캐싱: Data Cache - On Demand</h1>
      <div>
        Response Time: <code className="text-sky-700">{formattedResponseTime}</code> <br />
        From Now: <code className="text-sky-700">{fromNow}</code>
      </div>
      <div className="flex gap-2">
        <form action={handleRevalidateTag}>
          <Button type="submit" variant={'outline'}>
            revalidateTag
          </Button>
        </form>
        <form action={handleRevalidatePath}>
          <Button type="submit" variant={'outline'}>
            revalidatePath
          </Button>
        </form>
      </div>
    </div>
  );
}
