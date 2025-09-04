import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { env } from '~/shared/config/env';

export class JsonFileDB<T extends Record<string, any>> {
  public filePath: string;

  constructor(filePath: string) {
    const cachePath = env.CACHE_PATH || '.cache';
    this.filePath = path.join(process.cwd(), cachePath, filePath);
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
  }

  // 대량 데이터 쓰기 (배열 전체 덮어쓰기)
  async writeAll(rows: T[]): Promise<void> {
    const json = JSON.stringify(rows);
    await fs.promises.writeFile(this.filePath, json);
  }

  // 대량 데이터 읽기 (전체 읽기)
  async readAll(): Promise<T[]> {
    if (!fs.existsSync(this.filePath)) return [];
    const json = await fs.promises.readFile(this.filePath, 'utf-8');
    return JSON.parse(json) as T[];
  }

  // 데이터 추가 (append)
  async append(rows: T[]): Promise<void> {
    const existing = await this.readAll();
    await this.writeAll([...existing, ...rows]);
  }

  // NDJSON/JSONL 파일에서 filterFn 조건에 맞는 데이터만 배열로 반환
  async readNDJSONFilter(filterFn: (row: T) => boolean): Promise<T[]> {
    const result: T[] = [];
    const rl = readline.createInterface({
      input: fs.createReadStream(this.filePath),
      crlfDelay: Infinity,
    });
    for await (const line of rl) {
      if (line.trim()) {
        const row = JSON.parse(line);
        if (filterFn(row)) {
          result.push(row);
        }
      }
    }
    return result;
  }
}
