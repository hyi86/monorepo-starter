import { Badge } from '@monorepo-starter/ui/components/badge';
import { Button } from '@monorepo-starter/ui/components/button';
import { cn } from '@monorepo-starter/ui/lib/utils';

export default function PopoverPage() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">
        Popover Demo <Badge>Stable</Badge>
      </h1>

      {/* Manual Popover - 백드롭 클릭해도 닫히지 않음 */}
      <div className="space-y-2">
        <Button popoverTarget="popover-1" variant="outline">
          수동 제어 Popover
        </Button>
        <div id="popover-1" popover="manual" className={cn('bg-foreground/70 backdrop:backdrop-blur-xs size-full')}>
          <div className="size-100 bg-background fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded border p-4">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
            <Button popoverTarget="popover-1" popoverTargetAction="hide" className="mt-auto">
              Close
            </Button>
            <Button popoverTarget="popover-2" popoverTargetAction="toggle">
              Toggle Popover 2
            </Button>
          </div>
        </div>
      </div>

      <div
        id="popover-2"
        popover="manual"
        className={cn('bg-foreground/70 backdrop:backdrop-blur-xs starting:open:opacity-0 size-full')}
      >
        <div className="bg-background fixed left-1/2 top-1/2 flex size-60 -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded border p-4">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
          <Button popoverTarget="popover-2" popoverTargetAction="hide" className="mt-auto">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
