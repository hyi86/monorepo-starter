import { AppRoutes } from '.next/types/routes';
import Link from 'next/link';

export default function CSSPage() {
  return (
    <div>
      <div className="p-4">Modern Web Features</div>
      <Link href={'/example/modern-web/01-popover' as AppRoutes}>Popover</Link>
      <Link href={'/example/modern-web/02-offset-path' as AppRoutes}>OffsetPath</Link>
      <Link href={'/example/modern-web/03-scrollbar' as AppRoutes}>Scrollbar</Link>
      <Link href={'/example/modern-web/04-content-visibility' as AppRoutes}>ContentVisibility</Link>
    </div>
  );
}
