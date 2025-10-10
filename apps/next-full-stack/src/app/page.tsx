import { Button } from '@monorepo-starter/ui/components/button';
import { Card, CardAction, CardFooter, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-4 p-8">
      <div className="col-span-2">Home</div>
      <Card>
        <CardHeader>
          <CardTitle>Example Page</CardTitle>
        </CardHeader>
        <CardFooter>
          <CardAction>
            <Button asChild>
              <Link href="/example">Go Example</Link>
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Blocks Page</CardTitle>
        </CardHeader>
        <CardFooter>
          <CardAction>
            <Button asChild>
              <Link href="/blocks">Go Blocks</Link>
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
