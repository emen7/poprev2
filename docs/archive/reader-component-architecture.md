# UB Reader Component Architecture

This document provides a visual representation of the UB Reader component architecture, including the integration of the navigation and settings components.

## Component Hierarchy

```mermaid
graph TD
    Reader[Reader Component] --> ReaderHeader[ReaderHeader]
    Reader --> ReaderMain[ReaderMain]

    ReaderHeader --> ReaderNavigation[ReaderNavigation]
    ReaderHeader --> ReaderSettings[ReaderSettings]
    ReaderHeader --> ReaderTitle[ReaderTitle]

    ReaderMain --> ReaderContent[ReaderContent]

    ReaderNavigation --> NavParts[Part Navigation]
    ReaderNavigation --> NavPapers[Paper Navigation]
    ReaderNavigation --> NavSections[Section Navigation]

    ReaderSettings --> DisplaySettings[Display Settings]
    ReaderSettings --> ReadingSettings[Reading Settings]
    ReaderSettings --> ExtensionSettings[Extension Settings]

    ReaderContent --> ContentSections[Section Rendering]
    ReaderContent --> ContentParagraphs[Paragraph Rendering]
    ReaderContent --> ContentReferences[Reference Rendering]

    ExtensionSettings --> ScientificSettings[Scientific Extension Settings]
    ExtensionSettings --> AlmanacSettings[Almanac Extension Settings]
    ExtensionSettings --> LectionarySettings[Lectionary Extension Settings]

    style Reader fill:#f9f,stroke:#333,stroke-width:2px
    style ReaderNavigation fill:#bbf,stroke:#333,stroke-width:2px
    style ReaderSettings fill:#bbf,stroke:#333,stroke-width:2px
```

## Component Interactions

```mermaid
sequenceDiagram
    participant User
    participant Reader
    participant Navigation
    participant Settings
    participant Content
    participant Extensions

    User->>Reader: Open document
    Reader->>Content: Render document
    Reader->>Navigation: Initialize navigation
    Reader->>Settings: Initialize settings

    User->>Navigation: Toggle navigation panel
    Navigation->>Reader: Update UI state

    User->>Navigation: Select section
    Navigation->>Content: Scroll to section

    User->>Settings: Toggle settings panel
    Settings->>Reader: Update UI state

    User->>Settings: Change theme
    Settings->>Reader: Update config
    Reader->>Content: Apply new theme

    User->>Settings: Adjust extension settings
    Settings->>Extensions: Update extension config
    Extensions->>Content: Apply extension changes
```

## Data Flow

```mermaid
flowchart TD
    Document[Document Model] --> Reader
    Config[Reader Config] --> Reader

    Reader --> |Document| Navigation
    Reader --> |Document| Content
    Reader --> |Config| Settings

    Navigation --> |Section Selection| Reader
    Settings --> |Config Updates| Reader

    Reader --> |Updated Config| Content
    Reader --> |Extension Config| Extensions

    Extensions --> |Rendered Components| Content

    style Document fill:#ffd,stroke:#333,stroke-width:2px
    style Config fill:#ffd,stroke:#333,stroke-width:2px
```

## Extension System

```mermaid
graph TD
    ExtensionRegistry[Extension Registry] --> ScientificExt[Scientific Extension]
    ExtensionRegistry --> AlmanacExt[Almanac Extension]
    ExtensionRegistry --> LectionaryExt[Lectionary Extension]

    ScientificExt --> ScientificComponents[Components]
    ScientificExt --> ScientificHooks[Hooks]
    ScientificExt --> ScientificUtils[Utilities]
    ScientificExt --> ScientificSettings[Settings UI]

    AlmanacExt --> AlmanacComponents[Components]
    AlmanacExt --> AlmanacHooks[Hooks]
    AlmanacExt --> AlmanacUtils[Utilities]
    AlmanacExt --> AlmanacSettings[Settings UI]

    LectionaryExt --> LectionaryComponents[Components]
    LectionaryExt --> LectionaryHooks[Hooks]
    LectionaryExt --> LectionaryUtils[Utilities]
    LectionaryExt --> LectionarySettings[Settings UI]

    Reader --> ExtensionRegistry

    style ExtensionRegistry fill:#dfd,stroke:#333,stroke-width:2px
```

## Navigation Component Structure

```mermaid
graph TD
    ReaderNavigation[ReaderNavigation] --> NavHeader[Navigation Header]
    ReaderNavigation --> NavBody[Navigation Body]
    ReaderNavigation --> NavFooter[Navigation Footer]

    NavHeader --> ActivePart[Active Part]
    NavBody --> PapersList[Papers List]
    NavFooter --> InactiveParts[Inactive Parts]

    ActivePart --> PartToggle[Part Toggle]
    ActivePart --> PartContent[Part Content]

    PapersList --> PaperItem[Paper Item]
    PaperItem --> PaperLink[Paper Link]

    InactiveParts --> PartToggle2[Part Toggle]
    InactiveParts --> PartContent2[Part Content]

    style ReaderNavigation fill:#bbf,stroke:#333,stroke-width:2px
```

## Settings Component Structure

```mermaid
graph TD
    ReaderSettings[ReaderSettings] --> SettingsHeader[Settings Header]
    ReaderSettings --> SettingsSections[Settings Sections]

    SettingsSections --> DisplaySection[Display Section]
    SettingsSections --> ReadingSection[Reading Section]
    SettingsSections --> ExtensionSection[Extension Sections]

    DisplaySection --> ThemeOption[Theme Options]
    DisplaySection --> FontOption[Font Options]

    ReadingSection --> SpacingOption[Spacing Options]
    ReadingSection --> WidthOption[Width Options]

    ExtensionSection --> ExtOption[Extension-specific Options]

    style ReaderSettings fill:#bbf,stroke:#333,stroke-width:2px
```

This visual representation helps illustrate how the navigation and settings components integrate with the existing Reader component architecture, showing the hierarchical structure, interactions between components, and data flow throughout the system.
