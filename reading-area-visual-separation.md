# Reading Area Visual Separation

## Overview

To better distinguish the reading area from the outer frame, we'll add subtle visual separation using either a border or shadow effect. This will enhance the visual hierarchy and create a more defined reading space.

## Implementation Options

### Option 1: Subtle Shadow (Recommended)

Add a box-shadow to the reading area:

```css
.reading-area {
  /* Existing properties */
  background-color: var(--reading-bg-color);
  color: var(--text-color);

  /* Visual separation with shadow */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 2rem;
}

/* Shadow adjustments for dark theme */
:root {
  --shadow-color: rgba(0, 0, 0, 0.2);
}

.light-theme-active {
  --shadow-color: rgba(0, 0, 0, 0.1);
}

.sepia-theme-active {
  --shadow-color: rgba(0, 0, 0, 0.08);
}

.reading-area {
  box-shadow: 0 2px 10px var(--shadow-color);
}
```

### Option 2: Subtle Border

Add a thin border to the reading area:

```css
.reading-area {
  /* Existing properties */
  background-color: var(--reading-bg-color);
  color: var(--text-color);

  /* Visual separation with border */
  border: 1px solid var(--border-color);
  border-radius: 8px;
}
```

## Visual Considerations

1. **Shadow Depth**: The shadow should be subtle enough not to be distracting but visible enough to create separation
2. **Border Radius**: Adding rounded corners (8px) softens the appearance and creates a more defined content area
3. **Theme Adaptation**: Shadow opacity or border color should adapt to the selected theme

## Implementation Recommendation

I recommend implementing Option 1 (subtle shadow) for these reasons:

1. Shadows create a more modern, elevated appearance
2. They provide better visual separation without adding a hard line
3. They work well across all color schemes with minor opacity adjustments
4. They create a sense of depth that helps focus attention on the content

The shadow should be very subtle in the dark theme (almost imperceptible) and slightly more visible in light themes.

## Integration with Transition Effect

The shadow should also transition smoothly when changing themes:

```css
.reading-area {
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;
}
```

This ensures the shadow adapts smoothly to theme changes along with other visual properties.
