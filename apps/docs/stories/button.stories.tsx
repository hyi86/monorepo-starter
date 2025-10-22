import { Button } from '@monorepo-starter/ui/components/button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { IconCalendar } from './assets/icon-calendar';
import { IconTimes } from './assets/icon-times';
import { IconUser } from './assets/icon-user';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      defaultValue: 'default',
    },
    disabled: {
      control: { type: 'boolean' },
    },
    asChild: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['default', 'sm', 'lg'],
    },
  },
  args: {
    variant: 'default',
    children: 'Default',
    onClick: () => {
      window.alert('Default button clicked');
    },
  },
  play: async ({ canvasElement, userEvent }) => {
    // window.alert를 mock으로 교체
    const originalAlert = window.alert;
    let alertMessage = '';

    window.alert = (message: string) => {
      alertMessage = message;
    };

    const canvas = within(canvasElement);
    const defaultButton = canvas.getByRole('button', { name: /Default/i });
    await expect(defaultButton).toBeInTheDocument();
    await userEvent.click(defaultButton);

    // alert 메시지 확인
    expect(alertMessage).toBe('Default button clicked');

    // 원래 함수 복원
    window.alert = originalAlert;
  },
};

export const Icon: Story = {
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['icon', 'icon-sm', 'icon-lg'],
    },
    children: {
      control: { type: 'select' },
      options: ['Calendar', 'Times', 'User'],
      mapping: {
        IconCalendar: <IconCalendar />,
        IconTimes: <IconTimes />,
        IconUser: <IconUser />,
      },
      defaultValue: 'Calendar',
    },
  },
  args: {
    variant: 'default',
    size: 'icon',
    'aria-label': 'Icon Button',
    children: <IconCalendar />,
  },
};
