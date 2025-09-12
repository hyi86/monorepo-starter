import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { checkAuthorization } from '~/entities/user/lib/check-auth';
import { SigninForm } from '~/features/signin/ui/signin-form';

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Signin page',
};

export default async function SigninPage(props: PageProps<'/signin'>) {
  const searchParams = await props.searchParams;
  const callbackUrl = (searchParams.callbackUrl as string) || '/';
  const { isAuthenticated } = await checkAuthorization();

  if (isAuthenticated) {
    return redirect(callbackUrl);
  }

  return (
    <div className="flex h-dvh w-dvw items-center justify-center">
      <SigninForm callbackUrl={callbackUrl} />
    </div>
  );
}
