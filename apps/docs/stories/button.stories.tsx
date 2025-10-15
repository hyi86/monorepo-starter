import { Button } from '@monorepo-starter/ui/components/button';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    // HTML button props
    type: {
      control: { type: 'radio' },
      options: ['button', 'submit', 'reset'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    // Button component props
    variant: {
      control: { type: 'radio' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'radio' },
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
    },
    asChild: {
      control: { type: 'boolean' },
    },
    // Event handlers
    onClick: { action: 'clicked' },
    onMouseEnter: { action: 'mouseEnter' },
    onMouseLeave: { action: 'mouseLeave' },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

// export const AllVariants: Story = {
//   parameters: {
//     controls: { disable: true },
//     docs: {
//       codePanel: true,
//     },
//   },
//   render: () => (
//     <div className="space-y-4">
//       <div className="">
//         <h3 className="mb-2 text-xl font-bold">Button Variants</h3>
//         <div className="flex flex-wrap gap-2">
//           <Button variant="default">Default</Button>
//           <Button variant="destructive">Destructive</Button>
//           <Button variant="outline">Outline</Button>
//           <Button variant="secondary">Secondary</Button>
//           <Button variant="ghost">Ghost</Button>
//           <Button variant="link">Link</Button>
//         </div>
//       </div>

//       <div className="">
//         <h3 className="mb-4 text-xl font-bold">Button Sizes</h3>
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
//           <Button size="sm">Small</Button>
//           <Button size="default">Default</Button>
//           <Button size="lg">Large</Button>
//           <Button size="icon">🚀</Button>
//         </div>
//       </div>

//       <div className="">
//         <h3 className="mb-2 text-xl font-bold">Button States</h3>
//         <div className="flex flex-wrap gap-2">
//           <Button>Normal</Button>
//           <Button disabled>Disabled</Button>
//           <Button type="submit">Submit</Button>
//           <Button type="reset">Reset</Button>
//         </div>
//       </div>
//     </div>
//   ),
// };

export const Playground: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
    type: 'button',
    disabled: false,
    asChild: false,
    onClick: () => {},
  },
  parameters: {},
};
