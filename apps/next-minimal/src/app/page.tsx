import { Route } from 'next';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <main>Main</main>
      <Link href={'/signout' as Route}>Signout</Link>
    </div>
  );
}
