// pnpm --filter @monorepo-starter/cli run start src/compress-project.ts
import { build } from 'esbuild';
import glob from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';
import tar from 'tar-fs';
import { createBrotliCompress } from 'zlib';

// 현재 파일의 실행 경로를 프로젝트 루트로 변경
process.chdir(path.join(import.meta.dirname, '../../..'));

const sourcePath = path.resolve('apps/next-ready-stack/src'); // 압축할 폴더
const outputPath = path.resolve('apps/next-ready-stack/public/src.tar.br'); // 압축 파일명
const tempPath = path.resolve('temp-minified');

await minifyProject(sourcePath, tempPath);
await compressProject(tempPath, outputPath);

/**
 * 프로젝트 압축
 */
async function compressProject(sourcePath: string, outputPath: string) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const pack = tar.pack(sourcePath); // 전체 폴더 tar 처리
  const out = fs.createWriteStream(outputPath);

  pack
    .pipe(createBrotliCompress())
    .pipe(out)
    .on('finish', () => {
      console.log(`✅ 압축 완료: ${outputPath}`);
      fs.rmSync(tempPath, { recursive: true, force: true });
    });
}

/**
 * 프로젝트 원본 그대로 복사
 */
async function minifyProject(sourcePath: string, tempPath: string) {
  const files = await glob(`${sourcePath}/**/*.{ts,tsx,js,jsx}`, { absolute: true });

  fs.rmSync(tempPath, { recursive: true, force: true });
  fs.mkdirSync(tempPath, { recursive: true });

  const chunkSize = 100;
  const chunks = Math.ceil(files.length / chunkSize);

  for (let i = 0; i < chunks; i++) {
    const chunkFiles = files.slice(i * chunkSize, (i + 1) * chunkSize);
    const lines: string[] = [];

    for (const filePath of chunkFiles) {
      const relPath = path.relative(sourcePath, filePath);
      lines.push(`// === FILE: ${relPath} ===`);

      const content = (await fs.promises.readFile(filePath, 'utf8')).trim();

      if (relPath.endsWith('.json')) {
        console.log(content.replace(/\n/g, ' '));
        lines.push(content.replace(/\n/g, ' '));
        continue;
      }

      const marked = content.split('\n').join('_|');
      // const safeChunks = marked.match(/.{1,2000}/g) || [];
      lines.push(marked);
    }

    const chunkName = `chunk-${String(i + 1).padStart(3, '0')}.txt`;
    const chunkPath = path.join(tempPath, chunkName);
    await fs.promises.writeFile(chunkPath, lines.join('\n'), 'utf8');
  }

  console.log(`✅ Created ${chunks} chunks → ${tempPath}`);
}
