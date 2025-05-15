import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SelectionMenu, SelectionAction } from './SelectionMenu';
import { ThemeProvider } from '../contexts/ThemeContext';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof SelectionMenu> = {
  title: 'ReaderCore/Components/SelectionMenu',
  component: SelectionMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ position: 'relative', width: '100%', height: '300px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    onActionSelect: { action: 'action selected' },
    onClose: { action: 'menu closed' },
  },
};

export default meta;
type Story = StoryObj<typeof SelectionMenu>;

// Basic menu
export const Basic: Story = {
  args: {
    isVisible: true,
    position: { x: 150, y: 150 },
  },
};

// Menu with limited actions
export const LimitedActions: Story = {
  args: {
    isVisible: true,
    position: { x: 150, y: 150 },
    availableActions: ['highlight', 'note', 'cancel'],
  },
};

// Interactive menu
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isVisible, setIsVisible] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [position, setPosition] = useState({ x: 0, y: 0 });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedAction, setSelectedAction] = useState<SelectionAction | null>(null);
    
    const handleMouseUp = (e: React.MouseEvent) => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim() !== '') {
        setPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      }
    };
    
    const handleActionSelect = (actionType: SelectionAction) => {
      setSelectedAction(actionType);
      action('action selected')(actionType);
      if (actionType === 'cancel') {
        setIsVisible(false);
      }
    };
    
    const handleClose = () => {
      setIsVisible(false);
      action('menu closed')();
    };
    
    return (
      <div style={{ padding: '2rem', backgroundColor: 'var(--color-surface)', borderRadius: '8px' }}>
        <h3>Selection Menu Demo</h3>
        <p onMouseUp={handleMouseUp} style={{ userSelect: 'text', lineHeight: 1.6 }}>
          Select some text in this paragraph to see the selection menu appear. You can then click on one of the actions to see what happens.
        </p>
        {selectedAction && selectedAction !== 'cancel' && (
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--color-surface-darker-dark)', borderRadius: '4px' }}>
            <strong>Selected action:</strong> {selectedAction}
          </div>
        )}
        <SelectionMenu
          isVisible={isVisible}
          position={position}
          onActionSelect={handleActionSelect}
          onClose={handleClose}
        />
      </div>
    );
  },
};

