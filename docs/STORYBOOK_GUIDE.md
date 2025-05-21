# Storybook Component Guide

This document provides an overview of the Storybook component organization in the UB Ecosystem project and guidelines for creating and using components.

## Table of Contents

- [Storybook Structure](#storybook-structure)
- [Component Categories](#component-categories)
- [Creating New Components](#creating-new-components)
- [Writing Stories](#writing-stories)
- [Component Documentation](#component-documentation)
- [Accessibility Guidelines](#accessibility-guidelines)
- [Testing Components](#testing-components)

## Storybook Structure

Our Storybook is organized into four main categories:

1. **Core** - Basic UI components that are application-agnostic
2. **Reader Core** - Components specific to reader applications but shared across different readers
3. **Applications** - Components specific to individual applications (UB Reader, Scientific Reader, etc.)
4. **Examples** - Complete examples and demos showing integration of components

This structure helps organize components by their level of specificity and reusability.

## Component Categories

### Core Components

Core components are the fundamental building blocks of our UI. They are application-agnostic and can be used in any context.

Examples:

- Buttons
- Inputs
- Typography
- Icons
- Modals
- Tooltips
- Toggles
- Tabs

### Reader Core Components

Reader Core components are specific to reader applications but are shared across different readers (UB Reader, Scientific Reader, etc.).

Examples:

- Content rendering components
- Navigation components
- Selection and highlighting
- Notes and quotes functionality
- Settings panels
- Search functionality

### Application Components

Application components are specific to individual applications and implement specialized functionality.

Examples:

- UB Reader specific components
- Scientific Reader specific components
- Almanac specific components
- Publications specific components

### Examples

Examples demonstrate how to use and integrate components to build complete features or pages.

Examples:

- Complete reader pages
- Theme demonstrations
- Feature demonstrations (search, notes, etc.)
- Integration examples

## Creating New Components

When creating a new component, follow these steps:

1. **Identify the appropriate category** for your component based on its reusability and purpose
2. **Create the component** in the appropriate directory:
   - Core components: `packages/ui/src/core/`
   - Reader Core components: `packages/ui/src/reader-core/`
   - Application components: `packages/ui/src/applications/`
   - Examples: `packages/ui/src/examples/`
3. **Use TypeScript** for type safety
4. **Include JSDoc comments** for all public functions, methods, and props
5. **Create a story file** for the component
6. **Add accessibility features** as needed
7. **Write tests** for the component

### Component File Structure

````typescript
// ComponentName.tsx
import React from 'react';
import styles from './ComponentName.module.css';

/**
 * Props for the ComponentName component
 */
export interface ComponentNameProps {
  /** Description of prop1 */
  prop1: string;
  /** Description of prop2 */
  prop2?: number;
  /** Description of prop3 */
  prop3?: boolean;
  /** Description of onEvent */
  onEvent?: (value: string) => void;
}

/**
 * ComponentName component description
 *
 * @example
 * ```tsx
 * <ComponentName prop1="value" prop2={42} />
 * ```
 */
export const ComponentName: React.FC<ComponentNameProps> = ({
  prop1,
  prop2 = 0,
  prop3 = false,
  onEvent,
}) => {
  // Component implementation
  return (
    <div className={styles.container}>
      {/* Component content */}
    </div>
  );
};
````

## Writing Stories

Stories should follow this naming convention:

```
{Category}/{Subcategory}/{ComponentName}
```

For example:

- `Core/Buttons/Button`
- `ReaderCore/Content/Paragraph`
- `Applications/UBReader/Layout`
- `Examples/UBReader/ThemeDemo`

### Story File Structure

```typescript
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Core/Category/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    prop1: { control: 'text' },
    prop2: { control: { type: 'number', min: 0, max: 100, step: 1 } },
    prop3: { control: 'boolean' },
    onEvent: { action: 'onEvent' },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    prop1: 'Default value',
    prop2: 42,
    prop3: false,
  },
};

export const Alternative: Story = {
  args: {
    prop1: 'Alternative value',
    prop2: 24,
    prop3: true,
  },
};
```

## Component Documentation

Use JSDoc comments to document your components. The documentation should include:

- A description of the component
- Descriptions of all props
- Examples of usage
- Any important notes or caveats

Storybook will automatically generate documentation from these comments.

## Accessibility Guidelines

All components should follow these accessibility guidelines:

- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Support screen readers
- Handle focus management properly

Use the Storybook a11y addon to check for accessibility issues.

## Testing Components

Write tests for your components using Vitest and Testing Library. Tests should cover:

- Rendering with different props
- User interactions
- Accessibility
- Edge cases

```typescript
// ComponentName.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly with default props', () => {
    render(<ComponentName prop1="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const onEvent = vi.fn();
    render(<ComponentName prop1="test" onEvent={onEvent} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onEvent).toHaveBeenCalledWith('test');
  });
});
```
