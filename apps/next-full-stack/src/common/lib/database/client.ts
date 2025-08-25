import 'dotenv/config';
import { type BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';
import path from 'node:path';
import { env } from '~/common/config/env';

const rootPath = process.cwd();
const dbFilePath = path.join(rootPath, env.DB_FILE_NAME);

export const db = drizzle(dbFilePath, {
  // logger: process.env.NODE_ENV === 'development' ? true : false,
  logger: false,
}) as BetterSQLite3Database;
