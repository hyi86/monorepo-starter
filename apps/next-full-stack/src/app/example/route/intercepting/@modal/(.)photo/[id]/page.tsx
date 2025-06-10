'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@monorepo-starter/ui/components/dialog';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

export default function AppInterceptingPhotoDetailPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const width = searchParams.get('width') ?? '640';
  const height = searchParams.get('height') ?? '640';

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  if (!id) {
    return <div>No ID</div>;
  }

  return (
    <Dialog open>
      <DialogContent onInteractOutside={handleGoBack} onEscapeKeyDown={handleGoBack}>
        <DialogHeader>
          <DialogTitle>{id}</DialogTitle>
          <DialogDescription className="sr-only">{id}</DialogDescription>
        </DialogHeader>
        <figure className="max-w-140">
          <Image
            src={`/images/${id}.jpg`}
            alt={`${id} photo`}
            width={Number(width)}
            height={Number(height)}
            className="size-full bg-zinc-200 object-contain dark:bg-zinc-800"
          />
          <figcaption className="text-muted font-bold">{id}</figcaption>
        </figure>
      </DialogContent>
    </Dialog>
  );
}
