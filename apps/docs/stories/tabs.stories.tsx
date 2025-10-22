import { Tabs, TabsContent, TabsList, TabsTrigger } from '@monorepo-starter/ui/components/tabs';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultCheckbox: Story = {
  args: {
    defaultValue: '1',
  },
  render: function Render() {
    return (
      <div className="flex">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Make changes to your account here.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    );
  },
};
