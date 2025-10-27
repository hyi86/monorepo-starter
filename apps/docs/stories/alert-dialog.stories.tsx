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
  hideHeader?: boolean;
  hideFooter?: boolean;
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
    hideHeader: {
      description: '(Test only)',
      control: 'boolean',
      defaultValue: false,
    },
    hideFooter: {
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
  parameters: {
    docs: {
      source: {
        type: 'code', // 자동 생성 대신 정적 코드 사용
      },
    },
  },
  args: {
    title: 'Are you absolutely sure?',
    description:
      'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
  },
  render: function Render({ title, description, hideHeader, hideFooter }: AlertDialogProps) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          {!hideHeader && (
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
          )}
          {!hideFooter && (
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialog>
    );
  },
} satisfies Story;
