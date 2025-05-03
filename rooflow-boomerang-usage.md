# RooFlow and Boomerang Usage Guide

## RooFlow Memory Bank

**Automatic Features:**

- The memory bank files are automatically read by the AI to maintain context across sessions
- The AI will reference and update these files without explicit commands from you
- Context persistence happens in the background

**Manual Actions Required:**

- None for basic usage - the memory bank works automatically once set up
- You may occasionally want to review or manually edit the memory bank files if you need to correct information

## Boomerang Task Orchestration

**Automatic Features:**

- The workflow configuration in roocode.config.json is automatically respected
- The delegation pattern from architect to code/debug modes is configured in the system

**Manual Actions Required:**

- To initiate a Boomerang task flow, you need to:
  1. Start in architect mode (which you're currently in)
  2. When you want to delegate a task, the architect mode should use the `switch_mode` tool to hand off to boomerang-mode
  3. Boomerang mode will then use the `new_task` tool to delegate to specialized modes
  4. The specialized modes will use `attempt_completion` when finished

In summary: RooFlow's memory bank works automatically in the background, while Boomerang requires explicit mode switching to initiate the task delegation flow.
