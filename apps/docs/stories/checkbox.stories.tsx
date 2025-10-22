import { Checkbox } from '@monorepo-starter/ui/components/checkbox';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultCheckbox: Story = {
  storyName: '기본 체크박스',
  args: {
    checked: false,
  },
  render: function Render() {
    return (
      <div className="flex gap-2">
        <Checkbox checked={true} />
        <Checkbox checked={false} />
        <Checkbox checked={'indeterminate'} />
      </div>
    );
  },
};
