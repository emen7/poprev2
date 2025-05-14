import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

// Create a mock NotesPanel component for Storybook
export interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  reference?: string;
  tags?: string[];
}

export const NotesPanel = ({
  documentId,
  initialNotes = [],
  persistNotes = false,
  onNotesChange,
  className = '',
}) => {
  const panelStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
  };

  const headerTitleStyle = {
    margin: 0,
    fontSize: '16px',
    fontWeight: 600,
  };

  const contentStyle = {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '16px',
  };

  const emptyStyle = {
    color: '#666',
    textAlign: 'center' as const,
    margin: '32px 0',
  };

  const listStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  };

  const noteItemStyle = {
    padding: '12px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#fff',
  };

  const noteContentStyle = {
    marginBottom: '8px',
    lineHeight: 1.5,
  };

  const noteMetaStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#666',
    marginBottom: '8px',
  };

  const noteTagsStyle = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '4px',
  };

  const noteTagStyle = {
    fontSize: '11px',
    padding: '2px 6px',
    backgroundColor: '#1976d2',
    color: 'white',
    borderRadius: '12px',
  };

  return (
    <div style={panelStyle}>
      <div style={headerStyle}>
        <h2 style={headerTitleStyle}>Notes</h2>
        <button>Add Note</button>
      </div>
      <div style={contentStyle}>
        {initialNotes.length === 0 ? (
          <p style={emptyStyle}>No notes yet. Click "Add Note" to create one.</p>
        ) : (
          <div style={listStyle}>
            {initialNotes.map(note => (
              <div key={note.id} style={noteItemStyle}>
                <div style={noteContentStyle}>{note.content}</div>
                <div style={noteMetaStyle}>
                  <span>{note.reference}</span>
                  <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                </div>
                <div style={noteTagsStyle}>
                  {note.tags?.map(tag => (
                    <span key={tag} style={noteTagStyle}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Define the Meta for the component
const meta: Meta<typeof NotesPanel> = {
  title: 'ReaderCore/Panels/NotesPanel',
  component: NotesPanel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    documentId: {
      control: 'text',
      description: 'The document ID the notes are associated with',
    },
    initialNotes: {
      control: 'object',
      description: 'Initial notes to display',
    },
    persistNotes: {
      control: 'boolean',
      description: 'Whether to persist notes in localStorage',
    },
    onNotesChange: {
      action: 'notesChanged',
      description: 'Function to call when notes are updated',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
  decorators: [
    Story => (
      <div
        style={{ height: '500px', maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc' }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NotesPanel>;

// Sample notes data
const sampleNotes: Note[] = [
  {
    id: 'note-1',
    content:
      'This is a note about the Universal Father. The concept of God as a loving parent is central to understanding the Urantia Book.',
    createdAt: new Date(2023, 0, 15).toISOString(),
    updatedAt: new Date(2023, 0, 15).toISOString(),
    reference: 'Paper 1',
    tags: ['concept', 'important'],
  },
  {
    id: 'note-2',
    content:
      'The Thought Adjusters are fascinating. They represent the direct connection between humans and the Universal Father.',
    createdAt: new Date(2023, 1, 20).toISOString(),
    updatedAt: new Date(2023, 2, 5).toISOString(),
    reference: 'Paper 108',
    tags: ['concept'],
  },
  {
    id: 'note-3',
    content:
      'The description of the local universe administration provides a clear organizational structure for understanding cosmic hierarchy.',
    createdAt: new Date(2023, 3, 10).toISOString(),
    updatedAt: new Date(2023, 3, 10).toISOString(),
    reference: 'Paper 32',
    tags: ['organization', 'universe'],
  },
];

// Empty notes panel
export const Empty: Story = {
  args: {
    documentId: 'test-document',
    initialNotes: [],
    persistNotes: false,
  },
};

// Notes panel with sample notes
export const WithNotes: Story = {
  args: {
    documentId: 'test-document',
    initialNotes: sampleNotes,
    persistNotes: false,
  },
};

// Notes panel with many notes (scrollable)
export const ManyNotes: Story = {
  args: {
    documentId: 'test-document',
    initialNotes: [
      ...sampleNotes,
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `note-${i + 4}`,
        content: `This is note ${i + 4} with some content to demonstrate scrolling in the notes panel.`,
        createdAt: new Date(2023, 4, i + 1).toISOString(),
        updatedAt: new Date(2023, 4, i + 1).toISOString(),
        reference: `Paper ${Math.floor(Math.random() * 196) + 1}`,
        tags: ['sample'],
      })),
    ],
    persistNotes: false,
  },
};

// Notes panel with persistence enabled
export const WithPersistence: Story = {
  args: {
    documentId: 'persistent-document',
    initialNotes: sampleNotes,
    persistNotes: true,
  },
};

// Add CSS variables for the stories
const styles = `
  :root {
    --border-color: #e0e0e0;
    --panel-header-bg-color: #f5f5f5;
    --input-border-color: #ccc;
    --input-bg-color: #fff;
    --input-text-color: #333;
    --accent-color: #1976d2;
    --accent-hover-color: #1565c0;
    --text-muted-color: #666;
    --note-bg-color: #fff;
    --danger-color: #f44336;
  }

  /* Dark mode */
  .dark-theme {
    --border-color: #333;
    --panel-header-bg-color: #333;
    --input-border-color: #444;
    --input-bg-color: #222;
    --input-text-color: #fff;
    --accent-color: #08f;
    --accent-hover-color: #09f;
    --text-muted-color: #888;
    --note-bg-color: #2a2a2a;
    --danger-color: #f33;
  }
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

