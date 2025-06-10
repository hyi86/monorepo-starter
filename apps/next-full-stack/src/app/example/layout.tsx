import { SidebarInset, SidebarProvider } from '@monorepo-starter/ui/components/sidebar';
import { type Metadata } from 'next';
import AppMainLayout from '~/components/example/app-main';
import AppSidebar from '~/components/example/app-sidebar';

export const metadata: Metadata = {
  title: 'Examples',
  description: 'Examples Page',
};

export default async function ExampleLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <AppMainLayout>{children}</AppMainLayout>
      </SidebarInset>
    </SidebarProvider>
  );
}
