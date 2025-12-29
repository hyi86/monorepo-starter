import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import path from 'node:path';
import { env } from './src/env';

const rootPath = process.cwd();
const dbFilePath = path.join(rootPath, env.DB_FILE_NAME);

export default defineConfig({
  out: './drizzle',
  schema: './src/shared/model/entities.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: dbFilePath,
  },
});
