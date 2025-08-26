/**
 * CLI
 *
 * @example
 * ./bin/index.js
 */
import path from 'node:path';

// Run
await main();

export async function main() {
  // 현재 파일의 실행 경로를 프로젝트 루트로 변경
  process.chdir(path.join(import.meta.dirname, '../../..'));
  console.log('Hello, World!');
}
