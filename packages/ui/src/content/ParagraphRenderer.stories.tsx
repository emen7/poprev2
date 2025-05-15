import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ParagraphRenderer, Paragraph } from './ParagraphRenderer';

const meta: Meta<typeof ParagraphRenderer> = {
  title: 'ReaderCore/Content/ParagraphRenderer',
  component: ParagraphRenderer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    paragraph: { control: 'object' },
    formatType: {
      control: 'select',
      options: ['traditional', 'modern'],
      description: 'The formatting type to use',
    },
    showNumber: {
      control: 'boolean',
      description: 'Whether to show paragraph numbers',
    },
    useVerticalNumbering: {
      control: 'boolean',
      description: 'Whether to use vertical numbering',
    },
    isHighlighted: {
      control: 'boolean',
      description: 'Whether the paragraph is highlighted',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ParagraphRenderer>;

export const Default: Story = {
  args: {
    paragraph: {
      id: 'p1',
      number: 1,
      text: 'This is a sample paragraph with some text content.',
    },
    formatType: 'modern',
    showNumber: true,
    useVerticalNumbering: false,
    isHighlighted: false,
  },
};

export const LongParagraph: Story = {
  args: {
    paragraph: {
      id: 'p2',
      number: 2,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    formatType: 'modern',
    showNumber: true,
    useVerticalNumbering: false,
    isHighlighted: false,
  },
};

export const WithoutParagraphNumber: Story = {
  args: {
    paragraph: {
      id: 'p3',
      number: 3,
      text: 'This paragraph does not display a paragraph number.',
    },
    formatType: 'modern',
    showNumber: false,
    useVerticalNumbering: false,
    isHighlighted: false,
  },
};

export const TraditionalFormat: Story = {
  args: {
    paragraph: {
      id: 'p4',
      number: 4,
      text: 'This paragraph uses the traditional formatting style.',
    },
    formatType: 'traditional',
    showNumber: true,
    useVerticalNumbering: false,
    isHighlighted: false,
  },
};

export const HighlightedParagraph: Story = {
  args: {
    paragraph: {
      id: 'p5',
      number: 5,
      text: 'This paragraph is highlighted to draw attention to it.',
    },
    formatType: 'modern',
    showNumber: true,
    useVerticalNumbering: false,
    isHighlighted: true,
  },
};

export const VerticalNumbering: Story = {
  args: {
    paragraph: {
      id: 'p6',
      number: 6,
      text: 'This paragraph uses vertical numbering in the margin.',
      hasNotes: true,
    },
    formatType: 'modern',
    showNumber: true,
    useVerticalNumbering: true,
    isHighlighted: false,
  },
};

export const IndentedParagraph: Story = {
  args: {
    paragraph: {
      id: 'p7',
      number: 7,
      text: 'This paragraph is indented to show a hierarchical relationship.',
      metadata: {
        isIndented: true,
      },
    },
    formatType: 'modern',
    showNumber: true,
    useVerticalNumbering: false,
    isHighlighted: false,
  },
};

export const NumberedListItem: Story = {
  args: {
    paragraph: {
      id: 'p8',
      number: 8,
      text: 'This is a numbered list item in a sequence.',
      metadata: {
        isList: true,
        listType: 'numbered',
      },
    },
    formatType: 'modern',
    showNumber: true,
    useVerticalNumbering: false,
    isHighlighted: false,
  },
};

export const BulletedListItem: Story = {
  args: {
    paragraph: {
      id: 'p9',
      number: 9,
      text: 'This is a bulleted list item in a collection.',
      metadata: {
        isList: true,
        listType: 'bulleted',
      },
    },
    formatType: 'modern',
    showNumber: true,
    useVerticalNumbering: false,
    isHighlighted: false,
  },
};

