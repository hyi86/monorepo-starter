import { log, spinner } from '@clack/prompts';
import { colors } from '@monorepo-starter/utils/console';
import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import util from 'node:util';

const execPromise = util.promisify(exec);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 명령어 실행
 */
export async function runCommands(commands: Command[]) {
  const running = spinner();
  log.info(`pwd: ${colors.dim(process.cwd())}`);
  running.start('Running commands...');

  let successCount = 0;
  for (const command of commands) {
    await delay(300);

    // 디렉토리 변경
    if (command.commandType === 'bash' && command.code.startsWith('cd ')) {
      process.chdir(command.code.slice(3).trim());
      running.message(`Changed directory: ${colors.info(process.cwd())}`);
      successCount++;
      continue;
    }

    // 명령어 실행
    if (command.commandType === 'bash') {
      await execPromise(command.code);
      running.message(`Executed: ${colors.info(command.code.slice(0, 100))}`);
      successCount++;
      continue;
    }

    // 디렉토리 + 파일 생성
    if (command.filePath) {
      fs.mkdirSync(path.dirname(command.filePath), { recursive: true });
      fs.writeFileSync(command.filePath, command.code);
      running.message(`Created: ${colors.info(command.filePath)}`);
      successCount++;
    }
  }
  running.stop(`All commands done! (${successCount}/${commands.length})`);
}
