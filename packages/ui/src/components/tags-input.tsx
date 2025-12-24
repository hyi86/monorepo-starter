import * as TagsInputPrimitive from '@diceui/tags-input';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { X } from 'lucide-react';
import type * as React from 'react';

function TagsInput({ className, ...props }: React.ComponentProps<typeof TagsInputPrimitive.Root>) {
  return (
    <TagsInputPrimitive.Root
      data-slot="tags-input"
      className={cn('flex w-[380px] flex-col gap-2', className)}
      {...props}
    />
  );
}

function TagsInputLabel({ className, ...props }: React.ComponentProps<typeof TagsInputPrimitive.Label>) {
  return (
    <TagsInputPrimitive.Label
      data-slot="tags-input-label"
      className={cn(
        'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  );
}

function TagsInputList({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="tags-input-list"
      className={cn(
        'border-input bg-background focus-within:ring-ring flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-md border px-3 py-2 text-sm focus-within:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

function TagsInputInput({ className, ...props }: React.ComponentProps<typeof TagsInputPrimitive.Input>) {
  return (
    <TagsInputPrimitive.Input
      data-slot="tags-input-input"
      className={cn(
        'placeholder:text-muted-foreground flex-1 bg-transparent outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

function TagsInputItem({ className, children, ...props }: React.ComponentProps<typeof TagsInputPrimitive.Item>) {
  return (
    <TagsInputPrimitive.Item
      data-slot="tags-input-item"
      className={cn(
        'data-editing:ring-ring [&[data-highlighted]:not([data-editing])]:bg-accent [&[data-highlighted]:not([data-editing])]:text-accent-foreground inline-flex max-w-[calc(100%-8px)] items-center gap-1.5 rounded border bg-transparent px-2.5 py-1 text-sm focus:outline-hidden data-disabled:cursor-not-allowed data-disabled:opacity-50 data-editable:select-none data-editing:bg-transparent data-editing:ring-1 [&:not([data-editing])]:pr-1.5',
        className,
      )}
      {...props}
    >
      <TagsInputPrimitive.ItemText className="truncate">{children}</TagsInputPrimitive.ItemText>
      <TagsInputPrimitive.ItemDelete className="ring-offset-background size-4 shrink-0 rounded-sm opacity-70 transition-opacity hover:opacity-100">
        <X className="size-3.5" />
      </TagsInputPrimitive.ItemDelete>
    </TagsInputPrimitive.Item>
  );
}

function TagsInputClear({ ...props }: React.ComponentProps<typeof TagsInputPrimitive.Clear>) {
  return <TagsInputPrimitive.Clear data-slot="tags-input-clear" {...props} />;
}

export { TagsInput, TagsInputClear, TagsInputInput, TagsInputItem, TagsInputLabel, TagsInputList };
