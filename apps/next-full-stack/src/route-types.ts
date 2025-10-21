// NOTE: This file should not be edited

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
    href: '/blocks',
    linkTypes: '/blocks',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/admin-menu-management',
    linkTypes: '/blocks/admin-menu-management',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/admin-menu-management/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/admin-menu-management/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/ag-grid',
    linkTypes: '/blocks/ag-grid',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/ag-grid/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/ag-grid/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/ag-grid/01-default',
    linkTypes: '/blocks/ag-grid/01-default',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/ag-grid/01-default/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/ag-grid/01-default/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/ag-grid/02-theme',
    linkTypes: '/blocks/ag-grid/02-theme',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/ag-grid/02-theme/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/ag-grid/02-theme/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/dashboard',
    linkTypes: '/blocks/dashboard',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/dashboard/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/dashboard/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/feature-management',
    linkTypes: '/blocks/feature-management',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/feature-management/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/feature-management/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/permission-management',
    linkTypes: '/blocks/permission-management',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/permission-management/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/permission-management/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/sidebar-01',
    linkTypes: '/blocks/sidebar-01',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/sidebar-01/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/sidebar-01/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/sidebar-02',
    linkTypes: '/blocks/sidebar-02',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/sidebar-02/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/sidebar-02/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/sidebar-03',
    linkTypes: '/blocks/sidebar-03',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/sidebar-03/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/sidebar-03/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/sidebar-04',
    linkTypes: '/blocks/sidebar-04',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/sidebar-04/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/sidebar-04/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/sidebar-07',
    linkTypes: '/blocks/sidebar-07',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/sidebar-07/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/sidebar-07/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/sidebar-09',
    linkTypes: '/blocks/sidebar-09',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/sidebar-09/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/sidebar-09/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/sidebar-10',
    linkTypes: '/blocks/sidebar-10',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/sidebar-10/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/sidebar-10/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/sidebar-13',
    linkTypes: '/blocks/sidebar-13',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/sidebar-13/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/sidebar-13/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/sidebar-15',
    linkTypes: '/blocks/sidebar-15',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/sidebar-15/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/sidebar-15/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/sidebar-16',
    linkTypes: '/blocks/sidebar-16',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/sidebar-16/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/sidebar-16/page.tsx',
            children: [],
          },
        ],
      },
    ],
  },
  {
    href: '/blocks/user-management',
    linkTypes: '/blocks/user-management',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/blocks/user-management/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/blocks/user-management/page.tsx',
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
    href: '/example/[...slug]',
    linkTypes: '/example/${string}',
    isParallelRoute: false,
    isDynamicRoute: true,
    files: ['src/app/example/[...slug]/page.tsx', 'src/app/example/[lang]/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/[...slug]/page.tsx',
                children: [],
              },
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
    href: '/example/code-block/05-preview',
    linkTypes: '/example/code-block/05-preview',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/code-block/05-preview/page.tsx'],
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
                    path: 'src/app/example/code-block/05-preview/page.tsx',
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
    href: '/example/db/browser',
    linkTypes: '/example/db/browser',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/db/browser/page.tsx'],
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
                    path: 'src/app/example/db/browser/page.tsx',
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
                    path: 'src/app/example/experimental/api-cache/loading.tsx',
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
    href: '/example/file-upload/01-basic',
    linkTypes: '/example/file-upload/01-basic',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/file-upload/01-basic/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/file-upload/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/file-upload/01-basic/page.tsx',
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
    href: '/example/file-upload/02-avatar-droppable',
    linkTypes: '/example/file-upload/02-avatar-droppable',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/file-upload/02-avatar-droppable/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/file-upload/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/file-upload/02-avatar-droppable/page.tsx',
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
    href: '/example/file-upload/03-drop-area-with-button',
    linkTypes: '/example/file-upload/03-drop-area-with-button',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/file-upload/03-drop-area-with-button/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/file-upload/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/file-upload/03-drop-area-with-button/page.tsx',
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
    href: '/example/file-upload/04-multiple-image',
    linkTypes: '/example/file-upload/04-multiple-image',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/file-upload/04-multiple-image/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/file-upload/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/file-upload/04-multiple-image/page.tsx',
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
    href: '/example/file-upload/05-multiple-table',
    linkTypes: '/example/file-upload/05-multiple-table',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/file-upload/05-multiple-table/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/file-upload/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/file-upload/05-multiple-table/page.tsx',
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
    href: '/example/file-upload/06-multiple-card',
    linkTypes: '/example/file-upload/06-multiple-card',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/file-upload/06-multiple-card/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/file-upload/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/file-upload/06-multiple-card/page.tsx',
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
    href: '/example/file-upload/08-multiple-progress-track',
    linkTypes: '/example/file-upload/08-multiple-progress-track',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/file-upload/08-multiple-progress-track/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/file-upload/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/file-upload/08-multiple-progress-track/page.tsx',
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
    href: '/example/filter',
    linkTypes: '/example/filter',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/filter/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/filter/page.tsx',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/floating/01-basic',
    linkTypes: '/example/floating/01-basic',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/floating/01-basic/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/floating/01-basic/page.tsx',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/floating/02-tooltip',
    linkTypes: '/example/floating/02-tooltip',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/floating/02-tooltip/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/floating/02-tooltip/page.tsx',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/floating/03-dropdown',
    linkTypes: '/example/floating/03-dropdown',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/floating/03-dropdown/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/floating/03-dropdown/page.tsx',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/floating/04-modal',
    linkTypes: '/example/floating/04-modal',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/floating/04-modal/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/floating/04-modal/page.tsx',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/floating/05-context-menu',
    linkTypes: '/example/floating/05-context-menu',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/floating/05-context-menu/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/floating/05-context-menu/page.tsx',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/floating/06-popover',
    linkTypes: '/example/floating/06-popover',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/floating/06-popover/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/floating/06-popover/page.tsx',
                children: [],
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
    href: '/example/form/09-form-controls',
    linkTypes: '/example/form/09-form-controls',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/form/09-form-controls/page.tsx'],
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
                    path: 'src/app/example/form/09-form-controls/page.tsx',
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
    href: '/example/form/10-checkboxes',
    linkTypes: '/example/form/10-checkboxes',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/form/10-checkboxes/page.tsx'],
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
                    path: 'src/app/example/form/10-checkboxes/page.tsx',
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
    href: '/example/form/11-grid-checkboxes',
    linkTypes: '/example/form/11-grid-checkboxes',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/form/11-grid-checkboxes/page.tsx'],
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
                    path: 'src/app/example/form/11-grid-checkboxes/page.tsx',
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
    href: '/example/image-edit/01-simple',
    linkTypes: '/example/image-edit/01-simple',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/image-edit/01-simple/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/image-edit/01-simple/page.tsx',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/interactive-ui/01-liquid-glass',
    linkTypes: '/example/interactive-ui/01-liquid-glass',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/interactive-ui/01-liquid-glass/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/interactive-ui/01-liquid-glass/page.tsx',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/modern-web',
    linkTypes: '/example/modern-web',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/modern-web/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/modern-web/page.tsx',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/modern-web/01-popover',
    linkTypes: '/example/modern-web/01-popover',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/modern-web/01-popover/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/modern-web/01-popover/page.tsx',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/modern-web/02-offset-path',
    linkTypes: '/example/modern-web/02-offset-path',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/modern-web/02-offset-path/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/modern-web/02-offset-path/page.tsx',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/modern-web/03-scrollbar',
    linkTypes: '/example/modern-web/03-scrollbar',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/modern-web/03-scrollbar/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/modern-web/03-scrollbar/page.tsx',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/example/modern-web/04-content-visibility',
    linkTypes: '/example/modern-web/04-content-visibility',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/modern-web/04-content-visibility/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/modern-web/04-content-visibility/page.tsx',
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
    href: '/example/tree/01-default',
    linkTypes: '/example/tree/01-default',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/tree/01-default/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/tree/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/tree/01-default/page.tsx',
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
    href: '/example/tree/02-controls',
    linkTypes: '/example/tree/02-controls',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/tree/02-controls/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/tree/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/tree/02-controls/page.tsx',
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
    href: '/example/tree/03-search',
    linkTypes: '/example/tree/03-search',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/tree/03-search/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/tree/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/tree/03-search/page.tsx',
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
    href: '/example/tree/04-checkbox',
    linkTypes: '/example/tree/04-checkbox',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/tree/04-checkbox/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/tree/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/tree/04-checkbox/page.tsx',
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
    href: '/example/tree/05-full',
    linkTypes: '/example/tree/05-full',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/tree/05-full/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/tree/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/tree/05-full/page.tsx',
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
    href: '/example/tree/06-menus',
    linkTypes: '/example/tree/06-menus',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/tree/06-menus/page.tsx'],
    structures: [
      {
        path: 'src/app/layout.tsx',
        children: [
          {
            path: 'src/app/example/layout.tsx',
            children: [
              {
                path: 'src/app/example/tree/layout.tsx',
                children: [
                  {
                    path: 'src/app/example/tree/06-menus/page.tsx',
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
                            path: 'src/app/example/virtual/12-with-parallel-route/@detail/[...slug]/loading.tsx',
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
    ],
  },
  {
    href: '/example/virtual/13-spreadsheet',
    linkTypes: '/example/virtual/13-spreadsheet',
    isParallelRoute: false,
    isDynamicRoute: false,
    files: ['src/app/example/virtual/13-spreadsheet/page.tsx'],
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
                    path: 'src/app/example/virtual/13-spreadsheet/page.tsx',
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
