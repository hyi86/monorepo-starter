import type { Route } from 'next';

export type AppRoutes = {
  name: string;
  path: Route | '/example/[...slug]' | '/example/[lang]/[num]' | '/example/virtual/12-with-parallel-route/[...slug]';
};

export const appRoutes: AppRoutes[] = [
  {
    name: 'home',
    path: '/',
  },
  {
    name: 'blocks',
    path: '/blocks',
  },
  {
    name: 'blocks/dashboard',
    path: '/blocks/dashboard',
  },
  {
    name: 'blocks/sidebar-01',
    path: '/blocks/sidebar-01',
  },
  {
    name: 'blocks/sidebar-02',
    path: '/blocks/sidebar-02',
  },
  {
    name: 'blocks/sidebar-03',
    path: '/blocks/sidebar-03',
  },
  {
    name: 'blocks/sidebar-04',
    path: '/blocks/sidebar-04',
  },
  {
    name: 'blocks/sidebar-07',
    path: '/blocks/sidebar-07',
  },
  {
    name: 'blocks/sidebar-09',
    path: '/blocks/sidebar-09',
  },
  {
    name: 'blocks/sidebar-10',
    path: '/blocks/sidebar-10',
  },
  {
    name: 'blocks/sidebar-13',
    path: '/blocks/sidebar-13',
  },
  {
    name: 'blocks/sidebar-15',
    path: '/blocks/sidebar-15',
  },
  {
    name: 'blocks/sidebar-16',
    path: '/blocks/sidebar-16',
  },
  {
    name: 'example',
    path: '/example',
  },
  {
    name: 'example/[...slug]',
    path: '/example/[...slug]',
  },
  {
    name: 'example/[lang]/[num]',
    path: '/example/[lang]/[num]',
  },
  {
    name: 'example/auth',
    path: '/example/auth',
  },
  {
    name: 'example/auth/protect',
    path: '/example/auth/protect',
  },
  {
    name: 'example/auth/public',
    path: '/example/auth/public',
  },
  {
    name: 'example/cache',
    path: '/example/cache',
  },
  {
    name: 'example/cache/01-use-cache',
    path: '/example/cache/01-use-cache',
  },
  {
    name: 'example/cache/02-react-cache',
    path: '/example/cache/02-react-cache',
  },
  {
    name: 'example/cache/03-unstable-cache',
    path: '/example/cache/03-unstable-cache',
  },
  {
    name: 'example/cache/04-fetch-cache',
    path: '/example/cache/04-fetch-cache',
  },
  {
    name: 'example/cache/05-revalidate',
    path: '/example/cache/05-revalidate',
  },
  {
    name: 'example/cache/06-request-memoization',
    path: '/example/cache/06-request-memoization',
  },
  {
    name: 'example/code-block',
    path: '/example/code-block',
  },
  {
    name: 'example/code-block/01-jsx',
    path: '/example/code-block/01-jsx',
  },
  {
    name: 'example/code-block/02-html',
    path: '/example/code-block/02-html',
  },
  {
    name: 'example/code-block/03-mdx',
    path: '/example/code-block/03-mdx',
  },
  {
    name: 'example/code-block/04-editor',
    path: '/example/code-block/04-editor',
  },
  {
    name: 'example/code-block/05-preview',
    path: '/example/code-block/05-preview',
  },
  {
    name: 'example/db',
    path: '/example/db',
  },
  {
    name: 'example/db/browser',
    path: '/example/db/browser',
  },
  {
    name: 'example/db/crud',
    path: '/example/db/crud',
  },
  {
    name: 'example/dnd',
    path: '/example/dnd',
  },
  {
    name: 'example/dnd/01-sortable-vertical',
    path: '/example/dnd/01-sortable-vertical',
  },
  {
    name: 'example/dnd/02-sortable-horizontal',
    path: '/example/dnd/02-sortable-horizontal',
  },
  {
    name: 'example/dnd/03-sortable-grid',
    path: '/example/dnd/03-sortable-grid',
  },
  {
    name: 'example/file-upload/01-basic',
    path: '/example/file-upload/01-basic',
  },
  {
    name: 'example/file-upload/02-avatar-droppable',
    path: '/example/file-upload/02-avatar-droppable',
  },
  {
    name: 'example/file-upload/03-drop-area-with-button',
    path: '/example/file-upload/03-drop-area-with-button',
  },
  {
    name: 'example/file-upload/04-multiple-image',
    path: '/example/file-upload/04-multiple-image',
  },
  {
    name: 'example/file-upload/05-multiple-table',
    path: '/example/file-upload/05-multiple-table',
  },
  {
    name: 'example/file-upload/06-multiple-card',
    path: '/example/file-upload/06-multiple-card',
  },
  {
    name: 'example/file-upload/08-multiple-progress-track',
    path: '/example/file-upload/08-multiple-progress-track',
  },
  {
    name: 'example/filter',
    path: '/example/filter',
  },
  {
    name: 'example/form',
    path: '/example/form',
  },
  {
    name: 'example/form/01-server-only',
    path: '/example/form/01-server-only',
  },
  {
    name: 'example/form/02-client',
    path: '/example/form/02-client',
  },
  {
    name: 'example/form/03-passing-args',
    path: '/example/form/03-passing-args',
  },
  {
    name: 'example/form/04-with-hook-form',
    path: '/example/form/04-with-hook-form',
  },
  {
    name: 'example/form/05-server-cookies',
    path: '/example/form/05-server-cookies',
  },
  {
    name: 'example/form/06-events',
    path: '/example/form/06-events',
  },
  {
    name: 'example/form/07-use-optimistic',
    path: '/example/form/07-use-optimistic',
  },
  {
    name: 'example/form/08-nested-list',
    path: '/example/form/08-nested-list',
  },
  {
    name: 'example/form/09-form-controls',
    path: '/example/form/09-form-controls',
  },
  {
    name: 'example/form/10-checkboxes',
    path: '/example/form/10-checkboxes',
  },
  {
    name: 'example/form/11-grid-checkboxes',
    path: '/example/form/11-grid-checkboxes',
  },
  {
    name: 'example/interactive-ui/01-liquid-glass',
    path: '/example/interactive-ui/01-liquid-glass',
  },
  {
    name: 'example/modern-web',
    path: '/example/modern-web',
  },
  {
    name: 'example/modern-web/01-popover',
    path: '/example/modern-web/01-popover',
  },
  {
    name: 'example/modern-web/02-offset-path',
    path: '/example/modern-web/02-offset-path',
  },
  {
    name: 'example/modern-web/03-scrollbar',
    path: '/example/modern-web/03-scrollbar',
  },
  {
    name: 'example/modern-web/04-content-visibility',
    path: '/example/modern-web/04-content-visibility',
  },
  {
    name: 'example/nuqs',
    path: '/example/nuqs',
  },
  {
    name: 'example/nuqs/01-client',
    path: '/example/nuqs/01-client',
  },
  {
    name: 'example/nuqs/02-server',
    path: '/example/nuqs/02-server',
  },
  {
    name: 'example/nuqs/03-complex',
    path: '/example/nuqs/03-complex',
  },
  {
    name: 'example/push',
    path: '/example/push',
  },
  {
    name: 'example/push/01-simple',
    path: '/example/push/01-simple',
  },
  {
    name: 'example/query',
    path: '/example/query',
  },
  {
    name: 'example/query/prefetching',
    path: '/example/query/prefetching',
  },
  {
    name: 'example/query/straming',
    path: '/example/query/straming',
  },
  {
    name: 'example/route/intercepting',
    path: '/example/route/intercepting',
  },
  {
    name: 'example/route/parallel',
    path: '/example/route/parallel',
  },
  {
    name: 'example/route/parallel/login',
    path: '/example/route/parallel/login',
  },
  {
    name: 'example/table',
    path: '/example/table',
  },
  {
    name: 'example/table/01-server',
    path: '/example/table/01-server',
  },
  {
    name: 'example/table/02-client',
    path: '/example/table/02-client',
  },
  {
    name: 'example/tree/01-default',
    path: '/example/tree/01-default',
  },
  {
    name: 'example/tree/02-controls',
    path: '/example/tree/02-controls',
  },
  {
    name: 'example/tree/03-search',
    path: '/example/tree/03-search',
  },
  {
    name: 'example/tree/04-checkbox',
    path: '/example/tree/04-checkbox',
  },
  {
    name: 'example/tree/05-full',
    path: '/example/tree/05-full',
  },
  {
    name: 'example/tree/06-menus',
    path: '/example/tree/06-menus',
  },
  {
    name: 'example/virtual',
    path: '/example/virtual',
  },
  {
    name: 'example/virtual/01-fixed-row',
    path: '/example/virtual/01-fixed-row',
  },
  {
    name: 'example/virtual/02-fixed-column',
    path: '/example/virtual/02-fixed-column',
  },
  {
    name: 'example/virtual/03-fixed-grid',
    path: '/example/virtual/03-fixed-grid',
  },
  {
    name: 'example/virtual/04-fixed-masonry-v',
    path: '/example/virtual/04-fixed-masonry-v',
  },
  {
    name: 'example/virtual/05-fixed-masonry-h',
    path: '/example/virtual/05-fixed-masonry-h',
  },
  {
    name: 'example/virtual/06-dynamic-row',
    path: '/example/virtual/06-dynamic-row',
  },
  {
    name: 'example/virtual/07-dynamic-column',
    path: '/example/virtual/07-dynamic-column',
  },
  {
    name: 'example/virtual/08-dynamic-grid',
    path: '/example/virtual/08-dynamic-grid',
  },
  {
    name: 'example/virtual/09-infinite-scroll',
    path: '/example/virtual/09-infinite-scroll',
  },
  {
    name: 'example/virtual/10-sortable-row',
    path: '/example/virtual/10-sortable-row',
  },
  {
    name: 'example/virtual/11-sortable-column',
    path: '/example/virtual/11-sortable-column',
  },
  {
    name: 'example/virtual/12-with-parallel-route',
    path: '/example/virtual/12-with-parallel-route',
  },
  {
    name: 'example/virtual/12-with-parallel-route/[...slug]',
    path: '/example/virtual/12-with-parallel-route/[...slug]',
  },
  {
    name: 'example/virtual/13-spreadsheet',
    path: '/example/virtual/13-spreadsheet',
  },
  {
    name: 'example/hangul',
    path: '/example/hangul',
  },
  {
    name: 'signin',
    path: '/signin',
  },
];
