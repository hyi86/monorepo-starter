import { Badge } from '@monorepo-starter/ui/components/badge';
import { Button } from '@monorepo-starter/ui/components/button';
import { cn } from '@monorepo-starter/ui/lib/utils';

export default function PopoverPage() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">
        Popover Demo <Badge>Stable Web API</Badge>
      </h1>

      {/* Manual Popover - 백드롭 클릭해도 닫히지 않음 */}
      <div className="space-y-2">
        <Button popoverTarget="popover-1" variant="outline">
          수동 제어 Popover (백드롭 클릭해도 닫히지 않음, ESC 키로 닫히지 않음)
        </Button>
        <div id="popover-1" popover="manual" className={cn('bg-foreground/70 size-full backdrop:backdrop-blur-xs')}>
          <div className="bg-background fixed top-1/2 left-1/2 flex size-100 -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded border p-4">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
            <Button popoverTarget="popover-1" popoverTargetAction="hide" className="mt-auto">
              Close
            </Button>
            <Button popoverTarget="popover-2" popoverTargetAction="toggle">
              Popover 안에 수동 제어 Popover
            </Button>
          </div>
        </div>
      </div>

      {/* Manual Popover in Manual Popover */}
      <div
        id="popover-2"
        popover="manual"
        className={cn('bg-foreground/70 size-full backdrop:backdrop-blur-xs starting:open:opacity-0')}
      >
        <div className="bg-background fixed top-1/2 left-1/2 flex size-60 -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded border p-4">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
          <Button popoverTarget="popover-2" popoverTargetAction="hide" className="mt-auto">
            Close
          </Button>
        </div>
      </div>

      {/* Auto Popover */}
      <div className="space-y-2">
        <Button popoverTarget="popover-3" variant="outline">
          기본 Popover (ESC 키로 닫힘, 백드롭 클릭하면 닫힘)
        </Button>
        <div id="popover-3" popover="auto">
          <div className={cn('bg-foreground/70 absolute size-full backdrop:backdrop-blur-xs')}>
            <div className="bg-background fixed top-1/2 left-1/2 flex size-100 -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded border p-4 shadow-2xl">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
              <Button popoverTarget="popover-3" popoverTargetAction="hide" className="mt-auto">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
