import { Badge } from '@monorepo-starter/ui/components/badge';
import { cn } from '@monorepo-starter/ui/lib/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MdCheckCircleOutline, MdClose, MdLink } from 'react-icons/md';

type BadgeProps = React.ComponentProps<typeof Badge> & {
  withIcon?: boolean;
  useLink?: boolean;
};

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
    variant: {
      control: 'radio',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
    withIcon: {
      control: 'boolean',
    },
  },
} satisfies Meta<BadgeProps>;

export default meta;

type Story = StoryObj<typeof meta> & {
  args?: BadgeProps;
};

export const BasicBadge = {
  args: {
    children: 'Badge',
  },
  render: function Render({ withIcon, ...args }: BadgeProps) {
    if (withIcon) {
      return (
        <Badge {...args}>
          <MdCheckCircleOutline />
          {args.children}
        </Badge>
      );
    }

    return <Badge {...args} />;
  },
} satisfies Story;

export const BadgeNumbers = {
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    // @ts-ignore
    withIcon: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    variant: 'default',
  },
  render: function Render({ ...args }: BadgeProps) {
    return (
      <div className="flex gap-2 font-mono">
        <Badge {...args}>0</Badge>
        <Badge {...args}>10</Badge>
        <Badge {...args}>100</Badge>
        <Badge {...args}>999+</Badge>
      </div>
    );
  },
} satisfies Story;

export const BadgeLinks = {
  args: {
    children: 'Link Badge',
    variant: 'default',
  },
  render: function Render({ ...args }: BadgeProps) {
    return (
      <Badge {...args} asChild>
        <a href="/">
          {args.withIcon && <MdLink />}
          {args.children}
        </a>
      </Badge>
    );
  },
} satisfies Story;

export const BadgeRemovable = {
  args: {
    children: 'Removable Badge',
    variant: 'default',
  },
  render: function Render({ ...args }: BadgeProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Badge className={cn('cursor-pointer', isOpen && 'hidden')} {...args} onClick={() => setIsOpen(!isOpen)}>
        {args.children}
        <MdClose aria-hidden="true" />
      </Badge>
    );
  },
} satisfies Story;
