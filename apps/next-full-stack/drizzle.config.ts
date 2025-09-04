import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import path from 'node:path';
import { env } from '~/shared/config/env';

const rootPath = process.cwd();
const dbFilePath = path.join(rootPath, env.DB_FILE_NAME);

export default defineConfig({
  out: './drizzle',
  schema: './src/common/model/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: dbFilePath,
  },
});
