import { Badge } from '@monorepo-starter/ui/components/badge';
import { Checkbox } from '@monorepo-starter/ui/components/checkbox';
import { cn } from '@monorepo-starter/ui/lib/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    asChild: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultBadge: Story = {
  name: '기본 뱃지',
  args: {},
  render: function Render() {
    return (
      <>
        <div className="flex flex-col items-center gap-2">
          <div className="flex w-full flex-wrap gap-2">
            <Badge>Badge Basic</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="outline" className="gap-1">
              <MdCheck className="text-emerald-500" size={12} aria-hidden="true" />
              Badge
            </Badge>
          </div>
          <div className="flex w-full flex-wrap gap-2">
            <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge>
            <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="destructive">
              99
            </Badge>
            <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="outline">
              20+
            </Badge>
          </div>
          <div className="flex w-full flex-wrap gap-2">
            <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">
              <MdCheck />
              Verified
            </Badge>
            <Badge variant="outline" className="gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
              Badge
            </Badge>
            <Badge variant="outline" className="gap-1.5">
              <span className="size-1.5 rounded-full bg-amber-500" aria-hidden="true"></span>
              Badge
            </Badge>
          </div>
        </div>
      </>
    );
  },
};

export const BadgeWithLink: Story = {
  name: '링크 뱃지',
  args: {},
  render: function Render() {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full flex-wrap gap-2">
          <Badge asChild>
            <a href="/">Badge</a>
          </Badge>
          <Badge variant="secondary" asChild>
            <a href="/">Secondary</a>
          </Badge>
          <Badge variant="destructive" asChild>
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
              Destructive
            </a>
          </Badge>
          <Badge variant="outline" asChild>
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
              Outline
            </a>
          </Badge>
        </div>
        <div className="flex w-full flex-wrap gap-2">
          <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">
            <MdCheck />
            Verified
          </Badge>
          <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge>
          <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="destructive">
            99
          </Badge>
          <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="outline">
            20+
          </Badge>
        </div>
      </div>
    );
  },
};

export const ExtendedBadge: Story = {
  name: '확장',
  args: {},
  render: function Render() {
    const [removed, setRemoved] = useState(false);

    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full flex-wrap gap-2">
          <Badge className="has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-data-[state=unchecked]:bg-muted has-data-[state=unchecked]:text-muted-foreground relative outline-none has-focus-visible:ring-[3px]">
            <Checkbox id="extended-badge-01" className="peer sr-only after:absolute after:inset-0" defaultChecked />
            <MdCheck size={12} className="hidden peer-data-[state=checked]:block" aria-hidden="true" />
            <label htmlFor="extended-badge-01" className="cursor-pointer select-none after:absolute after:inset-0">
              Selectable
            </label>
          </Badge>
          <Badge className={cn('cursor-pointer', removed && 'hidden')} onClick={() => setRemoved(!removed)}>
            Removable
            <MdClose size={12} aria-hidden="true" />
          </Badge>
        </div>
      </div>
    );
  },
};
