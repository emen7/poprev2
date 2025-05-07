import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { NoteEditor } from './NoteEditor';
import { ThemeProvider } from '../contexts/ThemeContext';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof NoteEditor> = {
  title: 'UB Reader/Components/NoteEditor',
  component: NoteEditor,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    onSave: { action: 'note saved' },
    onCancel: { action: 'editor cancelled' },
    onDelete: { action: 'note deleted' },
  },
};

export default meta;
type Story = StoryObj<typeof NoteEditor>;

// Basic editor
export const Basic: Story = {
  args: {
    isVisible: true,
  },
};

// Editor with selected text
export const WithSelectedText: Story = {
  args: {
    isVisible: true,
    selectedText: 'The truth about the Universal Father had begun to dawn upon mankind when the prophet said: "You, God, are alone; there is none beside you."',
  },
};

// Editor with initial text
export const WithInitialText: Story = {
  args: {
    isVisible: true,
    initialText: 'This is an important passage about the Universal Father.',
    showDeleteButton: true,
  },
};

// Interactive editor
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isVisible, setIsVisible] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [noteText, setNoteText] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedText, setSelectedText] = useState('');
    
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim() !== '') {
        setSelectedText(selection.toString());
        setIsVisible(true);
      }
    };
    
    const handleSave = (text: string) => {
      setNoteText(text);
      setIsVisible(false);
      action('note saved')(text);
    };
    
    const handleCancel = () => {
      setIsVisible(false);
      action('editor cancelled')();
    };
    
    return (
      <div style={{ padding: '2rem' }}>
        <h3>Note Editor Demo</h3>
        <p onMouseUp={handleMouseUp} style={{ userSelect: 'text', lineHeight: 1.6, backgroundColor: 'var(--color-surface)', padding: '1rem', borderRadius: '8px' }}>
          Select some text in this paragraph to open the note editor. You can then enter a note and save it.
        </p>
        
        {noteText && (
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--color-surface)', borderRadius: '8px' }}>
            <h4>Your Note:</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: '1' }}>
                <h5>Selected Text:</h5>
                <p style={{ fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>{selectedText}</p>
              </div>
              <div style={{ flex: '1' }}>
                <h5>Note:</h5>
                <p>{noteText}</p>
              </div>
            </div>
            <button 
              onClick={() => {
                setIsVisible(true);
              }}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Edit Note
            </button>
          </div>
        )}
        
        <NoteEditor
          isVisible={isVisible}
          selectedText={selectedText}
          initialText={noteText}
          onSave={handleSave}
          onCancel={handleCancel}
          showDeleteButton={!!noteText}
          onDelete={() => {
            setNoteText('');
            setIsVisible(false);
            action('note deleted')();
          }}
        />
      </div>
    );
  },
};
