import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import path from 'node:path';
import { env } from '~/env';

const rootPath = process.cwd();
const dbFilePath = path.join(rootPath, env.DB_FILE_NAME);

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: dbFilePath,
  },
});
