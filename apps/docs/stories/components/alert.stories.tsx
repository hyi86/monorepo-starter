import { Alert, AlertDescription, AlertTitle } from '@monorepo-starter/ui/components/alert';
import { cn } from '@monorepo-starter/ui/lib/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertCircleIcon, CheckCircleIcon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react';

type AlertProps = React.ComponentProps<typeof Alert> & {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  iconColor?: string;
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
      options: ['none', 'CheckCircle', 'Warning', 'Error', 'Info'],
      mapping: {
        none: null,
        CheckCircle: <CheckCircleIcon />,
        Warning: <TriangleAlertIcon />,
        Error: <OctagonXIcon />,
        Info: <AlertCircleIcon />,
      },
    },
    iconColor: {
      description: '(Test only)',
      control: 'select',
      options: ['green', 'yellow', 'red', 'blue'],
      mapping: {
        default: '[&>svg]:text-current',
        green: '[&>svg]:text-green-500',
        yellow: '[&>svg]:text-yellow-500',
        red: '[&>svg]:text-red-500',
        blue: '[&>svg]:text-blue-500',
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
    icon: 'CheckCircle',
    title: 'Success! Your changes have been saved',
    description: 'This is an alert with icon, title and description.',
  },
  render: function Render(args: AlertProps) {
    return (
      <Alert variant={args.variant} className={cn('[&>svg]:size-4', args.iconColor)}>
        {args.icon}
        <AlertTitle>{args.title}</AlertTitle>
        <AlertDescription>{args.description}</AlertDescription>
      </Alert>
    );
  },
} satisfies Story;
