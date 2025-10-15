import { Button } from '@monorepo-starter/ui/components/button';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { MoreVerticalIcon } from 'lucide-react';
import { memo } from 'react';
import { initialEdges } from './schema-data';

export type TableField = {
  name: string;
  type: string;
  isPrimary?: boolean;
  isForeign?: boolean;
};

type TableNodeData = Record<string, unknown> & {
  label: string;
  fields: TableField[];
  selected?: boolean;
};

type TableNodeType = Node<TableNodeData, 'tableNode'>;

function TableNode({ data, id }: NodeProps<TableNodeType>) {
  // Find all source connections for this node
  const sourceConnections = initialEdges.filter((edge) => edge.source === id).map((edge) => edge.sourceHandle);

  // Find all target connections for this node
  const targetConnections = initialEdges.filter((edge) => edge.target === id).map((edge) => edge.targetHandle);

  return (
    <div
      className={cn(
        'bg-card w-66 rounded-xl font-mono shadow-[0_1px_1px_rgba(0,0,0,0.02),_0_2px_2px_rgba(0,0,0,0.02),_0_4px_4px_rgba(0,0,0,0.02),_0_8px_8px_rgba(0,0,0,0.02),_0_16px_16px_rgba(0,0,0,0.02),_0_32px_32px_rgba(0,0,0,0.02)]',
        data.selected ? 'ring-primary ring-2 ring-offset-2' : '',
      )}
    >
      <div className="border-border/80 from-background/70 dark:from-background/30 flex items-center justify-between border-b bg-gradient-to-t px-4 py-3">
        <div className="text-[13px]">
          <span className="text-muted-foreground/80">/</span> <span className="font-medium">{data.label}</span>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground/60 hover:text-muted-foreground -my-2 -me-2 shadow-none hover:bg-transparent"
          aria-label="Open edit menu"
        >
          <MoreVerticalIcon className="size-5" aria-hidden="true" />
        </Button>
      </div>
      <div className="py-2 text-xs">
        {data.fields.map((field: TableField) => (
          <div key={field.name} className="group relative px-4">
            <div className="flex items-center justify-between gap-2 border-dashed py-2 group-not-last:border-b">
              <span className="truncate font-medium">{field.name}</span>
              <span className="text-muted-foreground/60">{field.type}</span>

              {/* Field handles */}
              {((field.isPrimary && sourceConnections.includes(field.name)) ||
                (field.isForeign && targetConnections.includes(field.name))) && (
                <Handle
                  type={field.isPrimary ? 'source' : 'target'}
                  position={field.isPrimary ? Position.Left : Position.Right}
                  id={field.name}
                  className="bg-foreground! border-background size-2.5 rounded-full border-2"
                  isConnectable={false}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(TableNode);
