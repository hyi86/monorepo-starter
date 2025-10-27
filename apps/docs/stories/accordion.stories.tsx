import { faker } from '@faker-js/faker/locale/ko';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@monorepo-starter/ui/components/accordion';
import type { Meta, StoryObj } from '@storybook/react-vite';

type AccordionProps = React.ComponentProps<typeof Accordion> & { itemCount?: number };

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  subcomponents: { AccordionItem, AccordionTrigger, AccordionContent },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
    },
    collapsible: {
      control: 'boolean',
      if: { arg: 'type', eq: 'single' },
    },
    disabled: {
      control: 'boolean',
    },
    itemCount: {
      control: 'number',
      description: '(Test only)',
      defaultValue: 3,
    },
  },
} satisfies Meta<AccordionProps>;

export default meta;

type Story = StoryObj<typeof meta> & {
  args?: AccordionProps;
};

export const BasicAccordion = {
  args: {
    type: 'single',
    collapsible: true,
    itemCount: 3,
  },
  loaders: [
    async () => {
      return {
        items: Array.from({ length: 10 }).map((_, index) => ({
          value: `item-${index + 1}`,
          label: faker.lorem.sentence({ min: 3, max: 8 }),
          content: faker.lorem.paragraphs({ min: 1, max: 5 }),
        })),
      };
    },
  ],
  render: function Render(args: AccordionProps, { loaded }) {
    const items = loaded.items as { value: string; label: string; content: string }[];
    return (
      <Accordion className="w-md" {...args}>
        {items.slice(0, args.itemCount).map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className="word-break-keep-all">{item.label}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  },
} satisfies Story;
