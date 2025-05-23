// pnpm --filter @monorepo-starter/cli run start src/compress-project-read.ts
import fs from 'fs';
import path from 'path';
import { format } from 'prettier';
import { extract } from 'tar-stream';
import { createBrotliDecompress } from 'zlib';

// 현재 파일의 실행 경로를 프로젝트 루트로 변경
process.chdir(path.join(import.meta.dirname, '../../..'));

export async function readFileFromTarBr(filename: string): Promise<string> {
  const archivePath = path.resolve('apps/next-ready-stack/public/src.tar.br');
  const extractStream = extract();

  let found = false;
  let resultBuffer = '';

  const result = new Promise<string>((resolve, reject) => {
    extractStream.on('entry', (header, stream, next) => {
      if (!header.name.endsWith('.txt')) {
        stream.resume();
        stream.on('end', next);
        return;
      }

      const chunks: Buffer[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => {
        const content = Buffer.concat(chunks).toString('utf8');
        const entries = content.split('// === FILE: ').slice(1);
        for (const entry of entries) {
          const [nameLine, ...codeLines] = entry.split('\n');
          const normalized = nameLine?.replace(/\s*===.*$/, '').trim();
          if (normalized === filename || normalized?.endsWith('/' + filename)) {
            found = true;
            const allLines = codeLines.join('\n');

            resultBuffer = allLines.split('_|').join('\n');
            resolve(resultBuffer);
            return;
          }
        }
        next();
      });
    });

    extractStream.on('finish', () => {
      if (!found) {
        reject(new Error(`File not found in chunks: ${filename}`));
      }
    });

    extractStream.on('error', reject);
  });

  fs.createReadStream(archivePath).pipe(createBrotliDecompress()).pipe(extractStream);

  return result;
}

// const result = await readFileFromTarBr('env.ts');
const result = await readFileFromTarBr('app-path-types.ts');
const formattedResult = await format(result, { parser: 'typescript', printWidth: 999, singleQuote: true });
console.log(formattedResult);
