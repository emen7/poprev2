import type { Meta, StoryObj } from '@storybook/react';

import { ParagraphComponent } from './ParagraphComponent';

const meta: Meta<typeof ParagraphComponent> = {
  title: 'Content/ParagraphComponent',
  component: ParagraphComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    number: {
      control: 'text',
      description: 'The paragraph number',
    },
    text: {
      control: 'text',
      description: 'The paragraph text content',
    },
    showNumber: {
      control: 'boolean',
      description: 'Whether to show the paragraph number',
    },
    isHighlighted: {
      control: 'boolean',
      description: 'Whether the paragraph is highlighted',
    },
    highlightColor: {
      control: 'color',
      description: 'The color of the highlight',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ParagraphComponent>;

// Basic story with default props
export const Default: Story = {
  args: {
    number: '1:0.1',
    text: 'THE Universal Father is the God of all creation, the First Source and Center of all things and beings. First think of God as a creator, then as a controller, and lastly as an infinite upholder. The truth about the Universal Father had begun to dawn upon mankind when the prophet said: "You, God, are alone; there is none beside you. You have created the heaven and the heaven of heavens, with all their hosts; you preserve and control them. By the Sons of God were the universes made. The Creator covers himself with light as with a garment and stretches out the heavens as a curtain." Only the concept of the Universal Father—one God in the place of many gods—enabled mortal man to comprehend the Father as divine creator and infinite controller.',
    showNumber: true,
    isHighlighted: false,
  },
};

// Story with highlighted paragraph
export const Highlighted: Story = {
  args: {
    ...Default.args,
    isHighlighted: true,
    highlightColor: '#ffeb3b',
  },
};

// Story without paragraph number
export const WithoutNumber: Story = {
  args: {
    ...Default.args,
    showNumber: false,
  },
};

// Story with short text
export const ShortText: Story = {
  args: {
    ...Default.args,
    text: 'This is a short paragraph to demonstrate how the component handles brief content.',
  },
};

// Story with very long text
export const LongText: Story = {
  args: {
    ...Default.args,
    text: 'This is a very long paragraph to demonstrate how the component handles extensive content. '.repeat(
      10
    ),
  },
};

// Mobile view story
export const MobileView: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
