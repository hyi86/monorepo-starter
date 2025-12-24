import { FilterXIcon } from 'lucide-react';
import React, { memo } from 'react';
import { Button } from '../ui/button.tsx';
import { cn } from '../ui/utils.tsx';

import type { DataTableFilterActions } from '../filter-package';

interface FilterActionsProps {
  hasFilters: boolean;
  actions?: DataTableFilterActions;
}

export const FilterActions = memo(__FilterActions);
function __FilterActions({ hasFilters, actions }: FilterActionsProps) {
  return (
    <Button
      className={cn('text-muted-foreground h-7 px-2 font-normal', !hasFilters && 'hidden')}
      variant="ghost"
      onClick={actions?.removeAllFilters}
    >
      clear
    </Button>
  );
}
