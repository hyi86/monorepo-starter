import { Button } from '@monorepo-starter/ui/components/button';
import { formatDate } from '@monorepo-starter/utils/date';
import { formatDistanceToNow } from 'date-fns';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({ id: (i + 1).toString() }));
}

export default async function ISRPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { next: { revalidate: 10 } });
  const responseTime = new Date(response.headers.get('Date')!);
  const fromNow = formatDistanceToNow(responseTime, { addSuffix: true, includeSeconds: true });
  const formattedResponseTime = formatDate(responseTime, 'iso9075/time');
  const formattedRenderTime = formatDate(new Date(), 'iso9075/time');

  async function handleRevalidatePath() {
    'use server';
    revalidatePath(`/example/cache/09-isr-data-cache-revalidate/${id}`);
  }

  return (
    <div>
      <p>
        URL: <code>{`/example/cache/09-isr-data-cache-revalidate/${id}`}</code> <br />
        Response Time: <code className="text-sky-700">{formattedResponseTime}</code> <br />
        From Now: <code className="text-sky-700">{fromNow}</code> <br />
        Render Time: <code className="text-sky-700">{formattedRenderTime}</code>
      </p>
      <form action={handleRevalidatePath}>
        <Button type="submit" variant={'outline'}>
          revalidatePath
        </Button>
      </form>
    </div>
  );
}
