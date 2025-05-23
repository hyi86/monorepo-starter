import { intro, isCancel, log, outro, select, text } from '@clack/prompts';
import { colors } from '@monorepo-starter/utils/console';
import fastGlob from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';
import { runCommands } from '~/mod/command';
import { parseMarkdown } from '~/mod/markdown';

const dirname = import.meta.dirname;

// 현재 파일의 실행 경로를 프로젝트 루트로 변경
process.chdir(path.join(dirname, '../../..'));

// 마크다운 내용
let markdown = '';

// 명령어 체크
if (!process.argv[2]) {
  /**
   * 터미널 대화형 UI 실행
   * `pnpm dev`
   * `node dist/index.js` // after build
   */
  intro(`Start create package from markdown file with ${colors.green('tui')}`);
  const parentPath = path.join(dirname, '..', 'templates');
  const templateFiles = await fastGlob(`${parentPath}/**/*.md`, {
    onlyFiles: true,
  });

  const selectedTemplate = await select({
    message: 'Select a template',
    options: templateFiles.map((file) => ({
      value: file,
      label: path.basename(file),
    })),
  });

  if (isCancel(selectedTemplate)) {
    outro('No template selected');
    process.exit(0);
  }

  const selectedTemplateFilePath = String(selectedTemplate);
  markdown = fs.readFileSync(selectedTemplateFilePath, 'utf-8');

  log.info(`Selected template: ${colors.success(selectedTemplateFilePath)}`);
} else {
  /**
   * 명령어로 실행
   * `pnpm dev <template-path>`
   * `node dist/index.js <template-path>`
   */
  const templateFileName = process.argv[2];
  try {
    intro(`Start create package from markdown file with ${colors.green('cli')}`);
    const templateFilePath = path.join(dirname, '..', 'templates', templateFileName);
    fs.accessSync(templateFilePath, fs.constants.F_OK);
    markdown = fs.readFileSync(templateFilePath, 'utf-8');
    log.info(`Template file found: ${colors.success(templateFilePath)}`);
  } catch {
    outro(colors.error(`Template file not found: ${templateFileName}`));
    process.exit(0);
  }
}

// 패키지명 세팅
if (process.argv[3]) {
  const packageName = process.argv[3];
  markdown = markdown.replace('packageName: ""', `packageName: "${String(packageName)}"`);
} else {
  const packageName = await text({
    message: 'Enter package name',
    placeholder: 'package-name..',
  });

  if (isCancel(packageName)) {
    outro('No package name provided');
    process.exit(0);
  }

  markdown = markdown.replace('packageName: ""', `packageName: "${String(packageName)}"`);
}

// 실행
try {
  const commands = await parseMarkdown(markdown);
  await runCommands(commands);
  outro('Create package done.');
} catch (error) {
  log.error(`Error parsing markdown: ${colors.error(String(error))}`);
  process.exit(0);
}
