import { AppRoutes } from '.next/types/routes';
import Link from 'next/link';

export default function CSSPage() {
  return (
    <div>
      <div className="p-4">CSS New Feature Page</div>
      <Link href={'/example/css/01-popover' as AppRoutes}>Popover</Link>
    </div>
  );
}
