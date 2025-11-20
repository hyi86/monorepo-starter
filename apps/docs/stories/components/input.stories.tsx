import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { Label } from '@monorepo-starter/ui/components/label';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [
        'text',
        'file',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'search',
        'date',
        'time',
        'datetime-local',
        'month',
        'week',
      ],
    },
    placeholder: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const BasicInput: Story = {
  name: '기본 인풋',
  args: {
    type: 'text',
    placeholder: 'Input...',
  },
};

export const WithLabel: Story = {
  name: '라벨 있는 인풋',
  args: {
    type: 'text',
    placeholder: 'Input...',
  },
  render: function Render() {
    return (
      <>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
      </>
    );
  },
};

export const WithButton: Story = {
  name: '버튼 있는 인풋',
  args: {
    type: 'text',
    placeholder: 'Input...',
  },
  render: function Render() {
    return (
      <>
        <div className="flex w-full max-w-sm items-center gap-2">
          <Input type="email" placeholder="Email" />
          <Button type="submit" variant="outline">
            Subscribe
          </Button>
        </div>
      </>
    );
  },
};
