import { kebabCase } from 'change-case';
import { appPathRoutes } from '~/app-path-types';

export function getAllRoutes() {
  const allRoutes = appPathRoutes
    .filter((item) => !item.isDynamicRoute && !item.isParallelRoute)
    .map((item) => {
      const pathList = item.href.split('/').filter(Boolean);

      let name = '';
      if (pathList.length === 0) {
        name = 'home';
      } else {
        name = pathList.map((path) => kebabCase(path)).join('/');
      }

      return {
        name,
        path: item.href,
      };
    });

  return allRoutes;
}
