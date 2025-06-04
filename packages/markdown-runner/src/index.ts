import { log, outro } from '@clack/prompts';
import { colors, devLog } from '@monorepo-starter/utils/console';
import { Command } from 'commander';
import fs from 'node:fs';
import path from 'node:path';
import { z, ZodError } from 'zod';
import { runCommands } from '~/lib/command';
import { parseMarkdown } from '~/lib/markdown';
import { runTernimalUI } from './tui';

const dirname = import.meta.dirname;
const program = new Command();

const config = {
  template: '',
  packageName: '',
};

// 옵션 정의
program
  .name('markdown-runner')
  .description(colors.green('markdown-runner CLI')) // 설명
  .version('1.0.0') // 버전 정보
  .option('-t, --template <template>', 'select template') // 옵션
  .option('-p, --packageName <packageName>', 'select package name') // 옵션
  .parse();

// 타입 체크 정의
const schema = z.object({
  template: z.string().optional(),
  packageName: z.string().optional(),
});

// 옵션 파싱
try {
  const options = schema.parse(program.opts());
  config.template = options.template || '';
  config.packageName = options.packageName || '';
} catch (exception) {
  const error = exception as unknown as ZodError;
  error.errors.forEach((err) => {
    devLog('error', err.message);
  });
  process.exit(0);
}

// 터미널 대화형 UI 실행
if (!config.template && !config.packageName) {
  await runTernimalUI();
  process.exit(0);
}

// 템플릿 경로 체크
let markdown = '';

try {
  const templateFilePath = path.join(dirname, '../templates', config.template);
  fs.accessSync(templateFilePath, fs.constants.F_OK);
  markdown = fs.readFileSync(templateFilePath, 'utf-8');
  log.info(`Template file found: ${colors.success(templateFilePath)}`);
} catch {
  devLog('error', '템플릿 경로가 존재하지 않습니다');
  process.exit(0);
}

// 명령 실행
try {
  markdown = markdown.replace('packageName: ""', `packageName: "${String(config.packageName)}"`);
  const commands = await parseMarkdown(markdown);
  await runCommands(commands);
  outro('Create package done.');
} catch {
  devLog('error', '패키지명이 존재하지 않습니다');
  process.exit(0);
}
