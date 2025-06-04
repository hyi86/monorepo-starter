import { devLog } from '@monorepo-starter/utils/console';
import { generate as generateDictionaries } from './lib/create-dictionaries';
import { generate as generateRouteTypes } from './lib/create-typed-routes';

const appPathFilename = 'src/app-path-types.ts';
const dictionariesFilename = 'src/dictionaries';

export const generateAll = async () => {
  devLog('process', 'Generating all...');
  await Promise.all([generateRouteTypes(appPathFilename), generateDictionaries(dictionariesFilename)]);
  devLog('success', 'Generated all successfully');
};
