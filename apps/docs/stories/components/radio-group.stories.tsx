import { Label } from '@monorepo-starter/ui/components/label';
import { RadioGroup, RadioGroupItem } from '@monorepo-starter/ui/components/radio-group';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultRadioGroup: Story = {
  args: {
    defaultValue: 'comfortable',
  },
  render: function Render() {
    return (
      <div className="flex gap-2">
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Compact</Label>
          </div>
        </RadioGroup>
      </div>
    );
  },
};
