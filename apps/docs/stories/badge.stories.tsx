import { Badge } from '@monorepo-starter/ui/components/badge';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BadgeCheckIcon } from 'lucide-react';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultBadge: Story = {
  args: {},
  render: function Render() {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full flex-wrap gap-2">
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <div className="flex w-full flex-wrap gap-2">
          <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">
            <BadgeCheckIcon />
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

export const BadgeWithLink: Story = {
  args: {
    variant: 'secondary',
    className: 'bg-blue-500 text-white dark:bg-blue-600',
  },
  render: function Render() {
    return (
      <div className="flex flex-col items-center gap-2">
        <Badge asChild>
          <a href="/">Badge</a>
        </Badge>
      </div>
    );
  },
};
