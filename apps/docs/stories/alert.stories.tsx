import { Alert, AlertDescription, AlertTitle } from '@monorepo-starter/ui/components/alert';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MdBatteryChargingFull, MdConstruction, MdContactMail, MdContactPhone } from 'react-icons/md';

type AlertProps = React.ComponentProps<typeof Alert> & {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
};

const meta = {
  title: 'Components/Alert',
  component: Alert,
  subcomponents: {
    AlertTitle,
    AlertDescription,
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: ['default', 'destructive'],
    },
    title: {
      description: '(Test only)',
      control: 'text',
    },
    description: {
      description: '(Test only)',
      control: 'text',
    },
    icon: {
      description: '(Test only)',
      control: 'select',
      options: ['ContactPhone', 'ContactMail', 'Construction', 'BatteryChargingFull'],
      mapping: {
        ContactPhone: <MdContactPhone className="size-6" />,
        ContactMail: <MdContactMail className="size-6" />,
        Construction: <MdConstruction className="size-6" />,
        BatteryChargingFull: <MdBatteryChargingFull className="size-6" />,
      },
    },
  },
} satisfies Meta<AlertProps>;

export default meta;

type Story = StoryObj<typeof meta> & {
  args?: AlertProps;
};

export const BasicAlert = {
  args: {
    icon: <MdContactPhone />,
    title: 'Success! Your changes have been saved',
    description: 'This is an alert with icon, title and description.',
  },
  render: function Render(args: AlertProps) {
    return (
      <Alert variant={args.variant}>
        {args.icon}
        <AlertTitle>{args.title}</AlertTitle>
        <AlertDescription>{args.description}</AlertDescription>
      </Alert>
    );
  },
} satisfies Story;
