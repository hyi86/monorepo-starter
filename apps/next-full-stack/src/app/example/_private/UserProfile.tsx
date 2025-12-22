import { Avatar, AvatarFallback } from '@monorepo-starter/ui/components/avatar';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { UserRoundIcon } from 'lucide-react';
import type { AuthorizationPayload } from '~/shared/lib/auth/check-auth';

export function UserProfile({ payload }: { payload?: AuthorizationPayload }) {
  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarFallback className={cn(payload ? 'bg-blue-300 text-blue-900' : 'bg-gray-300')}>
          {payload ? (
            payload.sub?.charAt(0).toUpperCase()
          ) : (
            <UserRoundIcon size={16} className="opacity-60" aria-hidden="true" />
          )}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="text-foreground/70 truncate font-semibold">{payload ? payload.sub : 'Guest'}</span>
        {payload && <span className="truncate text-xs">test@gmail.com</span>}
      </div>
    </>
  );
}
