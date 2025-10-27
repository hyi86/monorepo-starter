import { Button } from '@monorepo-starter/ui/components/button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from '@storybook/test';
import { MdCalendarMonth, MdPerson, MdTimer } from 'react-icons/md';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      if: { arg: 'variant', neq: 'link' },
    },
    children: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    children: 'Button',
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultButton: Story = {
  name: '기본 버튼',
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

export const IconButton: Story = {
  name: '아이콘 버튼',
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['icon', 'icon-sm', 'icon-lg'],
    },
    children: {
      control: { type: 'select' },
      options: ['Calendar', 'Times', 'User'],
      mapping: {
        Calendar: <MdCalendarMonth />,
        Times: <MdTimer />,
        User: <MdPerson />,
      },
      defaultValue: 'Calendar',
    },
  },
  args: {
    variant: 'default',
    size: 'icon',
    'aria-label': 'Icon Button',
    children: <MdCalendarMonth />,
  },
};
