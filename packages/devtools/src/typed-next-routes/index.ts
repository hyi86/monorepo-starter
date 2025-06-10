import fs from 'node:fs';
import { format } from 'prettier';
import { getRouteStructure } from './route-structure';

/**
 * 라우트 파일 목록 생성
 * `src/lib/experimental/routes/app-path-routes.ts` 생성
 * `src/lib/experimental/routes/types.ts` 파일 생성
 * (빌드 시, `.next/app-path-routes-manifest.json`에 파일이 생성됨)
 */
export async function generate(filePath: string) {
  const routeStructure = await getRouteStructure();
  routeStructure.sort((a, b) => a.href!.localeCompare(b.href!));

  const staticPaths = routeStructure.filter((item) => !item.isDynamicRoute).map((item) => item.linkTypes);
  const staticPathString = staticPaths.length > 0 ? staticPaths.map((path) => `'${path}'`).join(' | ') : '/';
  const dynamicPaths = routeStructure.filter((item) => item.isDynamicRoute).map((item) => item.linkTypes);
  const dynamicPathString = dynamicPaths.length > 0 ? dynamicPaths.map((path) => `'${path}'`).join(' | ') : 'string';

  const contents = `
  // NOTE: This file should not be edited
  export type Primitive = null | undefined | string | number | boolean | symbol | bigint;
  export type LiteralUnion<LiteralType, BaseType extends Primitive> = LiteralType | (BaseType & Record<never, never>);

  export type StaticPath = ${staticPathString};

  export type TypedRoute = LiteralUnion<StaticPath, ${dynamicPathString}>;

  export function getTypedPath(path: TypedRoute) {
    return path;
  }

  export type Structure = {
    path: string;
    children: Structure[];
  };

  export type AppPathRoutes = {
    href: string;
    linkTypes: string;
    isParallelRoute: boolean;
    isDynamicRoute: boolean;
    files: string[];
    structures: Structure[];
  };

  export const appPathRoutes: AppPathRoutes[] = ${JSON.stringify(routeStructure, null, 2)};
  `.trim();

  const formattedContents = await format(contents, {
    parser: 'typescript',
    printWidth: 120,
    singleQuote: true,
  });

  fs.writeFileSync(filePath, formattedContents, 'utf-8');
}
