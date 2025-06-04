import { spawn } from 'node:child_process';
import { expect, test } from 'vitest';

test('프로그램 명령어로 실행', async () => {
  const cli = spawn('tsx', ['src/index.ts', 'apps/vanilla-ts'], {
    cwd: process.cwd(),
    stdio: 'pipe',
  });

  let output = '';
  cli.stdout.setEncoding('utf8');
  cli.stdout.on('data', (data) => {
    output += data.toString();
  });

  await new Promise<void>((resolve) => {
    cli.on('close', () => resolve());
  });

  const lines = output.split('\n');
  console.log(lines);

  expect(lines).toBeDefined();
});
