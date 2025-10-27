import { Checkbox } from '@monorepo-starter/ui/components/checkbox';
import { Label } from '@monorepo-starter/ui/components/label';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId, useState } from 'react';
import { MdDriveFileMove, MdNightlightRound, MdSunny } from 'react-icons/md';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultCheckbox: Story = {
  name: '기본 체크박스',
  args: {
    checked: false,
  },
  render: function Render() {
    return (
      <div className="flex gap-2">
        <Checkbox checked={true} />
        <Checkbox checked={false} />
        <Checkbox checked={'indeterminate'} />
      </div>
    );
  },
};

export const HorizontalCheckbox: Story = {
  name: '가로 체크박스',
  args: {},
  render: function Render() {
    return (
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <Checkbox id="horizontal-checkbox-01" />
          <Label htmlFor="horizontal-checkbox-01">Simple checkbox 01</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="horizontal-checkbox-02" />
          <Label htmlFor="horizontal-checkbox-02">Simple checkbox 02</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="horizontal-checkbox-03" />
          <Label htmlFor="horizontal-checkbox-03">Simple checkbox 03</Label>
        </div>
      </div>
    );
  },
};

export const VerticalCheckbox: Story = {
  name: '세로 체크박스',
  args: {},
  render: function Render() {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Checkbox id="terms-2" defaultChecked />
          <div className="grid gap-2">
            <Label htmlFor="terms-2">Accept terms and conditions</Label>
            <p className="text-muted-foreground text-sm">
              By clicking this checkbox, you agree to the terms and conditions.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox id="toggle" disabled />
          <Label htmlFor="toggle">Enable notifications</Label>
        </div>

        <Label className="hover:bg-accent/20 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950">
          <Checkbox
            id="toggle-2"
            defaultChecked
            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
          />
          <div className="grid gap-1.5 font-normal">
            <p className="text-sm leading-none font-medium">Enable notifications</p>
            <p className="text-muted-foreground text-sm">You can enable or disable notifications at any time.</p>
          </div>
        </Label>

        <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
          <Checkbox
            id="vertical-checkbox-01"
            className="order-1 after:absolute after:inset-0"
            aria-describedby="vertical-checkbox-01-description"
          />
          <div className="flex grow items-center gap-3">
            <MdDriveFileMove className="size-8" />
            <div className="grid gap-2">
              <Label htmlFor="vertical-checkbox-01">
                Label <span className="text-muted-foreground text-xs leading-[inherit] font-normal">(Sub-label)</span>
              </Label>
              <p id="vertical-checkbox-01-description" className="text-muted-foreground text-xs">
                A short description goes here.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const CheckboxWithIcon: Story = {
  name: '아이콘 체크박스',
  args: {},
  render: function Render() {
    const id = useId();
    const [theme, setTheme] = useState<string>('light');

    return (
      <div className="space-y-4">
        <legend className="text-foreground text-sm leading-none font-medium">Dark mode toggle checkbox</legend>
        <div className="flex flex-col justify-center">
          <input
            type="checkbox"
            name={id}
            id={id}
            className="peer sr-only"
            checked={theme === 'dark'}
            onChange={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          />
          <label
            className="group border-input bg-background text-foreground peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 hover:bg-accent hover:text-accent-foreground relative inline-flex size-9 items-center justify-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none peer-focus-visible:ring-[3px]"
            htmlFor={id}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <MdNightlightRound
              size={16}
              className="shrink-0 scale-0 opacity-0 transition-all group-peer-checked:scale-100 group-peer-checked:opacity-100"
              aria-hidden="true"
            />
            <MdSunny
              size={16}
              className="absolute shrink-0 scale-100 opacity-100 transition-all group-peer-checked:scale-0 group-peer-checked:opacity-0"
              aria-hidden="true"
            />
          </label>
        </div>
      </div>
    );
  },
};
