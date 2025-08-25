// NOTE: This file should not be edited
export type Primitive = null | undefined | string | number | boolean | symbol | bigint;
export type LiteralUnion<LiteralType, BaseType extends Primitive> = LiteralType | (BaseType & Record<never, never>);

export type StaticPath =
  | '/'
  | '/example'
  | '/example/auth'
  | '/example/auth/protect'
  | '/example/auth/public'
  | '/example/cache'
  | '/example/cache/02-data-cache-time-based'
  | '/example/cache/03-data-cache-on-demand'
  | '/example/cache/04-full-route-disabled'
  | '/example/cache/05-full-route-force-static'
  | '/example/cache/06-full-route-time-based'
  | '/example/cache/07-isr'
  | '/example/cache/08-isr-force-static'
  | '/example/cache/09-isr-data-cache-revalidate'
  | '/example/code-block'
  | '/example/code-block/01-jsx'
  | '/example/code-block/02-html'
  | '/example/code-block/03-mdx'
  | '/example/code-block/04-editor'
  | '/example/db'
  | '/example/db/crud'
  | '/example/dnd'
  | '/example/dnd/01-sortable-vertical'
  | '/example/dnd/02-sortable-horizontal'
  | '/example/dnd/03-sortable-grid'
  | '/example/experimental'
  | '/example/experimental/api-cache'
  | '/example/experimental/file-upload'
  | '/example/form'
  | '/example/form/01-server-only'
  | '/example/form/02-client'
  | '/example/form/03-passing-args'
  | '/example/form/04-with-hook-form'
  | '/example/form/05-server-cookies'
  | '/example/form/06-events'
  | '/example/form/07-use-optimistic'
  | '/example/form/08-nested-list'
  | '/example/form/09-date-picker'
  | '/example/image-edit'
  | '/example/nuqs'
  | '/example/nuqs/01-client'
  | '/example/nuqs/02-server'
  | '/example/nuqs/03-complex'
  | '/example/push'
  | '/example/push/01-simple'
  | '/example/push/02-controls'
  | '/example/query'
  | '/example/query/prefetching'
  | '/example/query/straming'
  | '/example/route'
  | '/example/route/intercepting'
  | '/example/route/parallel'
  | '/example/route/parallel/login'
  | '/example/table'
  | '/example/table/01-server'
  | '/example/table/02-client'
  | '/example/tiptap/01-basic'
  | '/example/virtual'
  | '/example/virtual/01-fixed-row'
  | '/example/virtual/02-fixed-column'
  | '/example/virtual/03-fixed-grid'
  | '/example/virtual/04-fixed-masonry-v'
  | '/example/virtual/05-fixed-masonry-h'
  | '/example/virtual/06-dynamic-row'
  | '/example/virtual/07-dynamic-column'
  | '/example/virtual/08-dynamic-grid'
  | '/example/virtual/09-infinite-scroll'
  | '/example/virtual/10-sortable-row'
  | '/example/virtual/11-sortable-column'
  | '/example/virtual/12-with-parallel-route'
  | '/signin';

export type TypedRoute = LiteralUnion<
  StaticPath,
  | '/example/${string}'
  | '/example/${string}/${string}'
  | '/example/cache/07-isr/${string}'
  | '/example/cache/08-isr-force-static/${string}'
  | '/example/cache/09-isr-data-cache-revalidate/${string}'
  | '/example/route/intercepting/photo/${string}'
  | '/example/virtual/12-with-parallel-route/${string}'
>;

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

