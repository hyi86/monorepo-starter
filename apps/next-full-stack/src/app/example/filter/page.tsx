'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@monorepo-starter/ui/components/command';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { ListFilter } from 'lucide-react';
import { nanoid } from 'nanoid';
import * as React from 'react';
import Filters, {
  AnimateChangeInHeight,
  DueDate,
  Filter,
  FilterOperator,
  FilterOption,
  FilterType,
  filterViewOptions,
  filterViewToFilterOptions,
} from './filters';

export default function ExampleFilterPage() {
  const [open, setOpen] = React.useState(false);
  const [selectedView, setSelectedView] = React.useState<FilterType | null>(null);
  const [commandInput, setCommandInput] = React.useState('');
  const commandInputRef = React.useRef<HTMLInputElement>(null);
  const [filters, setFilters] = React.useState<Filter[]>([]);

  return (
    <div className="flex size-full items-center justify-center gap-2 bg-zinc-50">
      <Filters filters={filters} setFilters={setFilters} />
      {filters.filter((filter) => filter.value?.length > 0).length > 0 && (
        <Button
          variant="outline"
          size="sm"
          className="group h-6 items-center rounded-sm text-xs transition"
          onClick={() => setFilters([])}
        >
          Clear
        </Button>
      )}
      <Popover
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) {
            setTimeout(() => {
              setSelectedView(null);
              setCommandInput('');
            }, 200);
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            size="sm"
            className={cn(
              'group flex h-6 items-center gap-1.5 rounded-sm text-xs transition',
              filters.length > 0 && 'w-6',
            )}
          >
            <ListFilter className="text-muted-foreground group-hover:text-primary size-3 shrink-0 transition-all" />
            {!filters.length && 'Filter'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <AnimateChangeInHeight>
            <Command>
              <CommandInput
                placeholder={selectedView ? selectedView : 'Filter...'}
                className="h-9"
                value={commandInput}
                onInputCapture={(e) => {
                  setCommandInput(e.currentTarget.value);
                }}
                ref={commandInputRef}
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {selectedView ? (
                  <CommandGroup>
                    {filterViewToFilterOptions[selectedView].map((filter: FilterOption) => (
                      <CommandItem
                        className="text-muted-foreground group flex items-center gap-2"
                        key={filter.name}
                        value={filter.name}
                        onSelect={(currentValue) => {
                          setFilters((prev) => [
                            ...prev,
                            {
                              id: nanoid(),
                              type: selectedView,
                              operator:
                                selectedView === FilterType.DUE_DATE && currentValue !== DueDate.IN_THE_PAST
                                  ? FilterOperator.BEFORE
                                  : FilterOperator.IS,
                              value: [currentValue],
                            },
                          ]);
                          setTimeout(() => {
                            setSelectedView(null);
                            setCommandInput('');
                          }, 200);
                          setOpen(false);
                        }}
                      >
                        {filter.icon}
                        <span className="text-accent-foreground">{filter.name}</span>
                        {filter.label && <span className="text-muted-foreground ml-auto text-xs">{filter.label}</span>}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : (
                  filterViewOptions.map((group: FilterOption[], index: number) => (
                    <React.Fragment key={index}>
                      <CommandGroup>
                        {group.map((filter: FilterOption) => (
                          <CommandItem
                            className="text-muted-foreground group flex items-center gap-2"
                            key={filter.name}
                            value={filter.name}
                            onSelect={(currentValue) => {
                              setSelectedView(currentValue as FilterType);
                              setCommandInput('');
                              commandInputRef.current?.focus();
                            }}
                          >
                            {filter.icon}
                            <span className="text-accent-foreground">{filter.name}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      {index < filterViewOptions.length - 1 && <CommandSeparator />}
                    </React.Fragment>
                  ))
                )}
              </CommandList>
            </Command>
          </AnimateChangeInHeight>
        </PopoverContent>
      </Popover>
    </div>
  );
}
