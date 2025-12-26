'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import Link from 'next/link';

export function Hello() {
  return (
    <div className="flex flex-col gap-1">
      <Button>Click me</Button>
      <Button asChild variant="outline">
        <Link href="/example">Home Button</Link>
      </Button>
    </div>
  );
}
