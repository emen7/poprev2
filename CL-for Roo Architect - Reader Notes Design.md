<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# Prompt for Roo Code Architect: Reader Notes and Clipboard Integration for UB Ecosystem

## Feature Overview

Create a robust Reader Notes and Clipboard system for the UB Ecosystem's Reader pullup component that implements core functionality inspired by Clipboard History Pro. This system should provide users with advanced notation, content management, and retrieval capabilities.

```
This is a suggestion for implementation, not a directive. Please use your judgment to determine the best technical approach while maintaining the core functionality described.
```


## Core Features to Implement

### 1. Clipboard and Note Entry Management

- **Note/Clip Storage Structure**:
    - Create a persistent storage system using IndexedDB for offline capability
    - Implement a structured data model with fields for:
        - Unique ID (UUID)
        - Content (text)
        - Source (page reference, URL, or document ID)
        - Timestamp (creation and last modified)
        - Tags/Labels (array)
        - Starred status (boolean)
        - Custom name/title (string)
        - Selection state (boolean)
- **Selection Interface**:
    - Add checkboxes next to each note/clip for selection
    - Implement select all/none toggles
    - Track selection state in local state and persist during session


### 2. Organization and Categorization

- **Labeling and Tagging System**:
    - Allow users to add custom names to saved notes/clips
    - Implement a tagging system with:
        - User-defined tags
        - Auto-suggested tags based on content
        - Tag filtering in UI
- **Starring/Favorites**:
    - Add star/unstar toggle for important notes
    - Create a dedicated "Starred" view/filter
    - Persist starred status in storage
- **Grouping Mechanism**:
    - Enable folder/collection creation for organizing related notes
    - Support drag-and-drop between groups
    - Allow notes to belong to multiple groups (many-to-many)


### 3. Batch Operations

- **Group Actions**:
    - Implement multi-select and batch operations:
        - Group copy (copies all selected notes to clipboard)
        - Group delete
        - Group export (as text, markdown, JSON)
        - Group tagging/labeling
        - Move to folder/collection
- **Export Options**:
    - Text export (plain text)
    - Markdown formatting
    - JSON for data portability
    - Citation formatting options


### 4. Search and Filter

- **Advanced Search**:
    - Full-text search across all notes
    - Filter by tags, date ranges, source, starred status
    - Sort options (newest, oldest, alphabetical)
    - Save search queries as custom filters
- **Quick Access**:
    - Recent items view
    - Most used items view
    - Smart suggestions based on current reading context


### 5. Synchronization and Persistence

- **Storage Strategy**:
    - Primary: IndexedDB for local storage
    - Backup: LocalStorage (with size limitations handled gracefully)
    - Implement storage quota monitoring and management
- **Future Cross-Device Capability**:
    - Design data model with synchronization in mind
    - Include timestamps and conflict resolution fields
    - Prepare sync adapter interface that can be implemented later
    - Add export/import functionality as interim solution


## UI/UX Considerations

- **Reader Pullup Panel**:
    - Create a slide-up or side panel for the notes system
    - Implement responsive design for mobile/desktop
    - Add keyboard shortcuts for quick note creation/retrieval
- **Note Entry UI**:
    - Clean, minimal card-based interface
    - Preview of note content with expandable view
    - Visual indicators for starred items, tags, etc.
    - Drag-and-drop for reorganization
- **Context Menu Integration**:
    - Right-click menu for text selection in reader
    - Quick actions (copy, save note, share, etc.)


## Technical Implementation Details

- **Component Structure**:

```jsx
// Suggested component hierarchy
&lt;ReaderNotesProvider&gt;
  &lt;ReaderNotesPanel&gt;
    &lt;NotesHeader /&gt;
    &lt;SearchAndFilter /&gt;
    &lt;NotesList&gt;
      &lt;NoteItem /&gt;
    &lt;/NotesList&gt;
    &lt;BatchOperationsToolbar /&gt;
  &lt;/ReaderNotesPanel&gt;
&lt;/ReaderNotesProvider&gt;
```

- **Data Flow**:
    - Implement React context for notes state management
    - Use reducer pattern for complex state operations
    - Create custom hooks for note operations:
        - `useNotes()` - Basic CRUD operations
        - `useNoteSelection()` - Selection management
        - `useNoteSync()` - Future sync capabilities
- **Storage Interface**:

```typescript
// Define clear interfaces for storage operations
interface NoteStorageAdapter {
  getNotes(): Promise&lt;Note[]&gt;;
  saveNote(note: Note): Promise&lt;string&gt;;
  deleteNote(id: string): Promise&lt;boolean&gt;;
  updateNote(id: string, updates: Partial&lt;Note&gt;): Promise&lt;Note&gt;;
  searchNotes(query: string): Promise&lt;Note[]&gt;;
  // Additional methods for batch operations
}
```

- **Error Handling and Fallbacks**:
    - Implement robust error boundaries
    - Add fallback UI for storage failures
    - Include automatic recovery mechanisms


## Performance Considerations

