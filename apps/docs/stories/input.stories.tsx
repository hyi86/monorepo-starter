import { Input } from '@monorepo-starter/ui/components/input';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    // HTML input props
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
};

export default meta;

type Story = StoryObj<typeof Input>;

/**
 * [Story] Default input
 */
export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Input...',
  },
  render: function Render(args) {
    return <Input {...args} />;
  },
};
