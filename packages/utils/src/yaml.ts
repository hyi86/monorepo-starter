import fs from 'node:fs';
import { parse } from 'yaml';

export function parseYaml(filePath: string) {
  return parse(fs.readFileSync(filePath, 'utf-8'));
}
