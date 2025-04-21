# Memory Bank for UB Reader Project

This Memory Bank is part of the RooFlow system, providing persistent project context and knowledge across development sessions. It maintains a structured record of project knowledge, decisions, and progress.

## Purpose

The Memory Bank serves as:

1. A persistent store of project knowledge
2. A reference for AI assistants to understand project context
3. A documentation system for development progress
4. A bridge between different development modes

## Structure

The Memory Bank consists of four primary files:

### 1. activeContext.md

Contains information about the current development focus, challenges, and active components. This file should be updated whenever switching tasks or when significant progress is made within a task.

**When to update:** At the beginning of each development session and whenever shifting focus to a different feature or component.

### 2. productContext.md

Provides a high-level overview of the project, including architecture, key features, and project goals. This file changes less frequently and serves as the foundation for understanding the overall project.

**When to update:** When significant architectural changes are made or when new major features are planned.

### 3. decisionLog.md

Records important architectural and implementation decisions in chronological order, including the rationale and implementation details. This serves as a historical record of why certain approaches were chosen.

**When to update:** Whenever a significant decision is made about how to implement a feature or when changing an established pattern.

### 4. progress.md

Tracks the current state of development, showing completed tasks, work in progress, and upcoming tasks. Includes a visualization of overall progress and information about dependencies and blockers.

**When to update:** After completing tasks, when planning new work, or when the status of tasks changes.

## Usage with Boomerang Mode

The Memory Bank is designed to work with the Boomerang orchestration mode:

1. Boomerang mode can reference these files to understand project context
2. When creating new tasks, Boomerang can point to relevant sections in the Memory Bank
3. After tasks are completed, the Memory Bank should be updated to reflect new progress

## Maintenance Guidelines

- Keep files up to date but concise - focus on information that will be valuable in future sessions
- Use Markdown formatting consistently for better readability
- Include dates for all entries in the decisionLog.md
- Use checkboxes (- [ ] and - [x]) for task tracking in progress.md
- Link to external documentation or code files when appropriate

## Integration with Development Process

1. Review the Memory Bank at the start of each development session
2. Update relevant files after completing significant work
3. Reference specific sections when discussing project details
4. Use the Memory Bank as a source of truth for project status
