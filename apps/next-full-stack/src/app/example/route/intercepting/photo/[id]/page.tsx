import Image from 'next/image';

export default async function AppInterceptingPhotoDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ width: string; height: string }>;
}) {
  const { id } = await params;
  const { width = '640', height = '640' } = await searchParams;

  if (!id) {
    return <div>No ID</div>;
  }

  return (
    <figure className="size-120">
      <Image
        src={`/images/${id}.jpg`}
        alt={id}
        width={Number(width)}
        height={Number(height)}
        className="size-full bg-zinc-600 object-contain dark:bg-zinc-400"
      />
      <figcaption className="text-muted font-bold">{id}</figcaption>
    </figure>
  );
}
