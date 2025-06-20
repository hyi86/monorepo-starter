'use server';

import { openInEditorCommand } from '@henry-hong/common-utils/commands';
import { devLog } from '@henry-hong/common-utils/console';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import tar from 'tar-stream';
import { env } from '~/env';

/**
 * ⚠️ development only
 * 코드 저장
 */
export async function saveCodeToFile(fileName: string, code: string) {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  if (fileName.startsWith('~/')) {
    fileName = fileName.replace('~/', './src/');
  }

  try {
    fs.accessSync(fileName, fs.constants.W_OK); // 쓰기 가능한 파일인지 확인
    fs.writeFileSync(fileName, code, 'utf-8');
  } catch (error) {
    devLog('error', error);
  }
}

/**
 * 코드 가져오기
 */
export async function getCodeFromFilePath(fileName: string) {
  if (fileName.startsWith('~/')) {
    fileName = fileName.replace('~/', 'src/');
  }

  const archivePath = path.join(process.cwd(), 'public', 'source-codes.tar.gz');
  const fullFilePath = path.join('apps/next-full-stack/', fileName);

  const code = await readFileFromTarGz(archivePath, fullFilePath);
  return code || '';
}

/**
 * ⚠️ development only
 * 코드 편집기 열기
 */
export async function openInEditor(fileName: string) {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  try {
    execSync(openInEditorCommand(env.CODE_EDITOR, fileName, 1));
  } catch (error) {
    devLog('error', error);
  }
}

/**
 * tar.gz 압축 파일내에서 파일 읽기
 */
function readFileFromTarGz(tarGzPath: string, targetFilePath: string) {
  return new Promise<string>((resolve, reject) => {
    const extract = tar.extract();
    let found = false;

    console.log(targetFilePath);

    extract.on('entry', (header, stream, next) => {
      if (header.name === targetFilePath) {
        found = true;
        let data = '';
        stream.on('data', (chunk) => {
          data += chunk.toString();
        });
        stream.on('end', () => {
          resolve(data);
        });
      } else {
        stream.resume(); // skip
      }
      stream.on('end', next);
    });

    extract.on('finish', () => {
      if (!found) reject(new Error('File not found: ' + targetFilePath));
    });

    fs.createReadStream(tarGzPath).pipe(zlib.createGunzip()).pipe(extract);
  });
}
