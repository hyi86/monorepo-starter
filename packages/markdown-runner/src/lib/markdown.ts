import { confirm, isCancel, log, outro } from '@clack/prompts';
import { colors } from '@monorepo-starter/utils/console';
import fs from 'node:fs';
import path from 'node:path';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import yaml from 'yaml';

/**
 * 마크다운 파일 파싱
 */
export async function parseMarkdown(markdown: string) {
  // Runnable commands
  const commands: Command[] = [];

  const file = await unified()
    .use(remarkParse) // Markdown -> MDAST
    .use(remarkFrontmatter, ['yaml']) // YAML frontmatter 인식
    .use(remarkStringify) // MDAST -> Markdown (stringify 예시용)
    .parse(markdown);

  let config: Record<string, string | boolean> = {
    packagePrefix: '',
    packageName: '',
  };

  // Parse frontmatter
  visit(file, 'yaml', (node) => {
    const data = yaml.parse(node.value);

    config = {
      ...config,
      ...data,
    };
  });

  // Validate config
  if (!config.packagePrefix || !config.packageName) {
    throw new Error('packagePrefix and packageName are required');
  }

  const rootPath = (config.rootPath as string) || process.cwd();

  // Validate packageName
  let isExistPackage = false;
  try {
    fs.accessSync(path.join(rootPath, 'packages', config.packageName as string), fs.constants.F_OK); // 존재만 확인
    isExistPackage = true;
  } catch {
    isExistPackage = false;
  }

  if (isExistPackage) {
    log.error(`Package ${colors.error(config.packageName as string)} already exists`);
    const isOverwrite = await confirm({
      message: 'Overwrite?',
      initialValue: false,
    });

    if (isCancel(isOverwrite)) {
      outro('Package creation canceled by user');
      process.exit(0);
    }

    if (!isOverwrite) {
      outro('Package creation canceled');
      process.exit(0);
    }
  }

  // Parse code blocks
  visit(file, 'code', (node) => {
    if (!node.lang || !node.value) {
      return;
    }

    if (node.lang === 'bash' || node.lang === 'sh') {
      const code = node.value
        .replace(/\$packagePrefix/g, config.packagePrefix as string)
        .replace(/\$packageName/g, config.packageName as string);

      code
        .split('\n')
        .filter((line) => line.trim() !== '' && !line.trim().startsWith('#'))
        .forEach((line) => {
          commands.push({
            commandType: 'bash',
            code: line,
          });
        });
      return;
    }

    const meta = parseMeta(node.meta ?? '');
    if (!meta.filename || meta.skip) {
      return;
    }

    if (node.lang === 'diff') {
      // TODO: 비교 명령어 추가
      return;
    }

    const code = node.value
      .replace(/\$packagePrefix/g, config.packagePrefix as string)
      .replace(/\$packageName/g, config.packageName as string);
    commands.push({
      commandType: 'file',
      filePath: path.join(rootPath, 'packages', config.packageName as string, meta.filename as string),
      code,
    });
  });

  return commands;
}

/**
 * Markdown 코드블록의 meta 문자열을 파싱하여 key-value 객체로 반환
 * 예: filename="eslint.config.mjs" linenos -> { filename: "eslint.config.mjs", linenos: true }
 */
export function parseMeta(meta?: string): Record<string, string | boolean> {
  if (!meta) return {};

  const result: Record<string, string | boolean> = {};

  // filename="example.js" 형식
  const regex = /(\w+)(?:="([^"]*)")?/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(meta)) !== null) {
    const [, key, value] = match;
    if (key) {
      result[key] = value ?? true;
    }
  }

  return result;
}
