'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { Level } from '@tiptap/extension-heading';
import { type Editor } from '@tiptap/react';
import { ChevronDownIcon, HeadingIcon } from 'lucide-react';

export function TextStylesBlock({ editor }: { editor: Editor }) {
  // Heading Dropdown Select
  const handleHeadingDropdownSelect = (level: Level) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  // Toggle Code Block
  const handleToggleCodeBlock = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <HeadingIcon className="size-4" />
          <ChevronDownIcon className="size-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" side="bottom" sideOffset={1} alignOffset={1} className="z-50 w-40">
        {[1, 2, 3, 4].map((level) => (
          <Button
            variant="ghost"
            key={level}
            onClick={() => {
              handleHeadingDropdownSelect(level as Level);
            }}
            className={cn(editor.isActive('heading', { level }) && 'bg-muted-foreground/10')}
          >
            {level === 1 && 'H1'}
            {level === 2 && 'H2'}
            {level === 3 && 'H3'}
            {level === 4 && 'H4'}
          </Button>
        ))}
        <Button variant="ghost" onClick={handleToggleCodeBlock}>
          Code Block
        </Button>
      </PopoverContent>
    </Popover>
  );
}
