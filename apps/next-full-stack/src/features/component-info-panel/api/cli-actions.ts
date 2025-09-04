'use server';

import { openInEditorCommand } from '@henry-hong/common-utils/commands';
import { devLog } from '@henry-hong/common-utils/console';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import tar from 'tar-stream';
import { env } from '~/shared/config/env';

/**
 * 코드 가져오기 Action
 * development: local file
 * production: in tar.gz file
 */
export async function getCodeFromFile(filePath: string) {
  if (process.env.NODE_ENV !== 'development') {
    const archivePath = path.join(process.cwd(), 'public', 'source-codes.tar.gz');
    const fullFilePath = path.join('apps/next-full-stack/', filePath);

    const code = await readFileFromTarGz(archivePath, fullFilePath);
    return code || '';
  }

  try {
    fs.accessSync(filePath, fs.constants.R_OK);
    const code = fs.readFileSync(filePath, 'utf-8');
    return code;
  } catch (error) {
    devLog('error', error);
    return '';
  }
}

/**
 * ⚠️ development only
 * 코드 저장 Action
 */
export async function saveCodeToFile(filePath: string, code: string) {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  try {
    fs.accessSync(filePath, fs.constants.W_OK);
    const prettier = await import('prettier');
    const extension = path.extname(filePath);
    let parser = 'typescript';
    if (extension === '.jsx') {
      parser = 'javascript';
    } else if (extension === '.json') {
      parser = 'json';
    } else if (extension === '.yaml') {
      parser = 'yaml';
    } else if (extension === '.mdx') {
      parser = 'mdx';
    }

    const formattedCode = await prettier.format(code, { parser, printWidth: 120, singleQuote: true });
    fs.writeFileSync(filePath, formattedCode, 'utf-8');
  } catch (error) {
    console.log(error);
    devLog('error', error);
  }
}

/**
 * ⚠️ development only
 * 코드 편집기 열기 Action
 */
export async function openInEditor(filePath: string) {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  try {
    execSync(openInEditorCommand(env.CODE_EDITOR, filePath, 1));
  } catch (error) {
    devLog('error', error);
  }
}

/**
 * tar.gz 압축 파일내에서 파일 읽기 Action
 */
function readFileFromTarGz(tarGzPath: string, targetFilePath: string) {
  return new Promise<string>((resolve, reject) => {
    const extract = tar.extract();
    let found = false;

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
