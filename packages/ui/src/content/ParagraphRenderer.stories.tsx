import type { Meta, StoryObj } from '@storybook/react';
import { ParagraphRenderer } from './ParagraphRenderer';

const meta: Meta<typeof ParagraphRenderer> = {
  title: 'Content/ParagraphRenderer',
  component: ParagraphRenderer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    paragraphNumber: { control: 'number' },
    showParagraphNumbers: { control: 'boolean' },
    fontSize: { control: 'select', options: ['small', 'medium', 'large'] },
    lineSpacing: { control: 'select', options: ['compact', 'normal', 'relaxed'] },
    fontStyle: { control: 'select', options: ['serif', 'sans-serif'] },
  },
};

export default meta;
type Story = StoryObj<typeof ParagraphRenderer>;

export const Default: Story = {
  args: {
    content: 'This is a sample paragraph with some text content.',
    paragraphNumber: 1,
    showParagraphNumbers: true,
    fontSize: 'medium',
    lineSpacing: 'normal',
    fontStyle: 'serif',
  },
};

export const LongParagraph: Story = {
  args: {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    paragraphNumber: 2,
    showParagraphNumbers: true,
    fontSize: 'medium',
    lineSpacing: 'normal',
    fontStyle: 'serif',
  },
};

export const WithoutParagraphNumber: Story = {
  args: {
    content: 'This paragraph does not display a paragraph number.',
    paragraphNumber: 3,
    showParagraphNumbers: false,
    fontSize: 'medium',
    lineSpacing: 'normal',
    fontStyle: 'serif',
  },
};

export const LargeFont: Story = {
  args: {
    content: 'This paragraph uses a large font size.',
    paragraphNumber: 4,
    showParagraphNumbers: true,
    fontSize: 'large',
    lineSpacing: 'normal',
    fontStyle: 'serif',
  },
};

export const SansSerif: Story = {
  args: {
    content: 'This paragraph uses a sans-serif font style.',
    paragraphNumber: 5,
    showParagraphNumbers: true,
    fontSize: 'medium',
    lineSpacing: 'normal',
    fontStyle: 'sans-serif',
  },
};

export const RelaxedLineSpacing: Story = {
  args: {
    content: 'This paragraph uses relaxed line spacing for better readability.',
    paragraphNumber: 6,
    showParagraphNumbers: true,
    fontSize: 'medium',
    lineSpacing: 'relaxed',
    fontStyle: 'serif',
  },
};
