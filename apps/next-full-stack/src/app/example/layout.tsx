import { SidebarInset, SidebarProvider } from '@monorepo-starter/ui/components/sidebar';
import { buildTree } from '@monorepo-starter/utils/tree';
import { type Metadata } from 'next';
import { appPathRoutes } from '~/app-path-types';
import AppMainLayout from '~/components/example/app-main';
import AppSidebar from '~/components/example/app-sidebar';

export const metadata: Metadata = {
  title: 'Examples',
  description: 'Examples Page',
};

export default async function ExampleLayout({ children }: { children: React.ReactNode }) {
  const allSubRoutes = appPathRoutes
    .map((item) => item.href)
    .filter((route) => route !== null)
    .filter((route) => !route.includes('/['))
    .filter((route) => route.startsWith('/example/'));
  const routesTreeRoot = buildTree(allSubRoutes)[0];

  // 커스텀 라우트 직접 추가
  if (routesTreeRoot && routesTreeRoot.children) {
    routesTreeRoot.children.push({
      name: 'internationalization',
      path: '/example/[lang]',
      hasPath: false,
      children: [
        {
          name: 'Korean',
          path: '/example/ko',
          hasPath: true,
          children: [],
        },
        {
          name: 'English',
          path: '/example/en',
          hasPath: true,
          children: [],
        },
        {
          name: 'Chinese',
          path: '/example/cn',
          hasPath: true,
          children: [],
        },
      ],
    });
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <AppMainLayout>{children}</AppMainLayout>
      </SidebarInset>
    </SidebarProvider>
  );
}
