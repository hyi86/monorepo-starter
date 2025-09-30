import {
  AppSidebar,
  CandlestickChart,
  ChartAreaInteractive,
  DataTable,
  SectionCards,
  SiteHeader,
} from '@monorepo-starter/ui/blocks/dashboard-main';
import { BigCalendar, CalendarProvider } from '@monorepo-starter/ui/blocks/event-calendar';
import { SchemaVisualizer } from '@monorepo-starter/ui/blocks/schema-visualizer';
import { SidebarInset, SidebarProvider } from '@monorepo-starter/ui/components/sidebar';
import data from './data.json';

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
              <div className="px-4 lg:px-6">
                <CandlestickChart />
              </div>
              <div className="px-4 lg:px-6">
                <CalendarProvider>
                  <BigCalendar />
                </CalendarProvider>
              </div> */}
              <div className="px-4 lg:px-6">
                <SchemaVisualizer />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
