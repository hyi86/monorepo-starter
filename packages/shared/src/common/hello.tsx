'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import Link from 'next/link';

export function Hello() {
  return (
    <div className="flex flex-col gap-2">
      <Button>Click me</Button>
      <Link href="/example">Home</Link>
    </div>
  );
}
