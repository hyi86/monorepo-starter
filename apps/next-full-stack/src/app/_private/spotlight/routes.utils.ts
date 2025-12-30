import { appRoutes } from '~/routes';

export function getAllRoutes() {
  const allRoutes = appRoutes.map((item) => ({ name: item.name, path: item.path }));

  return allRoutes;
}
