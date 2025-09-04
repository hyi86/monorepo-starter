import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { Toggle } from '@monorepo-starter/ui/components/toggle';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { type Editor } from '@tiptap/react';
import { BanIcon, ChevronDownIcon, CircleIcon, PaletteIcon } from 'lucide-react';

const colors = {
  red: '#f94d4d',
  orange: '#e86d00',
  amber: '#e1a200',
  yellow: '#e1c200',
  lime: '#6fd100',
  green: '#00d100',
  emerald: '#00d15e',
  teal: '#00d1a3',
  cyan: '#009fe1',
  sky: '#006fd1',
  blue: '#0000d1',
  indigo: '#2e00d1',
  violet: '#4d00d1',
  purple: '#6d00e8',
  fuchsia: '#a300d1',
  pink: '#d1004d',
  rose: '#f94d9e',
  slate: '#475569',
  gray: '#4b5563',
  zinc: '#52525b',
  neutral: '#525252',
  stone: '#57534e',
};

export function TextColorBlock({ editor }: { editor: Editor }) {
  // color 토글
  const handleToggleColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  // unset color
  const handleUnsetColor = () => {
    editor.chain().focus().unsetColor().run();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Toggle
          size="sm"
          pressed={editor.isActive('textStyle')}
          className={cn(editor.isActive('textStyle') && 'bg-muted-foreground/10')}
        >
          <PaletteIcon className="size-4" />
          <ChevronDownIcon className="size-3 opacity-50" />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent align="start" side="bottom" sideOffset={1} alignOffset={-1}>
        {Object.entries(colors).map(([name, value]) => (
          <Toggle
            key={name}
            title={name}
            pressed={editor.isActive('textStyle', { color: value })}
            onPressedChange={() => handleToggleColor(value)}
          >
            <CircleIcon className="size-5" stroke={value} strokeWidth={1} fill={value} fillOpacity={0.5} />
          </Toggle>
        ))}
        <Toggle onPressedChange={handleUnsetColor}>
          <BanIcon className="size-5" />
        </Toggle>
      </PopoverContent>
    </Popover>
  );
}
