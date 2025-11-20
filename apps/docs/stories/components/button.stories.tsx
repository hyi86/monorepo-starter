import { Button } from '@monorepo-starter/ui/components/button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageIcon } from 'lucide-react';
import { expect, within } from 'storybook/test';

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

export const AllButtons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-muted-foreground w-30 font-medium">Default</span>
          <Button>Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-muted-foreground w-30 font-medium">With Icon</span>
          <Button>
            <ImageIcon /> Default
          </Button>
          <Button variant="destructive">
            <ImageIcon /> Destructive
          </Button>
          <Button variant="outline">
            <ImageIcon /> Outline
          </Button>
          <Button variant="secondary">
            <ImageIcon /> Secondary
          </Button>
          <Button variant="ghost">
            <ImageIcon /> Ghost
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-muted-foreground w-30 font-medium">With Icon Suffix</span>
          <Button>
            Default <ImageIcon />
          </Button>
          <Button variant="destructive">
            Destructive <ImageIcon />
          </Button>
          <Button variant="outline">
            Outline <ImageIcon />
          </Button>
          <Button variant="secondary">
            Secondary <ImageIcon />
          </Button>
          <Button variant="ghost">
            Ghost <ImageIcon />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-muted-foreground w-30 font-medium">Sizes (sm)</span>
          <Button size="sm">
            <ImageIcon /> Default
          </Button>
          <Button variant="destructive" size="sm">
            <ImageIcon /> Destructive
          </Button>
          <Button variant="outline" size="sm">
            <ImageIcon /> Outline
          </Button>
          <Button variant="secondary" size="sm">
            <ImageIcon /> Secondary
          </Button>
          <Button variant="ghost" size="sm">
            <ImageIcon /> Ghost
          </Button>
          <Button variant="link">
            <ImageIcon /> Link
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-muted-foreground w-30 font-medium">Sizes (lg)</span>
          <Button size="lg">
            <ImageIcon /> Default
          </Button>
          <Button variant="destructive" size="lg">
            <ImageIcon /> Destructive
          </Button>
          <Button variant="outline" size="lg">
            <ImageIcon /> Outline
          </Button>
          <Button variant="secondary" size="lg">
            <ImageIcon /> Secondary
          </Button>
          <Button variant="ghost" size="lg">
            <ImageIcon /> Ghost
          </Button>
          <Button variant="link" size="lg">
            <ImageIcon /> Link
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-muted-foreground w-30 font-medium">Sizes (icon)</span>
          <Button size="icon">
            <ImageIcon />
          </Button>
          <Button variant="destructive" size="icon">
            <ImageIcon />
          </Button>
          <Button variant="outline" size="icon">
            <ImageIcon />
          </Button>
          <Button variant="secondary" size="icon">
            <ImageIcon />
          </Button>
          <Button variant="ghost" size="icon">
            <ImageIcon />
          </Button>
          <Button variant="link" size="icon">
            <ImageIcon />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-muted-foreground w-30 font-medium">Sizes (icon-sm)</span>
          <Button size="icon-sm">
            <ImageIcon />
          </Button>
          <Button variant="destructive" size="icon-sm">
            <ImageIcon />
          </Button>
          <Button variant="outline" size="icon-sm">
            <ImageIcon />
          </Button>
          <Button variant="secondary" size="icon-sm">
            <ImageIcon />
          </Button>
          <Button variant="ghost" size="icon-sm">
            <ImageIcon />
          </Button>
          <Button variant="link" size="icon-sm">
            <ImageIcon />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-muted-foreground w-30 font-medium">Rounded</span>
          <Button className="rounded-full" size="icon-sm">
            <ImageIcon />
          </Button>
          <Button className="rounded-full" size="icon">
            <ImageIcon />
          </Button>
          <Button className="rounded-full" size="icon-lg">
            <ImageIcon />
          </Button>
          <Button className="rounded-full" size="icon-sm" variant="destructive">
            <ImageIcon />
          </Button>
          <Button className="rounded-full" size="icon" variant="destructive">
            <ImageIcon />
          </Button>
          <Button className="rounded-full" size="icon-lg" variant="destructive">
            <ImageIcon />
          </Button>
          <Button className="rounded-full" size="icon-sm" variant="outline">
            <ImageIcon />
          </Button>
          <Button className="rounded-full" size="icon" variant="outline">
            <ImageIcon />
          </Button>
          <Button className="rounded-full" size="icon-lg" variant="outline">
            <ImageIcon />
          </Button>
        </div>
      </div>
    );
  },
};
