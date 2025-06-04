import { intro, isCancel, log, outro, select, text } from '@clack/prompts';
import { colors } from '@monorepo-starter/utils/console';
import fastGlob from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';
import { runCommands } from '~/lib/command';
import { parseMarkdown } from '~/lib/markdown';

/**
 * 터미널 대화형 UI 실행
 */
export async function runTernimalUI() {
  const dirname = import.meta.dirname;
  let markdown = '';

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

  const packageName = await text({
    message: 'Enter package name',
    placeholder: 'package-name..',
  });

  if (isCancel(packageName)) {
    outro('No package name provided');
    process.exit(0);
  }

  markdown = markdown.replace('packageName: ""', `packageName: "${String(packageName)}"`);

  const commands = await parseMarkdown(markdown);
  await runCommands(commands);
  outro('Create package done.');
}
