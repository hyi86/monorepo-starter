import Dexie, { Table } from 'dexie';
import z from 'zod';

export const schema = z.object({
  seq: z.number().optional(),
  id: z.string(),
  name: z.string(),
  qty: z.number(),
  updatedAt: z.number(),
});

export type Item = z.infer<typeof schema>;

/**
 * Dexie 스토어 Syntax
 * ++seq: 자동 증가 시퀀스
 * name: 인덱스가 걸리는 컬럼 정의
 * 컬럼이 정의되지 않으면 인덱스가 안걸리는 옵셔널 컬럼
 * @see {@link https://dexie.org/docs/Version/Version.stores()}
 */
class AppDB extends Dexie {
  items!: Table<Item, string>;
  constructor() {
    super('appdb');
    this.version(1).stores({
      items: '++seq, &id, name, qty, updatedAt',
    });
  }
}

export const db = new AppDB();
