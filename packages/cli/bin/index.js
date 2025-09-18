#!/usr/bin/env node
import path from 'path';

await main();
async function main() {
  process.chdir(path.join(import.meta.dirname, '../../..'));
  console.log('Hello, World!');
}

export { main };
