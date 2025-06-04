export type Primitive = null | undefined | string | number | boolean | symbol | bigint;
export type LiteralUnion<LiteralType, BaseType extends Primitive> = LiteralType | (BaseType & Record<never, never>);

export type StaticPath = '/';

export type TypedRoute = LiteralUnion<StaticPath, string>;

export type ComponentTreeJson = {
  type: 'Layout' | 'Template' | 'ErrorBoundary' | 'Suspense' | 'Page';
  path: string;
  fallback?: 'Error' | 'NotFound' | 'Loading';
  children?: ComponentTreeJson[];
};

export type AppPathRoutes = {
  href: string | null;
  linkTypes: string;
  fileName: string;
  fileNames?: string[];
  componentTreeJson: ComponentTreeJson | null;
};
