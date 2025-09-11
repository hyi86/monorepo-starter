'use client';

import { faker } from '@faker-js/faker/locale/ko';
import { Sortable } from '@monorepo-starter/ui/blocks/dnd/sortable';
import { SortableItem } from '@monorepo-starter/ui/blocks/dnd/sortable-item';
import { ScrollArea, ScrollBar } from '@monorepo-starter/ui/components/scroll-area';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { useEffect, useState } from 'react';

export default function ExampleDndSortableHorizontalPage() {
  const [items, setItems] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const initialItems = Array.from({ length: 8 }).map((_, index) => ({
      id: `id-${index}`,
      name: faker.food.fruit(),
    }));

    setItems(initialItems);
  }, []);

  return (
    <div>
      <h1>Sortable Horizontal</h1>
      <ScrollArea className="w-2/3 rounded-md border border-stone-300 p-4 shadow-lg">
        <Sortable
          items={items}
          setItems={setItems}
          className="flex flex-nowrap gap-4"
          disabled={false}
          isHorizontal
          mode="swap"
        >
          {({ item, isDragOverlay }) => (
            <SortableItem
              isHorizontal
              key={item.id}
              id={item.id}
              isDragOverlay={isDragOverlay}
              useGrip
              classNames={{
                base: cn(`p-2 border rounded-md shadow-sm flex items-center whitespace-nowrap px-4 gap-2`),
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
