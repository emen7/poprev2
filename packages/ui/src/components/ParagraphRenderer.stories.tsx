import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ParagraphRenderer } from './ParagraphRenderer';
import { ThemeProvider } from '../contexts/ThemeContext';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof ParagraphRenderer> = {
  title: 'UB Reader/Components/ParagraphRenderer',
  component: ParagraphRenderer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ maxWidth: '700px', padding: '2rem', backgroundColor: 'var(--color-surface)' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    onTextSelect: { action: 'text selected' },
    onHighlightClick: { action: 'highlight clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof ParagraphRenderer>;

// Basic paragraph
export const Basic: Story = {
  args: {
    number: 1,
    text: 'THE Universal Father is the God of all creation, the First Source and Center of all things and beings. First think of God as a creator, then as a controller, and lastly as an infinite upholder.',
  },
};

// Paragraph with highlights
export const WithHighlights: Story = {
  args: {
    number: 2,
    text: 'The truth about the Universal Father had begun to dawn upon mankind when the prophet said: "You, God, are alone; there is none beside you. You have created the heaven and the heaven of heavens, with all their hosts; you preserve and control them. By the Sons of God were the universes made. The Creator covers himself with light as with a garment and stretches out the heavens as a curtain."',
    highlights: [
      {
        id: '1',
        startIndex: 126,
        endIndex: 147,
        color: 'var(--color-primary)',
      },
      {
        id: '2',
        startIndex: 214,
        endIndex: 234,
        color: 'var(--color-accent)',
      },
    ],
    onHighlightClick: action('highlight clicked'),
  },
};

// Paragraph with note
export const WithNote: Story = {
  args: {
    number: 3,
    text: 'Only the concept of the Universal Father—one God in the place of many gods—enabled mortal man to comprehend the Father as divine creator and infinite controller.',
    hasNote: true,
  },
};

// Interactive paragraph
export const Interactive: Story = {
  args: {
    number: 4,
    text: 'God is primal reality in the spirit world; God is the source of truth in the mind spheres; God overshadows all throughout the material realms. To all created intelligences God is a personality, and to the universe of universes he is the First Source and Center of eternal reality.',
    onTextSelect: action('text selected'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Try selecting text in this paragraph to see the onTextSelect callback in action.',
      },
    },
  },
};

// Multiple paragraphs
export const MultipleParagraphs: Story = {
  render: () => (
    <div>
      <ParagraphRenderer
        number={1}
        text="THE Universal Father is the God of all creation, the First Source and Center of all things and beings. First think of God as a creator, then as a controller, and lastly as an infinite upholder."
      />
      <ParagraphRenderer
        number={2}
        text="The truth about the Universal Father had begun to dawn upon mankind when the prophet said: "You, God, are alone; there is none beside you. You have created the heaven and the heaven of heavens, with all their hosts; you preserve and control them. By the Sons of God were the universes made. The Creator covers himself with light as with a garment and stretches out the heavens as a curtain.""
        highlights={[
          {
            id: '1',
            startIndex: 126,
            endIndex: 147,
            color: 'var(--color-primary)',
          },
        ]}
      />
      <ParagraphRenderer
        number={3}
        text="Only the concept of the Universal Father—one God in the place of many gods—enabled mortal man to comprehend the Father as divine creator and infinite controller."
        hasNote={true}
      />
      <ParagraphRenderer
        number={4}
        text="God is primal reality in the spirit world; God is the source of truth in the mind spheres; God overshadows all throughout the material realms. To all created intelligences God is a personality, and to the universe of universes he is the First Source and Center of eternal reality."
      />
      <ParagraphRenderer
        number={5}
        text="The great controller makes no mistakes. He is resplendent in majesty and glory. "God is light, and in him is no darkness at all." "He knows the way that I take, and when he has tried me, I shall come forth as gold.""
        highlights={[
          {
            id: '2',
            startIndex: 27,
            endIndex: 46,
            color: 'var(--color-success)',
          },
          {
            id: '3',
            startIndex: 84,
            endIndex: 118,
            color: 'var(--color-accent)',
          },
        ]}
      />
    </div>
  ),
};
