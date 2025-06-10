import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

export default async function AppInterceptingPage() {
  const cookieStore = await cookies();
  const pathname = cookieStore.get('next-pathname')?.value;
  const photos: { id: string; width: number; height: number; url: string }[] = [
    { id: 'cat', width: 640, height: 964, url: '/images/cat.jpg' },
    { id: 'dog', width: 640, height: 828, url: '/images/dog.jpg' },
    { id: 'elliphant', width: 640, height: 644, url: '/images/elliphant.jpg' },
    { id: 'giraffe', width: 640, height: 960, url: '/images/giraffe.jpg' },
    { id: 'gorilla', width: 640, height: 427, url: '/images/gorilla.jpg' },
    { id: 'loin', width: 640, height: 427, url: '/images/loin.jpg' },
    { id: 'sheep', width: 640, height: 425, url: '/images/sheep.jpg' },
    { id: 'tiger', width: 640, height: 419, url: '/images/tiger.jpg' },
    { id: 'wolf', width: 640, height: 427, url: '/images/wolf.jpg' },
  ];

  return (
    <div>
      <h1>Intercepting Route 예제(상대 경로)</h1>

      <div className="bg-gray-100 p-4 font-mono">
        <p>{pathname}</p>
        <p>{pathname}/photo/[id]</p>
        <p>
          <span>{pathname}</span>
          <span>/</span>
          <span className="text-zinc-400 line-through">@modal</span>
          <span className="text-zinc-400 line-through">/(.)</span>
          <span>photo/[id]</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        {photos.map((photo) => {
          return (
            <Link
              key={photo.id}
              href={`/example/route/intercepting/photo/${photo.id}?width=${photo.width}&height=${photo.height}`}
              passHref
              className="size-25 overflow-hidden rounded-lg"
            >
              <Image
                className="size-full object-cover grayscale backdrop-blur-[2px] transition hover:grayscale-0 hover:backdrop-blur-none"
                src={photo.url}
                alt={photo.id}
                width={photo.width}
                height={photo.height}
                loading="eager"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
