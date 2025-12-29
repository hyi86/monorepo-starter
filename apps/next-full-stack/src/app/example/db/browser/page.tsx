import { Suspense } from 'react';
import { BrowserDBPage } from './browser';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserDBPage />
    </Suspense>
  );
}