export const appPathRoutes: AppPathRoutes[] = [
  {
    href: '/',
    linkTypes: '/',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/example',
    linkTypes: '/example',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/page.tsx',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/[lang]',
    linkTypes: '/example/${string}',
    isParallelRoute: false,
    isDynamicRoute: true,
    files: ['src/app/example/[lang]/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/[lang]/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/[lang]/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/[lang]/[num]',
    linkTypes: '/example/${string}/${string}',
    isParallelRoute: false,
    isDynamicRoute: true,
    files: ['src/app/example/[lang]/[num]/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/[lang]/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/[lang]/[num]/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/auth',
    linkTypes: '/example/auth',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/auth/page.mdx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/auth/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/auth/page.mdx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/auth/protect',
    linkTypes: '/example/auth/protect',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/auth/protect/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/auth/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/auth/protect/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/auth/public',
    linkTypes: '/example/auth/public',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/auth/public/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/auth/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/auth/public/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/cache',
    linkTypes: '/example/cache',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/cache/page.mdx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/cache/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/cache/page.mdx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/cache/02-data-cache-time-based',
    linkTypes: '/example/cache/02-data-cache-time-based',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/cache/02-data-cache-time-based/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/cache/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/cache/02-data-cache-time-based/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/cache/03-data-cache-on-demand',
    linkTypes: '/example/cache/03-data-cache-on-demand',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/cache/03-data-cache-on-demand/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/cache/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/cache/03-data-cache-on-demand/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/cache/04-full-route-disabled',
    linkTypes: '/example/cache/04-full-route-disabled',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/cache/04-full-route-disabled/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/cache/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/cache/04-full-route-disabled/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/cache/05-full-route-force-static',
    linkTypes: '/example/cache/05-full-route-force-static',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/cache/05-full-route-force-static/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/cache/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/cache/05-full-route-force-static/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/cache/06-full-route-time-based',
    linkTypes: '/example/cache/06-full-route-time-based',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/cache/06-full-route-time-based/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/cache/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/cache/06-full-route-time-based/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/cache/07-isr',
    linkTypes: '/example/cache/07-isr',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/cache/07-isr/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/cache/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/cache/07-isr/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/cache/07-isr/[id]',
    linkTypes: '/example/cache/07-isr/${string}',
    isParallelRoute: false,
    isDynamicRoute: true,
    files: ['src/app/example/cache/07-isr/[id]/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/cache/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/cache/07-isr/[id]/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/cache/08-isr-force-static',
    linkTypes: '/example/cache/08-isr-force-static',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/cache/08-isr-force-static/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/cache/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/cache/08-isr-force-static/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/cache/08-isr-force-static/[id]',
    linkTypes: '/example/cache/08-isr-force-static/${string}',
    isParallelRoute: false,
    isDynamicRoute: true,
    files: ['src/app/example/cache/08-isr-force-static/[id]/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/cache/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/cache/08-isr-force-static/[id]/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/cache/09-isr-data-cache-revalidate',
    linkTypes: '/example/cache/09-isr-data-cache-revalidate',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/cache/09-isr-data-cache-revalidate/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/cache/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/cache/09-isr-data-cache-revalidate/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/cache/09-isr-data-cache-revalidate/[id]',
    linkTypes: '/example/cache/09-isr-data-cache-revalidate/${string}',
    isParallelRoute: false,
    isDynamicRoute: true,
    files: ['src/app/example/cache/09-isr-data-cache-revalidate/[id]/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/cache/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/cache/09-isr-data-cache-revalidate/[id]/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/code-block',
    linkTypes: '/example/code-block',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/code-block/page.mdx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/code-block/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/code-block/page.mdx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/code-block/01-jsx',
    linkTypes: '/example/code-block/01-jsx',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/code-block/01-jsx/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/code-block/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/code-block/01-jsx/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/code-block/02-html',
    linkTypes: '/example/code-block/02-html',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/code-block/02-html/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/code-block/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/code-block/02-html/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/code-block/03-mdx',
    linkTypes: '/example/code-block/03-mdx',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/code-block/03-mdx/page.mdx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/code-block/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/code-block/03-mdx/page.mdx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/code-block/04-editor',
    linkTypes: '/example/code-block/04-editor',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/code-block/04-editor/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/code-block/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/code-block/04-editor/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/db',
    linkTypes: '/example/db',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/db/page.mdx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/db/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/db/page.mdx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/db/crud',
    linkTypes: '/example/db/crud',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/db/crud/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/db/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/db/crud/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/dnd',
    linkTypes: '/example/dnd',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/dnd/page.mdx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/dnd/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/dnd/page.mdx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/dnd/01-sortable-vertical',
    linkTypes: '/example/dnd/01-sortable-vertical',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/dnd/01-sortable-vertical/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/dnd/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/dnd/01-sortable-vertical/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/dnd/02-sortable-horizontal',
    linkTypes: '/example/dnd/02-sortable-horizontal',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/dnd/02-sortable-horizontal/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/dnd/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/dnd/02-sortable-horizontal/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/dnd/03-sortable-grid',
    linkTypes: '/example/dnd/03-sortable-grid',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/dnd/03-sortable-grid/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/dnd/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/dnd/03-sortable-grid/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/experimental',
    linkTypes: '/example/experimental',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/experimental/page.mdx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/experimental/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/experimental/page.mdx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/experimental/api-cache',
    linkTypes: '/example/experimental/api-cache',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/experimental/api-cache/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/experimental/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/experimental/api-cache/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/experimental/file-upload',
    linkTypes: '/example/experimental/file-upload',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/experimental/file-upload/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/experimental/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/experimental/file-upload/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/form',
    linkTypes: '/example/form',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/form/page.mdx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/form/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/form/page.mdx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/form/01-server-only',
    linkTypes: '/example/form/01-server-only',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/form/01-server-only/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/form/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/form/01-server-only/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/form/02-client',
    linkTypes: '/example/form/02-client',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/form/02-client/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/form/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/form/02-client/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/form/03-passing-args',
    linkTypes: '/example/form/03-passing-args',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/form/03-passing-args/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/form/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/form/03-passing-args/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/form/04-with-hook-form',
    linkTypes: '/example/form/04-with-hook-form',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/form/04-with-hook-form/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/form/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/form/04-with-hook-form/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/form/05-server-cookies',
    linkTypes: '/example/form/05-server-cookies',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/form/05-server-cookies/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/form/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/form/05-server-cookies/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/form/06-events',
    linkTypes: '/example/form/06-events',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/form/06-events/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/form/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/form/06-events/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/form/07-use-optimistic',
    linkTypes: '/example/form/07-use-optimistic',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/form/07-use-optimistic/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/form/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/form/07-use-optimistic/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/form/08-nested-list',
    linkTypes: '/example/form/08-nested-list',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/form/08-nested-list/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/form/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/form/08-nested-list/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/form/09-date-picker',
    linkTypes: '/example/form/09-date-picker',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/form/09-date-picker/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/form/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/form/09-date-picker/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/image-edit',
    linkTypes: '/example/image-edit',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/image-edit/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/image-edit/page.tsx',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/nuqs',
    linkTypes: '/example/nuqs',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/nuqs/page.mdx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/nuqs/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/nuqs/page.mdx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/nuqs/01-client',
    linkTypes: '/example/nuqs/01-client',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/nuqs/01-client/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/nuqs/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/nuqs/01-client/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/nuqs/02-server',
    linkTypes: '/example/nuqs/02-server',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/nuqs/02-server/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/nuqs/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/nuqs/02-server/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/nuqs/03-complex',
    linkTypes: '/example/nuqs/03-complex',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/nuqs/03-complex/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/nuqs/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/nuqs/03-complex/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/push',
    linkTypes: '/example/push',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/push/page.mdx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/push/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/push/page.mdx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/push/01-simple',
    linkTypes: '/example/push/01-simple',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/push/01-simple/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/push/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/push/01-simple/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/push/02-controls',
    linkTypes: '/example/push/02-controls',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/push/02-controls/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/push/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/push/02-controls/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/query',
    linkTypes: '/example/query',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/query/page.mdx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/query/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/query/page.mdx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/query/prefetching',
    linkTypes: '/example/query/prefetching',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/query/prefetching/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/query/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/query/prefetching/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/query/straming',
    linkTypes: '/example/query/straming',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/query/straming/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/query/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/query/straming/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/route',
    linkTypes: '/example/route',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/route/page.mdx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/route/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/route/page.mdx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/route/intercepting',
    linkTypes: '/example/route/intercepting',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/route/intercepting/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/route/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/route/intercepting/layout.tsx',
                    children: [
                      {
                        path: 'src/app/example/route/intercepting/page.tsx',
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/route/intercepting/photo/[id]',
    linkTypes: '/example/route/intercepting/photo/${string}',
    isParallelRoute: false,
    isDynamicRoute: true,
    files: ['src/app/example/route/intercepting/photo/[id]/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/route/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/route/intercepting/layout.tsx',
                    children: [
                      {
                        path: 'src/app/example/route/intercepting/photo/[id]/page.tsx',
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/route/parallel',
    linkTypes: '/example/route/parallel',
    isParallelRoute: true,
    isDynamicRoute: false,
    files: [
      'src/app/example/route/parallel/@comments/page.tsx',
      'src/app/example/route/parallel/@notifications/page.tsx',
      'src/app/example/route/parallel/@users/page.tsx',
    ],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/route/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/route/parallel/layout.tsx',
                    children: [
                      {
                        path: 'src/app/example/route/parallel/@comments/layout.tsx',
                        children: [
                          {
                            path: 'src/app/example/route/parallel/@comments/loading.tsx',
                            children: [
                              {
                                path: 'src/app/example/route/parallel/@comments/page.tsx',
                                children: [],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: 'src/app/example/route/parallel/@notifications/layout.tsx',
                        children: [
                          {
                            path: 'src/app/example/route/parallel/@notifications/loading.tsx',
                            children: [
                              {
                                path: 'src/app/example/route/parallel/@notifications/error.tsx',
                                children: [
                                  {
                                    path: 'src/app/example/route/parallel/@notifications/page.tsx',
                                    children: [],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: 'src/app/example/route/parallel/@users/layout.tsx',
                        children: [
                          {
                            path: 'src/app/example/route/parallel/@users/loading.tsx',
                            children: [
                              {
                                path: 'src/app/example/route/parallel/@users/page.tsx',
                                children: [],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/route/parallel/login',
    linkTypes: '/example/route/parallel/login',
    isParallelRoute: true,
    isDynamicRoute: false,
    files: ['src/app/example/route/parallel/@modal/login/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/route/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/route/parallel/layout.tsx',
                    children: [
                      {
                        path: 'src/app/example/route/parallel/@modal/login/page.tsx',
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/table',
    linkTypes: '/example/table',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/table/page.mdx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/table/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/table/page.mdx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/table/01-server',
    linkTypes: '/example/table/01-server',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/table/01-server/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/table/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/table/01-server/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/table/02-client',
    linkTypes: '/example/table/02-client',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/table/02-client/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/table/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/table/02-client/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/tiptap/01-basic',
    linkTypes: '/example/tiptap/01-basic',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/tiptap/01-basic/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/tiptap/01-basic/page.tsx',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/virtual',
    linkTypes: '/example/virtual',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/virtual/page.mdx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/virtual/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/virtual/page.mdx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/virtual/01-fixed-row',
    linkTypes: '/example/virtual/01-fixed-row',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/virtual/01-fixed-row/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/virtual/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/virtual/01-fixed-row/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/virtual/02-fixed-column',
    linkTypes: '/example/virtual/02-fixed-column',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/virtual/02-fixed-column/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/virtual/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/virtual/02-fixed-column/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/virtual/03-fixed-grid',
    linkTypes: '/example/virtual/03-fixed-grid',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/virtual/03-fixed-grid/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/virtual/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/virtual/03-fixed-grid/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/virtual/04-fixed-masonry-v',
    linkTypes: '/example/virtual/04-fixed-masonry-v',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/virtual/04-fixed-masonry-v/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/virtual/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/virtual/04-fixed-masonry-v/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/virtual/05-fixed-masonry-h',
    linkTypes: '/example/virtual/05-fixed-masonry-h',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/virtual/05-fixed-masonry-h/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/virtual/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/virtual/05-fixed-masonry-h/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/virtual/06-dynamic-row',
    linkTypes: '/example/virtual/06-dynamic-row',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/virtual/06-dynamic-row/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/virtual/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/virtual/06-dynamic-row/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/virtual/07-dynamic-column',
    linkTypes: '/example/virtual/07-dynamic-column',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/virtual/07-dynamic-column/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/virtual/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/virtual/07-dynamic-column/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/virtual/08-dynamic-grid',
    linkTypes: '/example/virtual/08-dynamic-grid',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/virtual/08-dynamic-grid/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/virtual/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/virtual/08-dynamic-grid/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/virtual/09-infinite-scroll',
    linkTypes: '/example/virtual/09-infinite-scroll',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/virtual/09-infinite-scroll/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/virtual/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/virtual/09-infinite-scroll/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/virtual/10-sortable-row',
    linkTypes: '/example/virtual/10-sortable-row',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/virtual/10-sortable-row/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/virtual/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/virtual/10-sortable-row/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/virtual/11-sortable-column',
    linkTypes: '/example/virtual/11-sortable-column',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/virtual/11-sortable-column/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/virtual/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/virtual/11-sortable-column/page.tsx',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/virtual/12-with-parallel-route',
    linkTypes: '/example/virtual/12-with-parallel-route',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: [
      'src/app/example/virtual/12-with-parallel-route/page.tsx',
      'src/app/example/virtual/12-with-parallel-route/@list/page.tsx',
    ],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/virtual/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/virtual/12-with-parallel-route/layout.tsx',
                    children: [
                      {
                        path: 'src/app/example/virtual/12-with-parallel-route/loading.tsx',
                        children: [
                          {
                            path: 'src/app/example/virtual/12-with-parallel-route/page.tsx',
                            children: [],
                          },
                          {
                            path: 'src/app/example/virtual/12-with-parallel-route/@list/loading.tsx',
                            children: [
                              {
                                path: 'src/app/example/virtual/12-with-parallel-route/@list/page.tsx',
                                children: [],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/virtual/12-with-parallel-route/[...slug]',
    linkTypes: '/example/virtual/12-with-parallel-route/${string}',
    isParallelRoute: true,
    isDynamicRoute: true,
    files: ['src/app/example/virtual/12-with-parallel-route/@detail/[...slug]/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/virtual/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/virtual/12-with-parallel-route/layout.tsx',
                    children: [
                      {
                        path: 'src/app/example/virtual/12-with-parallel-route/loading.tsx',
                        children: [
                          {
                            path: 'src/app/example/virtual/12-with-parallel-route/@detail/[...slug]/page.tsx',
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/signin',
    linkTypes: '/signin',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/signin/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/signin/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
];
