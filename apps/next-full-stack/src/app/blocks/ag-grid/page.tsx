import Link from 'next/link';

export default function AgGridPage() {
  return (
    <div>
      <h2>AgGridPage</h2>
      <div className="flex flex-col gap-4">
        <Link href="/blocks/ag-grid/01-default">01-Default</Link>
        <Link href="/blocks/ag-grid/02-theme">02-Theme</Link>
        <Link href="/blocks/ag-grid/03-performance">03-Performance</Link>
      </div>
    </div>
  );
}
