'use client';

import { LoaderCircle } from 'lucide-react';
import { useLinkStatus } from 'next/link';

export function LinkIndicator({ children }: { children: React.ReactNode }) {
  const { pending } = useLinkStatus();
  if (pending) {
    return <LoaderCircle className="size-4 animate-spin" />;
  }

  return children;
}
