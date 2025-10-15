'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import {
  Background,
  BackgroundVariant,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/base.css';
import { FullscreenIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { useCallback, useRef } from 'react';
import { initialEdges, initialNodes } from './schema-data';
import SchemaEdge from './schema-edge';
import TableNode from './table-node';

// Register custom node types and edge types
const nodeTypes = {
  tableNode: TableNode,
};

const edgeTypes = {
  custom: SchemaEdge,
};

function SchemaVisualizerInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  const onFitView = useCallback(() => {
    fitView({ padding: 0.2 });
  }, [fitView]);

  return (
    <main className="flex flex-1 items-stretch">
      <div className="h-120 w-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          minZoom={0.5}
          maxZoom={1}
          defaultEdgeOptions={{
            type: 'custom',
            className: 'opacity-25',
          }}
          style={
            {
              '--xy-background-pattern-dots-color-default': 'var(--color-border)',
              '--xy-edge-stroke-width-default': 1.5,
              '--xy-edge-stroke-default': 'var(--color-foreground)',
              '--xy-edge-stroke-selected-default': 'var(--color-foreground)',
              '--xy-attribution-background-color-default': 'transparent',
            } as React.CSSProperties
          }
          attributionPosition="bottom-left"
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={2} />

          <Panel position="bottom-right" className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground/80 hover:text-muted-foreground bg-card size-10 rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
              onClick={() => zoomIn()}
              aria-label="Zoom in"
            >
              <PlusIcon className="size-5" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground/80 hover:text-muted-foreground bg-card size-10 rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
              onClick={() => zoomOut()}
              aria-label="Zoom out"
            >
              <MinusIcon className="size-5" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground/80 hover:text-muted-foreground bg-card size-10 rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
              onClick={onFitView}
              aria-label="Fit view"
            >
              <FullscreenIcon className="size-5" aria-hidden="true" />
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </main>
  );
}

export function SchemaVisualizer() {
  return (
    <ReactFlowProvider>
      <SchemaVisualizerInner />
    </ReactFlowProvider>
  );
}
