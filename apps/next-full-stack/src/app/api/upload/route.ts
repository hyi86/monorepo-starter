import { NextRequest } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { env } from '~/env';

// (Next.js App Route라면) Node 런타임 보장 필요시:
// export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const rawFileName = req.headers.get('x-file-name');
  const chunkIndexStr = req.headers.get('x-chunk-index');
  const totalSizeStr = req.headers.get('x-total-size');

  if (!rawFileName || !chunkIndexStr || !totalSizeStr) {
    return new Response('Missing headers', { status: 400 });
  }

  // 숫자 검증
  const chunkIndex = Number(chunkIndexStr);
  const totalSize = Number(totalSizeStr);
  if (!Number.isFinite(chunkIndex) || chunkIndex < 0 || !Number.isFinite(totalSize) || totalSize < 0) {
    return new Response('Invalid headers', { status: 400 });
  }

  // 파일명 복원(+경로 위변조 방지)
  let decodedName: string;
  try {
    decodedName = decodeURIComponent(rawFileName);
  } catch {
    return new Response('Invalid file name encoding', { status: 400 });
  }
  const safeName = path.basename(decodedName); // 경로 traversal 방지

  try {
    const uploadDir = path.join(process.cwd(), env.UPLOAD_PATH);
    fs.mkdirSync(uploadDir, { recursive: true });

    const targetPath = path.join(uploadDir, safeName);

    // 첫 청크는 새로 쓰기('w'), 이후는 이어쓰기('a')
    const flags = chunkIndex === 0 ? 'w' : 'a';

    // Web ReadableStream → Node Readable 변환
    const reader = req.body?.getReader();
    if (!reader) return new Response('No body', { status: 400 });

    const nodeReadable = new Readable({
      async read() {
        try {
          const { done, value } = await reader.read();
          if (done) this.push(null);
          else this.push(value);
        } catch (e) {
          this.destroy(e as Error);
        }
      },
    });

    await new Promise<void>((resolve, reject) => {
      const fileStream = fs.createWriteStream(targetPath, { flags });
      nodeReadable.on('error', reject);
      fileStream.on('error', reject);
      fileStream.on('finish', resolve);
      nodeReadable.pipe(fileStream);
    });

    return new Response(JSON.stringify({ status: 'ok', chunkIndex, fileName: safeName }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response('Upload failed: ' + err.message, { status: 500 });
  }
}
