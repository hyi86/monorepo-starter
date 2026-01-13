import { createEnv } from '@t3-oss/env-nextjs';
import { nanoid } from 'nanoid';
import { z } from 'zod';

export const env = createEnv({
  // STANDALONE 빌드시 또는 test 환경에서 Skip
  skipValidation:
    (process.env.NODE_ENV === 'production' && process.env.STANDALONE === '1') || process.env.NODE_ENV === 'test',
  server: {
    ACCESS_TOKEN_SECRET: z.string().default(nanoid(16)),
  },
  client: {
    NEXT_PUBLIC_URL: z.string().default('http://localhost:3000'),
  },
  // 서버 변수는 자동으로 처리, 클라이언트 변수는 명시
  experimental__runtimeEnv: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
});
