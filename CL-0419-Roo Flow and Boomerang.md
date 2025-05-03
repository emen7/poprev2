# Briefly describe what Roo Flow is. I believe it has something to do with the AI having memory of tasks. And that it needs special implementation to be used with boomerang.

RooFlow is an enhancement for AI-assisted development in VS Code that provides persistent project context and streamlined workflow through a structured memory system. It builds upon Roo Code's capabilities with several key improvements.

## Core Features of RooFlow

**Persistent Project Context:** RooFlow ensures your AI assistant maintains a deep understanding of your project across sessions, even after interruptions[^1]. This is accomplished through a "Memory Bank" system that stores project knowledge in structured markdown files[^1][^4].

**Memory Bank Structure:** The Memory Bank is implemented as a directory in your project's root containing several specialized files:

- `activeContext.md`: Tracks current session information and goals
- `productContext.md`: Contains high-level project information
- `decisionLog.md`: Records architectural and implementation decisions
- `progress.md`: Documents completed work and upcoming tasks[^1][^4]

**Optimized Mode System:** RooFlow includes five integrated modes (Architect, Code, Test, Debug, and Ask) that work together seamlessly while sharing information through the Memory Bank[^1].

**Token Efficiency:** The system is designed to use fewer tokens than previous approaches, making it more cost-effective[^1].

## Connection to Boomerang

Boomerang is a specialized task orchestration system that works with RooFlow but functions differently than standard modes. While regular RooFlow modes typically hand off directly to each other, Boomerang:

1. Acts as an orchestrator that delegates tasks to appropriate specialized modes[^1][^2]
2. Uses a delegation pattern (new_task) rather than direct switch_mode handoffs[^1]
3. Receives completed work through an attempt_completion mechanism[^1]
4. Creates a loop where tasks are assigned, executed, returned, and repeated[^2][^5]

**Implementation Requirements:**
To use Boomerang with RooFlow, you need to add specific JSON configurations to your `.roomodes` file[^5]. The RooFlow repository includes the necessary components in its modules directory, and you would need to modify configurations like `modes.yml` to ensure your Boomerang implementation interacts correctly with other modes[^1].

This combination of persistent memory and task orchestration enables more sophisticated, autonomous development workflows while maintaining context between sessions.

<div style="text-align: center">⁂</div>

[^1]: https://github.com/GreatScottyMac/RooFlow

[^2]: https://www.linkedin.com/posts/reuvencohen_roo-codes-boomerang-task-orchestration-activity-7316855810234490880-cYBO

[^3]: https://substack.com/home/post/p-159727392

[^4]: https://spin.atomicobject.com/roo-code-ai-assisted-development/

[^5]: https://www.youtube.com/watch?v=vooolVLItTQ

[^6]: https://www.reddit.com/r/RooCode/comments/1jlrmws/tutorial_roo_code_complete_setup/?tl=hi-latn

[^7]: https://www.reddit.com/r/RooCode/comments/1jm48o1/simplified_roo_flow_with_orchestrator_mode/

[^8]: https://www.reddit.com/r/RooCode/comments/1joeg7e/new_tutorial_for_setup_roo_code/

[^9]: https://github.com/GreatScottyMac/roo-code-memory-bank/blob/main/updates.md

[^10]: https://gist.github.com/ruvnet/a206de8d484e710499398e4c39fa6299

[^11]: https://docs.crewai.com/concepts/flows

[^12]: https://apidog.com/blog/roocode-boomerang-ai-agent

[^13]: https://ocdevel.com/blog/20250331-roo-code-power-usage

[^14]: https://docs.roocode.com/community/
