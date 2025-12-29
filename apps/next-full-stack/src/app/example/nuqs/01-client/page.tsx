import { Suspense } from 'react';
import { Query } from './query';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Query />
    </Suspense>
  );
}
