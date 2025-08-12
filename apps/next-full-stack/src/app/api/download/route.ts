import { NextRequest } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { env } from '~/env';

/**
 * 공통 파일 다운로드 API
 * GET /api/download?fileName=...
 */
export async function GET(req: NextRequest) {
  const rootPath = process.cwd();

  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get('fileName');
  if (!fileName) {
    return new Response('Missing fileName', { status: 400 });
  }

  try {
    const uploadDir = path.join(rootPath, env.UPLOAD_PATH);
    const targetPath = path.join(uploadDir, fileName);

    console.log('targetPath', targetPath);

    // 파일이 존재하는지 확인
    if (!fs.existsSync(targetPath)) {
      return new Response('File not found', { status: 404 });
    }

    const stat = fs.statSync(targetPath);
    const fileStream = fs.createReadStream(targetPath);
    return new Response(fileStream as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
        'Content-Length': stat.size.toString(),
      },
    });
  } catch (err: any) {
    return new Response('Download failed: ' + err.message, { status: 500 });
  }
}
