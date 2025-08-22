'use client';

import { Sortable } from '@monorepo-starter/ui/blocks/dnd/sortable';
import { SortableItem } from '@monorepo-starter/ui/blocks/dnd/sortable-item';
import { ScrollArea, ScrollBar } from '@monorepo-starter/ui/components/scroll-area';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { useEffect, useState } from 'react';
import { generateRandomData } from '~/common/lib/faker-utils';

export default function ExampleDndSortableGridPage() {
  const [items, setItems] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const initialItems = generateRandomData(10, (index, generator) => ({
      id: `id-${index}`,
      name: generator.food.fruit(),
    }));

    setItems(initialItems);
  }, []);

  return (
    <div>
      <h1>Sortable Grid</h1>
      <ScrollArea className="size-150 rounded-md border border-stone-300 p-4 shadow-lg">
        <Sortable
          items={items}
          setItems={setItems}
          className="grid grid-cols-3 gap-3"
          disabled={false}
          isGrid
          mode="swap"
        >
          {({ item, isDragOverlay }) => (
            <SortableItem
              key={item.id}
              id={item.id}
              isDragOverlay={isDragOverlay}
              useGrip
              classNames={{
                base: cn(`p-2 border rounded-md shadow-sm truncate flex items-center whitespace-nowrap px-4 gap-2`),
              }}
            >
              {item.name}
            </SortableItem>
          )}
        </Sortable>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
