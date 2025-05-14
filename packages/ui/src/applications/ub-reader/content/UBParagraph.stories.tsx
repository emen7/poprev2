import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

// Create a simple UBParagraph component for Storybook
// This is a simplified version of the actual component in apps/ub-reader/components/UBParagraph.tsx
export const UBParagraph = ({
  paragraph = { number: 0, text: 'No paragraph content provided' },
  isTopicChange = false,
  showParagraphNumbers = true,
  className = '',
}) => {
  const paragraphStyle = {
    marginBottom: '1.5em',
    position: 'relative',
    lineHeight: 1.6,
    marginTop: isTopicChange ? '2em' : 0,
  };

  const numberStyle = {
    position: 'absolute',
    left: '-2.5em',
    top: 0,
    color: '#666',
    fontSize: '0.8em',
    fontWeight: 'bold',
  };

  const textStyle = {
    textAlign: 'justify' as const,
  };

  // Safety check for paragraph object
  if (!paragraph) {
    return <div style={paragraphStyle}>Error: No paragraph data provided</div>;
  }

  return (
    <div style={paragraphStyle}>
      {showParagraphNumbers && paragraph.number !== undefined && (
        <span style={numberStyle}>{paragraph.number}</span>
      )}
      {paragraph.text && (
        <div style={textStyle} dangerouslySetInnerHTML={{ __html: paragraph.text }} />
      )}
    </div>
  );
};

// Define the Meta for the component
const meta: Meta<typeof UBParagraph> = {
  title: 'Applications/UBReader/Content/UBParagraph',
  component: UBParagraph,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    paragraph: {
      control: 'object',
      description: 'The paragraph object containing number and text',
    },
    isTopicChange: {
      control: 'boolean',
      description: 'Whether this paragraph represents a topic change',
    },
    showParagraphNumbers: {
      control: 'boolean',
      description: 'Whether to show paragraph numbers',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
  args: {
    // Default args for all stories
    paragraph: {
      number: 1,
      text: 'Default paragraph text for UB Reader component.',
    },
    showParagraphNumbers: true,
    isTopicChange: false,
    className: '',
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: '700px', margin: '0 auto', fontFamily: 'serif' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UBParagraph>;

// Basic paragraph
export const Default: Story = {
  args: {
    paragraph: {
      number: 1,
      text: 'The Universal Father is the God of all creation, the First Source and Center of all things and beings.',
    },
    showParagraphNumbers: true,
  },
};

// Paragraph with HTML formatting
export const WithHTMLFormatting: Story = {
  args: {
    paragraph: {
      number: 2,
      text: 'OF ALL the names by which God the Father is known throughout the universes, those which designate him as the <i>First Source</i> and the <i>Universe Center</i> are most often encountered.',
    },
    showParagraphNumbers: true,
  },
};

// Paragraph without numbers
export const WithoutNumbers: Story = {
  args: {
    paragraph: {
      number: 3,
      text: 'The Universal Father never imposes any form of arbitrary recognition, formal worship, or slavish service upon the intelligent will creatures of the universes.',
    },
    showParagraphNumbers: false,
  },
};

// Topic change paragraph
export const TopicChange: Story = {
  args: {
    paragraph: {
      number: 4,
      text: 'The evolutionary creatures of the inhabited worlds, on first learning of the existence of God, are prone to regard him as an arbitrarily omnipotent creator, a displaced and modified continuation of the primitive tribal fetish concept.',
    },
    isTopicChange: true,
    showParagraphNumbers: true,
  },
};

// Long paragraph
export const LongParagraph: Story = {
  args: {
    paragraph: {
      number: 5,
      text: 'The Universal Father is not a transient force, a shifting power, or a fluctuating energy. The power and wisdom of the Father are wholly adequate to cope with any and all universe exigencies. As the emergencies of human experience arise, he has foreseen them all, and therefore he does not react to the affairs of the universe in a detached way but rather in accordance with the dictates of eternal wisdom and in harmony with the mandates of infinite judgment. Regardless of appearances, the power of God is not functioning in the universe as a blind force.',
    },
    showParagraphNumbers: true,
  },
};

// Add some CSS for the stories
const styles = `
  .ub-paragraph {
    margin-bottom: 1.5em;
    position: relative;
    line-height: 1.6;
  }

  .ub-paragraph-number {
    position: absolute;
    left: -2.5em;
    top: 0;
    color: #666;
    font-size: 0.8em;
    font-weight: bold;
  }

  .ub-paragraph-text {
    text-align: justify;
  }

  .ub-topic-change {
    margin-top: 2em;
  }
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

