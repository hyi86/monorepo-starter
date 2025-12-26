import { Badge } from '@monorepo-starter/ui/components/badge';
import { Spinner } from '@monorepo-starter/ui/components/spinner';

export function SpinnerBadge() {
  return (
    <div className="flex items-center gap-2">
      <Badge>
        <Spinner />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner />
        Loading
      </Badge>
    </div>
  );
}
