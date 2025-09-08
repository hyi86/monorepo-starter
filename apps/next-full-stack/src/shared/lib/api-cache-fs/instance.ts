/**
 * 로컬 File 기반 API 캐시 (Server-side Only)
 */
import { devLog } from '@henry-hong/common-utils/console';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import { gunzip, gzipSync } from 'node:zlib';
import { env } from '~/shared/config/env';

const asyncGunzip = promisify(gunzip);
const rootPath = process.cwd();
const cacheDir = path.join(rootPath, env.CACHE_PATH);

// 동시 실행 제한
const inflight = new Map<string, Promise<any>>();

type HybridOptions<T> = {
  key: string;
  ttl?: number;
  fetcher: () => Promise<T>;
};

type CacheResult<T> = {
  data: T;
  traceId: string;
  cacheStatus: 'HIT' | 'MISS' | 'WAIT';
  compressedSize: number;
};

export async function apiHybridCache<T>({ key, ttl = 15 * 1000, fetcher }: HybridOptions<T>): Promise<CacheResult<T>> {
  // 캐시 디렉토리 생성
  try {
    fs.accessSync(cacheDir, fs.constants.W_OK); // 쓰기 가능한 디렉토리인지 확인
  } catch {
    fs.mkdirSync(cacheDir, { recursive: true });
    fs.chmodSync(cacheDir, 0o755);
  }

  const now = Date.now(); // 현재 시간 조회
  const traceId = crypto.randomUUID(); // traceId 생성
  const filePath = getFilePath(key); // 파일 경로 생성

  // 파일 캐시 히트 확인
  try {
    const stat = fs.statSync(filePath);
    const age = now - stat.mtimeMs;
    if (age < ttl) {
      const buffer = fs.readFileSync(filePath);
      const decompressed = await asyncGunzip(buffer);
      const data = JSON.parse(decompressed.toString());
      return { data, traceId, cacheStatus: 'HIT', compressedSize: buffer.length };
    }
  } catch {
    devLog('warn', `[CACHE_FILE_NOT_FOUND ERROR] key=${key} traceId=${traceId} filePath=${filePath}`);
  }

  // 동시 실행 제한
  if (inflight.has(key)) {
    const data = await inflight.get(key);
    devLog('warn', `[CACHE_WAIT ERROR] key=${key} traceId=${traceId}`);
    return { data, traceId, cacheStatus: 'WAIT', compressedSize: 0 };
  }

  // 캐시 데이터 조회
  const promise = (async () => {
    const fetchStart = Date.now();
    const data = await fetcher();
    const fetchDuration = Date.now() - fetchStart;

    const json = JSON.stringify(data);
    const compressed = gzipSync(json);
    const compressedSize = compressed.length;

    // 파일 캐시 저장
    try {
      fs.writeFileSync(filePath, compressed);
      devLog('info', `[CACHE]`, { cacheStatus: 'MISS', hitType: 'FILE', key, traceId, compressedSize, fetchDuration });
    } catch (err) {
      devLog('error', `[FILE_WRITE_ERROR] key=${key} path=${filePath}`, err);
    }

    return data;
  })();

  inflight.set(key, promise);

  // 캐시 데이터 조회
  try {
    const result = await promise;
    return { data: result, traceId, cacheStatus: 'MISS', compressedSize: 0 };
  } finally {
    inflight.delete(key);
  }
}

function getFilePath(key: string) {
  const hash = crypto.createHash('sha256').update(key).digest('hex');
  return path.join(cacheDir, `${hash}.json.gz`);
}
