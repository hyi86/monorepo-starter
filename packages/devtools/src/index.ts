import { colors, devLog } from '@monorepo-starter/utils/console';
import { Command } from 'commander';
import fs from 'node:fs';
import path from 'node:path';
import { z, ZodError } from 'zod';
import { run } from './generate';

const projectRoot = path.join(import.meta.dirname, '../../..');
const program = new Command();

const config = {
  watch: false,
  package: '',
};

// 옵션 정의
program
  .name('devtools')
  .description(colors.green('devtools CLI')) // 설명
  .version('1.0.0') // 버전 정보
  .option('--watch', 'watch mode', false) // 옵션
  .option('-p, --package <package>', 'select packages') // 옵션
  .parse();

// 타입 체크 정의
const schema = z.object({
  watch: z.boolean().default(false),
  package: z.string({ message: '패키지명은 필수 입니다 --package <package>' }),
});

// 옵션 파싱
try {
  const options = schema.parse(program.opts());
  config.watch = options.watch;
  config.package = options.package;
} catch (exception) {
  const error = exception as unknown as ZodError;
  error.errors.forEach((err) => {
    devLog('error', err.message);
  });
  process.exit(0);
}

// 패키지 경로 체크
try {
  fs.accessSync(path.join(projectRoot, config.package), fs.constants.F_OK);
} catch {
  devLog('error', '패키지 경로가 존재하지 않습니다');
  process.exit(0);
}

// 패키지 경로 변경
process.chdir(path.join(projectRoot, config.package));

// generate
await run(process.cwd(), config);
