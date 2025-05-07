import React, { useState, useCallback } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ThemeSettings } from '../components/ThemeSettings';
import { ParagraphRenderer, Highlight } from '../components/ParagraphRenderer';
import { SelectionMenu, SelectionAction } from '../components/SelectionMenu';
import { NoteEditor } from '../components/NoteEditor';

interface UBReaderDemoProps {
  /**
   * Whether to show theme settings
   */
  showSettings?: boolean;
}

/**
 * UBReaderDemo Component
 * 
 * A demo component that showcases the UB Reader functionality.
 */
const UBReaderDemo: React.FC<UBReaderDemoProps> = ({
  showSettings = true,
}) => {
  // Sample paragraphs
  const paragraphs = [
    {
      number: 1,
      text: 'THE Universal Father is the God of all creation, the First Source and Center of all things and beings. First think of God as a creator, then as a controller, and lastly as an infinite upholder.',
    },
    {
      number: 2,
      text: 'The truth about the Universal Father had begun to dawn upon mankind when the prophet said: "You, God, are alone; there is none beside you. You have created the heaven and the heaven of heavens, with all their hosts; you preserve and control them. By the Sons of God were the universes made. The Creator covers himself with light as with a garment and stretches out the heavens as a curtain."',
    },
    {
      number: 3,
      text: 'Only the concept of the Universal Father—one God in the place of many gods—enabled mortal man to comprehend the Father as divine creator and infinite controller.',
    },
    {
      number: 4,
      text: 'God is primal reality in the spirit world; God is the source of truth in the mind spheres; God overshadows all throughout the material realms. To all created intelligences God is a personality, and to the universe of universes he is the First Source and Center of eternal reality.',
    },
    {
      number: 5,
      text: 'The great controller makes no mistakes. He is resplendent in majesty and glory. "God is light, and in him is no darkness at all." "He knows the way that I take, and when he has tried me, I shall come forth as gold."',
    },
  ];
  
  // State for highlights
  const [highlights, setHighlights] = useState<Record<number, Highlight[]>>({
    2: [
      {
        id: 'highlight-1',
        startIndex: 126,
        endIndex: 147,
        color: 'var(--color-primary)',
      },
    ],
  });
  
  // State for notes
  const [notes, setNotes] = useState<Record<number, string>>({});
  
  // State for selection menu
  const [selectionMenu, setSelectionMenu] = useState({
    isVisible: false,
    position: { x: 0, y: 0 },
    paragraphNumber: 0,
    selection: { text: '', startIndex: 0, endIndex: 0 },
  });
  
  // State for note editor
  const [noteEditor, setNoteEditor] = useState({
    isVisible: false,
    paragraphNumber: 0,
    selectedText: '',
    initialText: '',
    isEditing: false,
  });
  
  // Handle text selection
  const handleTextSelect = useCallback((paragraphNumber: number, selection: { text: string; startIndex: number; endIndex: number }) => {
    const selectionRect = window.getSelection()?.getRangeAt(0).getBoundingClientRect();
    
    if (selectionRect) {
      setSelectionMenu({
        isVisible: true,
        position: {
          x: selectionRect.left + selectionRect.width / 2,
          y: selectionRect.top,
        },
        paragraphNumber,
        selection,
      });
    }
  }, []);
  
  // Handle selection menu action
  const handleSelectionAction = useCallback((action: SelectionAction) => {
    const { paragraphNumber, selection } = selectionMenu;
    
    switch (action) {
      case 'highlight':
        // Add highlight
        setHighlights(prev => {
          const paragraphHighlights = prev[paragraphNumber] || [];
          return {
            ...prev,
            [paragraphNumber]: [
              ...paragraphHighlights,
              {
                id: `highlight-${Date.now()}`,
                startIndex: selection.startIndex,
                endIndex: selection.endIndex,
                color: 'var(--color-primary)',
              },
            ],
          };
        });
        setSelectionMenu(prev => ({ ...prev, isVisible: false }));
        break;
        
      case 'note':
        // Open note editor
        setNoteEditor({
          isVisible: true,
          paragraphNumber,
          selectedText: selection.text,
          initialText: notes[paragraphNumber] || '',
          isEditing: !!notes[paragraphNumber],
        });
        setSelectionMenu(prev => ({ ...prev, isVisible: false }));
        break;
        
      case 'quote':
        // Add quote (in a real app, this would add to a quotes list)
        console.log(`Quote added: "${selection.text}" (Paper:1.${paragraphNumber})`);
        setSelectionMenu(prev => ({ ...prev, isVisible: false }));
        break;
        
      case 'cancel':
        // Close menu
        setSelectionMenu(prev => ({ ...prev, isVisible: false }));
        break;
    }
  }, [selectionMenu, notes]);
  
  // Handle highlight click
  const handleHighlightClick = useCallback((paragraphNumber: number, highlight: Highlight) => {
    console.log(`Highlight clicked: ${highlight.id} in paragraph ${paragraphNumber}`);
  }, []);
  
  // Handle note save
  const handleNoteSave = useCallback((noteText: string) => {
    const { paragraphNumber } = noteEditor;
    
    setNotes(prev => ({
      ...prev,
      [paragraphNumber]: noteText,
    }));
    
    setNoteEditor(prev => ({ ...prev, isVisible: false }));
  }, [noteEditor]);
  
  // Handle note cancel
  const handleNoteCancel = useCallback(() => {
    setNoteEditor(prev => ({ ...prev, isVisible: false }));
  }, []);
  
  // Handle note delete
  const handleNoteDelete = useCallback(() => {
    const { paragraphNumber } = noteEditor;
    
    setNotes(prev => {
      const newNotes = { ...prev };
      delete newNotes[paragraphNumber];
      return newNotes;
    });
    
    setNoteEditor(prev => ({ ...prev, isVisible: false }));
  }, [noteEditor]);
  
  return (
    <div className="ub-reader-demo">
      <div className="demo-container">
        {showSettings && (
          <div className="settings-panel">
            <h2 className="settings-title">Reader Settings</h2>
            <ThemeSettings 
              showLabels={true}
              showSystemOption={true}
              alignmentOptions={['left', 'justify', 'right']}
            />
          </div>
        )}
        
        <div className="content-panel">
          <div className="content-container">
            <h1 className="paper-title">The Universal Father</h1>
            
            <div className="paper-content">
              {paragraphs.map(paragraph => (
                <ParagraphRenderer
                  key={paragraph.number}
                  number={paragraph.number}
                  text={paragraph.text}
                  highlights={highlights[paragraph.number] || []}
                  hasNote={!!notes[paragraph.number]}
                  onTextSelect={(selection) => handleTextSelect(paragraph.number, selection)}
                  onHighlightClick={(highlight) => handleHighlightClick(paragraph.number, highlight)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <SelectionMenu
        isVisible={selectionMenu.isVisible}
        position={selectionMenu.position}
        onActionSelect={handleSelectionAction}
        onClose={() => setSelectionMenu(prev => ({ ...prev, isVisible: false }))}
      />
      
      <NoteEditor
        isVisible={noteEditor.isVisible}
        selectedText={noteEditor.selectedText}
        initialText={noteEditor.initialText}
        onSave={handleNoteSave}
        onCancel={handleNoteCancel}
        onDelete={handleNoteDelete}
        showDeleteButton={noteEditor.isEditing}
      />
      
      <style jsx>{`
        .ub-reader-demo {
          width: 100%;
          min-height: 100vh;
          background-color: var(--color-background);
          color: var(--color-text-primary);
          font-family: var(--font-family-base);
        }
        
        .demo-container {
          display: flex;
          flex-direction: column;
          padding: 1rem;
        }
        
        @media (min-width: 768px) {
          .demo-container {
            flex-direction: row;
            padding: 2rem;
          }
        }
        
        .settings-panel {
          flex: 0 0 300px;
          margin-bottom: 2rem;
        }
        
        @media (min-width: 768px) {
          .settings-panel {
            margin-bottom: 0;
            margin-right: 2rem;
          }
        }
        
        .settings-title {
          font-size: 1.5rem;
          margin-top: 0;
          margin-bottom: 1rem;
        }
        
        .content-panel {
          flex: 1;
          display: flex;
          justify-content: center;
        }
        
        .content-container {
          max-width: 700px;
          width: 100%;
          padding: 2rem;
          background-color: var(--color-surface);
          border-radius: var(--border-radius-md);
          border: 1px solid var(--color-border);
          text-align: var(--text-align);
        }
        
        .paper-title {
          font-family: var(--font-family-serif);
          margin-top: 0;
          margin-bottom: 2rem;
          font-size: 2rem;
          text-align: center;
        }
        
        .paper-content {
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
};

const meta: Meta<typeof UBReaderDemo> = {
  title: 'UB Reader/Examples/UBReaderDemo',
  component: UBReaderDemo,
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
};

export default meta;
type Story = StoryObj<typeof UBReaderDemo>;

// Default story with settings panel
export const Default: Story = {
  args: {
    showSettings: true,
  },
};

// Content only without settings
export const ContentOnly: Story = {
  args: {
    showSettings: false,
  },
};

// Mobile view
export const MobileView: Story = {
  args: {
    showSettings: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
