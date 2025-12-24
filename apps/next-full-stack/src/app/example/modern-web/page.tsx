import Link from 'next/link';

export default function CSSPage() {
  return (
    <div>
      <div className="p-4">Modern Web Features</div>
      <Link href={'/example/modern-web/01-popover'}>Popover</Link>
      <Link href={'/example/modern-web/02-offset-path'}>OffsetPath</Link>
      <Link href={'/example/modern-web/03-scrollbar'}>Scrollbar</Link>
      <Link href={'/example/modern-web/04-content-visibility'}>ContentVisibility</Link>
    </div>
  );
}
