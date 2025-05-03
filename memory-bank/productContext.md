# UB Reader Project Context

## Project Overview

The UB Reader is a web application designed to provide an enhanced reading experience for the Urantia Book. It's built as a Next.js application within a monorepo structure, with shared packages providing core functionality.

## Architecture

- **Monorepo Structure**: Using pnpm workspaces and Turborepo
- **Application**: Next.js 13+ with App Router
- **UI Components**: React-based custom components
- **Styles**: CSS with custom variables and theming
- **State Management**: Context API with hooks
- **Build & Deployment**: Vercel integration

## Key Features

- **Permanent Title Bar**: Fixed position header with app title
- **Paper Bar**: Secondary header showing current paper information
- **Reading Area**: Main content container with optimal width
- **Pullup Component**: Bottom panel with improved behavior and always-visible handle
- **Tab Interface**: Adjacent left-aligned tabs with cohesive design
- **Text Formatting**: Multiple alignment options (left, right, justified)
- **Paragraph Numbering**: Clean display with separate column for notes indicators
- **Theme System**: Multiple themes with transition effects
- **Content Transformation**: Processing and display of structured content
- **Audio Integration**: Audio playback capabilities
- **Highlighting**: Text highlighting and annotation

## Project Goals

- Create a modern, responsive UI for reading the Urantia Book
- Support various devices from mobile to desktop
- Provide accessibility features
- Enable annotation and note-taking
- Support different reading modes and preferences
- Ensure consistent experience across deployment environments
- Optimize reading experience with proper typography and layout

## Repository Structure

- `/apps/ub-reader`: Main application
- `/packages/core`: Core reader functionality
- `/packages/highlighting`: Text highlighting functionality
- `/packages/audio-services`: Audio playback integration
- `/packages/theme-system`: Theming capabilities
- Other supporting packages for various functions

## Development Standards

- TypeScript for type safety
- ESLint and Stylelint for code quality
- Prettier for code formatting
- Husky for Git hooks
- Commitlint for commit message standards
- vitest for testing

## Current Priorities

1. Complete UI improvements validation across environments

   - Test UI enhancements in different browsers and devices
   - Verify consistent behavior of pullup component
   - Confirm text alignment features work properly

2. Transition to React implementation phase

   - Create core React components based on HTML prototype
   - Implement stateful behavior for UI elements
   - Integrate with existing application structure

3. Performance optimization

   - Optimize component re-rendering
   - Implement code splitting for better load times
   - Ensure smooth animations and transitions

4. Next feature enhancements

   - Enhanced note-taking capabilities
   - Improved theme switching
   - Additional text formatting options
   - Persistent user preferences

5. Testing and deployment
   - Cross-browser compatibility testing
   - Comprehensive device testing
   - Optimize build for production deployment
