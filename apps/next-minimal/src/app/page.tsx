import { Button } from '@monorepo-starter/ui/components/button';
import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <main>Main</main>
      <Button asChild variant="destructive">
        <Link href={'?signout'}>
          <LogOutIcon /> Logout
        </Link>
      </Button>
    </div>
  );
}
