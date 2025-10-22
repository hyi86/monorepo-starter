import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@monorepo-starter/ui/components/accordion';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'accordion의 타입(single, multiple)',
      control: { type: 'inline-radio' },
      options: ['single', 'multiple'],
    },
    collapsible: {
      description: 'accordion이 전체 Collapse 가능 여부(single type only)',
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicAccordion: Story = {
  storyName: '기본 아코디언',
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
    },
    docs: {},
  },
  args: {
    type: 'single' as 'single' | 'multiple',
    collapsible: true as boolean,
  },
  render: function Render(args) {
    return (
      <Accordion
        {...(args.type === 'single'
          ? { type: 'single' as const, collapsible: args.collapsible, defaultValue: 'item-1' }
          : { type: 'multiple' as const, defaultValue: ['item-1'] })}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Product Information</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it
              offers unparalleled performance and reliability.
            </p>
            <p>
              Key features include advanced processing capabilities, and an intuitive user interface designed for both
              beginners and experts.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Shipping Details</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days,
              while express shipping ensures delivery within 1-2 business days.
            </p>
            <p>
              All orders are carefully packaged and fully insured. Track your shipment in real-time through our
              dedicated tracking portal.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Return Policy</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              We stand behind our products with a comprehensive 30-day return policy. If you&apos;re not completely
              satisfied, simply return the item in its original condition.
            </p>
            <p>
              Our hassle-free return process includes free return shipping and full refunds processed within 48 hours of
              receiving the returned item.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const DataLoadedAccordion: Story = {
  storyName: '데이터 로딩 아코디언',
  parameters: {
    layout: 'centered',
  },
  args: {
    type: 'single' as 'single' | 'multiple',
    collapsible: true as boolean,
  },
  loaders: [
    async () => ({
      items: [
        {
          value: 'item-1',
          label: 'Product Information',
          content:
            'Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.',
        },
        {
          value: 'item-2',
          label: 'Shipping Details',
          content:
            'We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days, while express shipping ensures delivery within 1-2 business days.',
        },
        {
          value: 'item-3',
          label: 'Return Policy',
          content:
            "We stand behind our products with a comprehensive 30-day return policy. If you're not completely satisfied, simply return the item in its original condition.",
        },
        {
          value: 'item-4',
          label: 'Additional Information',
          content: 'This is additional information that is not related to the product or shipping details.',
        },
        {
          value: 'item-5',
          label: 'Final Information',
          content: 'This is final information that is not related to the product, shipping details, or return policy.',
        },
        {
          value: 'item-6',
          label: 'Really Final Information',
          content:
            'This is really final information that is not related to the product, shipping details, or return policy.',
        },
        {
          value: 'item-7',
          label: 'Really Really Final Information',
          content:
            'This is really really final information that is not related to the product, shipping details, or return policy.',
        },
      ],
    }),
  ],
  render: function Render(args, { loaded }) {
    const items = loaded?.items as { value: string; label: string; content: string }[];

    return (
      <Accordion
        {...(args.type === 'single'
          ? { type: 'single' as const, collapsible: args.collapsible, defaultValue: 'item-1' }
          : { type: 'multiple' as const, defaultValue: ['item-1'] })}
      >
        {items &&
          items.length > 0 &&
          items.map((item) => (
            <AccordionItem value={item.value} key={item.value}>
              <AccordionTrigger>{item.label}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>{item.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    );
  },
};
