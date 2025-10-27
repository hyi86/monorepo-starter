import { Toggle } from '@monorepo-starter/ui/components/toggle';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MdBookmark } from 'react-icons/md';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultToggle: Story = {
  args: {
    'aria-label': 'Toggle bookmark',
    size: 'sm',
    variant: 'outline',
  },
  render: function Render() {
    return (
      <div className="flex gap-2">
        <Toggle
          aria-label="Toggle bookmark"
          size="sm"
          variant="outline"
          className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
        >
          <MdBookmark />
          Bookmark
        </Toggle>
      </div>
    );
  },
};
