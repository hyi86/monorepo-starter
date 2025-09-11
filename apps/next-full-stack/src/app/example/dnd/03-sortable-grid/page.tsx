'use client';

import { faker } from '@faker-js/faker/locale/ko';
import { Sortable } from '@monorepo-starter/ui/blocks/dnd/sortable';
import { SortableItem } from '@monorepo-starter/ui/blocks/dnd/sortable-item';
import { ScrollArea, ScrollBar } from '@monorepo-starter/ui/components/scroll-area';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { useEffect, useState } from 'react';

export default function ExampleDndSortableGridPage() {
  const [items, setItems] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const initialItems = Array.from({ length: 10 }).map((_, index) => ({
      id: `id-${index}`,
      name: faker.food.fruit(),
    }));

    setItems(initialItems);
  }, []);

  return (
    <div>
      <h1>Sortable Grid</h1>
      <ScrollArea className="h-120 w-140 rounded-md border border-stone-300 p-4 shadow-lg">
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
                base: cn(`p-2 border rounded-md shadow-sm px-4 gap-2 flex items-center`),
                content: cn(`w-full truncate`),
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
