import { blob, index, int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * API Cache Table
 */
export const cacheTable = sqliteTable(
  'cache',
  {
    key: text('key').primaryKey(), // 고유 캐시 키 (예: user:123:products)
    value: blob('value').notNull(), // gzip 압축된 JSON Buffer (blob 타입)
    expiresAt: int('expiresAt').notNull(), // 만료 시각 (ms 타임스탬프 기준, unix epoch)
  },
  (table) => [index('expiresAtIndex').on(table.expiresAt)],
);
