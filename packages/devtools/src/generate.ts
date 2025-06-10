import { devLog } from '@monorepo-starter/utils/console';
import { watch } from 'chokidar';
import path from 'node:path';
import { generate as generateTypedDictionaries } from './typed-i18n-dictionaries';
import { generate as generateTypedRoutes } from './typed-next-routes';

export async function run(rootPath: string, config: { watch: boolean; package: string }) {
  // 프로덕션 모드로 실행 (1회 실행)
  if (!config.watch) {
    devLog('process', 'Start generating... (Run in Once)');
    await Promise.all([
      generateTypedRoutes(path.join(rootPath, 'src/app-path-types.ts')),
      generateTypedDictionaries(path.join(rootPath, 'src/dictionaries')),
    ]);
    devLog('success', 'Generated all successfully');
    return;
  }

  // 파일 변경 감지 (chokidar)
  devLog('process', 'Start generating... (Watch Mode)');
  watch(['src/app', 'src/dictionaries'], {
    persistent: true,
    ignoreInitial: false,
    awaitWriteFinish: true,
    binaryInterval: 1500,
    interval: 1500,
  }).on('all', async (event, filePath) => {
    if (event === 'change') return;

    // 딕셔너리 생성
    if (filePath.includes('src/dictionaries')) {
      await generateTypedDictionaries(path.join(rootPath, 'src/dictionaries'));
    }

    // 라우트 생성
    if (
      filePath.includes('src/app') &&
      filePath.match(/\/(page|layout|loading|not-found|error|template)\.(ts|tsx|mdx)$/)
    ) {
      await generateTypedRoutes(path.join(rootPath, 'src/app-path-types.ts'));
    }
  });
  devLog('success', 'Generated all successfully');
}
