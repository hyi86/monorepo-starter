import type { Metadata, Route } from 'next';
import { redirect } from 'next/navigation';
import { checkAuthorization } from '~/shared/lib/auth/check-auth';
import { SigninForm } from './_private/SigninForm';

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Signin page',
};

export default async function SigninPage(props: PageProps<'/signin'>) {
  const searchParams = await props.searchParams;
  const callbackUrl = (searchParams.callbackUrl as string) || '/';
  const { isAuthenticated } = await checkAuthorization();

  if (isAuthenticated) {
    return redirect(callbackUrl as Route);
  }

  return (
    <div className="flex h-dvh w-dvw items-center justify-center">
      <SigninForm callbackUrl={callbackUrl} />
    </div>
  );
}
