import { Hello } from '@monorepo-starter/shared/common/hello';
import { Button } from '@monorepo-starter/ui/components/button';
import { Card, CardAction, CardFooter, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      <div className="col-span-3">Home</div>
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
      <Card>
        <CardHeader>
          <CardTitle>Docs Page</CardTitle>
        </CardHeader>
        <CardFooter>
          <CardAction>
            <Hello />
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
