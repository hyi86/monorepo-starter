import { Label } from '@monorepo-starter/ui/components/label';
import { Switch } from '@monorepo-starter/ui/components/switch';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSwitch: Story = {
  args: {
    checked: false,
  },
  render: function Render() {
    return (
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    );
  },
};
