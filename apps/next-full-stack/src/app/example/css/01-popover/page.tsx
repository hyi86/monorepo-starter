import { Button } from '@monorepo-starter/ui/components/button';

export default function PopoverPage() {
  return (
    <div>
      <Button popoverTarget="popover-1">Toggle1</Button>
      <Button popoverTarget="popover-2">Toggle2</Button>
      <div id="popover-1" popover="auto">
        <div>
          <h1>Hello</h1>
        </div>
      </div>
      <div id="popover-2" popover="auto">
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
