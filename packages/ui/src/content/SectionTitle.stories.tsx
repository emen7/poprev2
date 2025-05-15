import type { Meta, StoryObj } from '@storybook/react';

import { SectionTitle } from './SectionTitle';

const meta: Meta<typeof SectionTitle> = {
  title: 'ReaderCore/Content/SectionTitle',
  component: SectionTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    number: {
      control: 'text',
      description: 'The section number',
    },
    title: {
      control: 'text',
      description: 'The section title text',
    },
    showNumber: {
      control: 'boolean',
      description: 'Whether to show the section number',
    },
    level: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'The heading level to use',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the section title',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SectionTitle>;

// Basic story with default props
export const Default: Story = {
  args: {
    number: '1',
    title: 'The Universal Father',
    showNumber: true,
    level: 'h3',
  },
};

// Story with h1 heading level
export const H1Level: Story = {
  args: {
    ...Default.args,
    level: 'h1',
  },
};

// Story with h2 heading level
export const H2Level: Story = {
  args: {
    ...Default.args,
    level: 'h2',
  },
};

// Story without section number
export const WithoutNumber: Story = {
  args: {
    ...Default.args,
    showNumber: false,
  },
};

// Story with long title
export const LongTitle: Story = {
  args: {
    number: '5',
    title:
      'Personality of the Universal Father and the Nature of Divine Reality in the Material Universe',
    showNumber: true,
    level: 'h3',
  },
};

// Story with subsection number
export const Subsection: Story = {
  args: {
    number: '3.2',
    title: 'The Nature of God',
    showNumber: true,
    level: 'h4',
  },
};