- Implement virtualized lists for large collections of notes
- Use memoization for expensive operations (filtering, sorting)
- Implement debouncing for search operations
- Add lazy loading for note content when appropriate


## Testing Strategy

- Unit tests for core note operations
- Integration tests for storage adapters
- End-to-end tests for main user flows
- Performance tests for large datasets


## Documentation

- Add comprehensive JSDoc comments for all components and functions
- Create usage examples in markdown
- Document storage schema and data models

```
Remember that this implementation should integrate smoothly with the existing UB Ecosystem architecture while maintaining consistency with the overall application design patterns.
```

<div style="text-align: center">⁂</div>

[^1]: https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/org_9ab1d7a2-5c5a-470c-beac-ca0f23bf1fde/72153f9d-b882-4198-944c-47becb0342ef/DR-UB-Ecosystem-Monorepo_-Potential-Pitfalls-and-Impr.md

[^2]: https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/org_9ab1d7a2-5c5a-470c-beac-ca0f23bf1fde/e98aaad2-cbee-4898-a291-611263bcab3d/PPLX-on-db-creation.md

[^3]: https://docs.google.com/document/d/1iHDO2xlnIw9043Vg2YfcvjMt4qVFgsWI4IxgvsM1xuQ/edit?usp=drivesdk

[^4]: https://drive.google.com/file/d/1Q611V-hcT4QvWlCHppHV_cAnr_3uzarG/view?usp=drivesdk

[^5]: https://docs.google.com/document/d/1E5X_41VhtWH6VHeswP1_17nFLN9uBQwd/edit?usp=drivesdk\&ouid=104984388845115004014\&rtpof=true\&sd=true

[^6]: https://docs.google.com/document/d/1JUAO5VGhDfCFHnVQJQPo_9eRvATGK2Ai/edit?usp=drivesdk\&ouid=104984388845115004014\&rtpof=true\&sd=true

[^7]: https://drive.google.com/file/d/1VUs_ZnYiDHn34IlC2_sd-pDLaRPfsc-J/view?usp=drivesdk

[^8]: https://drive.google.com/file/d/1J22rRopHwQyr8-Me1bY-PmfErPVbG8xT/view?usp=drivesdk

[^9]: https://github.com/GreatScottyMac/RooFlow

[^10]: https://github.com/GreatScottyMac/roo-code-memory-bank/blob/main/developer-primer.md

[^11]: https://github.com/microsoft/vscode-webview-ui-toolkit/blob/main/src/checkbox/README.md

[^12]: https://apidog.com/blog/roocode-boomerang-ai-agent/

[^13]: https://stackoverflow.com/questions/67535557/how-to-enable-checkboxes-in-markdown-preview-for-vscode/70702753

[^14]: https://drive.google.com/file/d/1nGMle6t7588N9vWVsADPzkSqPK68exhk/view?usp=drivesdk

[^15]: https://drive.google.com/file/d/1b5tFj1gSWneJ5ApjHf_yzQ66ZlymeRZK/view?usp=drivesdk

[^16]: https://drive.google.com/file/d/1JSOFyBWkbDghzXbMI5CuP-_kckF0O3C9/view?usp=drivesdk

[^17]: https://drive.google.com/file/d/1ai9sQY2iUQv0epWxagYuk0qsQasFmPRg/view?usp=drivesdk

[^18]: https://drive.google.com/file/d/1SiQpHmorLC3asb0PLx-OW4-V3hnRaotm/view?usp=drivesdk

[^19]: https://drive.google.com/file/d/12MS-TBefKMAKcwIpH0rm-DJuRDd20qjq/view?usp=drivesdk

[^20]: https://drive.google.com/file/d/13ORWEy4DH_lHzvDUZMGrtox2Buy9nh1g/view?usp=drivesdk

[^21]: https://www.reddit.com/r/RooCode/comments/1jz86l0/first_opinions_of_roo_code_boomerang_tasks_with/

[^22]: https://www.youtube.com/watch?v=r5T3h0BOiWw

[^23]: https://ocdevel.com/mlg/mla-23

[^24]: https://www.youtube.com/watch?v=bMUMWG2IS0o

[^25]: https://github.com/GreatScottyMac/RooFlow/releases

[^26]: https://github.com/GreatScottyMac/roo-code-memory-bank/blob/main/README.md

[^27]: https://x.com/JulianGoldieSEO/status/1907876011032850485

[^28]: https://stackoverflow.com/questions/76649784/vs-code-circa-1-80-terminal-partially-covered-by-a-black-box-why

[^29]: https://code.visualstudio.com/docs/editor/settings-sync

[^30]: https://ocdevel.com/mlg/mla-22

[^31]: https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/aws-tookit-vscode-ug.pdf

[^32]: https://www.reddit.com/r/CodingHelp/comments/1h5hze5/vs_code_cross_device/

[^33]: https://docs.gitlab.co.jp/ee/topics/gitlab_flow.html

[^34]: https://code.visualstudio.com/docs/intelligentapps/bulkrun

[^35]: https://www.youtube.com/watch?v=rg_g3BPv4uQ

