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
- **Pullup Component**: Bottom panel with tabs for notes, quotes, and settings
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

1. Basic page structure redesign
   - Permanent Title Bar
   - Paper Bar
   - Reading Area with optimal width
   - Pullup Footer with text-only initial state
2. Consistent positioning between localhost and Vercel
3. Clean div structure with minimal nesting
4. Hybrid implementation approach (HTML/CSS prototype first, then React)
5. Full paper implementation for content testing
