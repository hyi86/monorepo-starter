import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@monorepo-starter/ui/components/alert-dialog';
import { Button } from '@monorepo-starter/ui/components/button';
import type { Meta, StoryObj } from '@storybook/react-vite';

type AlertDialogProps = React.ComponentProps<typeof AlertDialog> & {
  title?: string;
  description?: string;
  hideTitle?: boolean;
  hideCancel?: boolean;
};

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  subcomponents: {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogOverlay,
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: '(Test only)',
      control: 'text',
    },
    description: {
      description: '(Test only)',
      control: 'text',
    },
    hideTitle: {
      description: '(Test only)',
      control: 'boolean',
      defaultValue: false,
    },
    hideCancel: {
      description: '(Test only)',
      control: 'boolean',
      defaultValue: false,
    },
  },
} satisfies Meta<AlertDialogProps>;

export default meta;

type Story = StoryObj<typeof meta> & {
  args?: AlertDialogProps;
};

export const BasicAlertDialog = {
  args: {
    title: 'Are you absolutely sure?',
    description:
      'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
  },
  render: function Render({ title, description, hideTitle, hideCancel }: AlertDialogProps) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            {!hideTitle && <AlertDialogTitle>{title}</AlertDialogTitle>}
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {!hideCancel && <AlertDialogCancel>Cancel</AlertDialogCancel>}
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
} satisfies Story;
