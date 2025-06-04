import { devLog } from '@monorepo-starter/utils/console';
import FastGlob from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';
import type { UnknownRecord } from 'type-fest';
import { parse } from 'yaml';

export async function generate(filePath: string) {
  const dirname = path.dirname(filePath);

  try {
    fs.accessSync(filePath, fs.constants.F_OK); // 존재만 확인
  } catch {
    devLog('error', 'dictionaries.json 파일이 존재하지 않습니다');
    return;
  }

  const result: UnknownRecord = {};
  const yamlFiles = await FastGlob(`${filePath}/**/*.yaml`);

  for (const yamlFile of yamlFiles) {
    const lang = path.basename(yamlFile).replace(/(\.yaml)$/, '');
    const file = fs.readFileSync(yamlFile, 'utf-8');
    const data = parse(file);
    result[lang] = flattenObject(data);
  }

  const content = JSON.stringify(result, null, 2);
  fs.writeFileSync(`${dirname}/dictionaries.json`, content, 'utf-8');
}

function flattenObject(obj: Record<string, any>, prefix = '', res: Record<string, any> = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenObject(value, newKey, res);
    } else {
      res[newKey] = value;
    }
  }
  return res;
}
