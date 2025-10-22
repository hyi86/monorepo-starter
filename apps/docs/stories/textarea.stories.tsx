import { Textarea } from '@monorepo-starter/ui/components/textarea';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultTextarea: Story = {
  args: {
    placeholder: 'Tell us a little bit about yourself',
  },
  render: function Render(args) {
    return (
      <div className="">
        <Textarea placeholder={args.placeholder} />
      </div>
    );
  },
};
