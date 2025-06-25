import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@monorepo-starter/ui/components/tooltip';

export function ButtonWithTooltip({ children, tooltip }: { children: React.ReactNode; tooltip: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
