'use client';

import { Badge } from '@monorepo-starter/ui/components/badge';
import { Button } from '@monorepo-starter/ui/components/button';

export default function PopoverPage() {
  return (
    <div>
      <h1>
        Popover Demo <Badge>Stable</Badge>
      </h1>
      <Button popoverTarget="popover-1">Toggle1</Button>
      <Button popoverTarget="popover-2">Toggle2</Button>
      <div id="popover-1" popover="manual" className="size-1/2 opacity-0 backdrop:bg-black/50 open:opacity-100">
        <div>
          <h1>Hello</h1>
          <p>백드롭 클릭해도 닫히지 않습니다!</p>
          <Button onClick={() => document.getElementById('popover-1')?.hidePopover()}>닫기</Button>
        </div>
      </div>
      <div id="popover-2" popover="manual">
        <div>
          <h1>Hello2</h1>
        </div>
      </div>
      <details name="exclusive">
        <summary>Details</summary>
        Something small enough to escape casual notice.
      </details>
    </div>
  );
}
