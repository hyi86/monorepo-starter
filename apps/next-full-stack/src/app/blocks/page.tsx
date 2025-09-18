import type { AppRoutes } from '.next/types/routes';
import Link from 'next/link';

export const metadata = {
  title: 'Example Blocks',
};

export default function BlocksPage() {
  const links: { href: AppRoutes; label: string }[] = [
    { href: '/blocks/sidebar-01', label: 'Sidebar 01' },
    { href: '/blocks/sidebar-02', label: 'Sidebar 02' },
    { href: '/blocks/sidebar-03', label: 'Sidebar 03' },
    { href: '/blocks/sidebar-04', label: 'Sidebar 04' },
    { href: '/blocks/sidebar-07', label: 'Sidebar 07' },
    { href: '/blocks/sidebar-09', label: 'Sidebar 09' },
    { href: '/blocks/sidebar-10', label: 'Sidebar 10' },
    { href: '/blocks/sidebar-13', label: 'Sidebar 13' },
    { href: '/blocks/sidebar-15', label: 'Sidebar 15' },
    { href: '/blocks/sidebar-16', label: 'Sidebar 16' },
  ];

  return (
    <div className="space-y-4 p-8">
      <h2 className="text-2xl font-bold">Example Blocks</h2>
      <ul className="*:bg-muted *:text-muted-foreground grid grid-cols-2 gap-4 *:rounded-lg *:p-4 md:grid-cols-4">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
