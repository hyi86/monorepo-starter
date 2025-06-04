import { redirect } from 'next/navigation';
import { TypedRoute } from '~/app-path-types';

export default function Home() {
  redirect('/example' as TypedRoute);

  return null;
}
