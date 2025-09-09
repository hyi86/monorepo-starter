import Link from 'next/link';

export const metadata = {
  title: 'Example Blocks',
};

export default function BlocksPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Example Blocks</h2>
      <ul>
        <li>
          <Link href="/blocks/sidebar-01">Sidebar 01</Link>
        </li>
        <li>
          <Link href="/blocks/sidebar-02">Sidebar 02</Link>
        </li>
        <li>
          <Link href="/blocks/sidebar-03">Sidebar 03</Link>
        </li>
        <li>
          <Link href="/blocks/sidebar-04">Sidebar 04</Link>
        </li>
      </ul>
    </div>
  );
}
