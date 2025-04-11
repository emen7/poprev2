# Urantia Book Content Integration: Visual Diagram

The following diagrams illustrate the key components and processes involved in integrating the Urantia Book content into our reader application.

## Content Structure

```mermaid
classDiagram
    class UBPart {
        +string id
        +number partNumber
        +string title
        +UBPaper[] papers
    }

    class UBPaper {
        +string id
        +number paperNumber
        +string title
        +string author
        +UBSection[] sections
    }

    class UBSection {
        +string id
        +number sectionNumber
        +string title
        +UBParagraph[] paragraphs
    }

    class UBParagraph {
        +string id
        +number paragraphNumber
        +string text
        +number indentation
        +Formatting formatting
    }

    class Formatting {
        +Range[] italic
        +Range[] bold
    }

    class Range {
        +number start
        +number end
    }

    UBPart "1" --> "*" UBPaper : contains
    UBPaper "1" --> "*" UBSection : contains
    UBSection "1" --> "*" UBParagraph : contains
    UBParagraph "1" --> "0..1" Formatting : has
    Formatting "1" --> "*" Range : contains
```

## Content Transformation Process

```mermaid
flowchart TD
    A[Source Content] --> B[Content Parser]
    B --> C[Transformation Pipeline]
    C --> D[Structured Content]
    D --> E[Validation]
    E --> F[Content Repository]

    G[Metadata Generator] --> H[Search Indices]
    G[Metadata Generator] --> I[TOC Structure]
    G[Metadata Generator] --> J[Reference Maps]

    F --> G

    H --> K[Content Service]
    I --> K
    J --> K

    K --> L[Reader UI]
```

## Content Loading Strategy

```mermaid
sequenceDiagram
    participant User
    participant UI as Reader UI
    participant CS as Content Service
    participant Cache as Content Cache
    participant Repo as Content Repository

    User->>UI: Select Paper
    UI->>CS: getPaper(paperNumber)
    CS->>Cache: checkCache(paperNumber)

    alt Paper in Cache
        Cache-->>CS: Return Cached Paper
    else Paper Not in Cache
        CS->>Repo: loadPaper(paperNumber)
        Repo-->>CS: Return Paper Data
        CS->>Cache: storeInCache(paper)
    end

    CS-->>UI: Return Paper
    UI->>UI: Render Paper

    User->>UI: Scroll to Section
    UI->>CS: getSection(paperNumber, sectionNumber)
    CS->>Cache: checkCache(paperNumber, sectionNumber)

    alt Section in Cache
        Cache-->>CS: Return Cached Section
    else Section Not in Cache
        CS->>Repo: loadSection(paperNumber, sectionNumber)
        Repo-->>CS: Return Section Data
        CS->>Cache: storeInCache(section)
    end

    CS-->>UI: Return Section
    UI->>UI: Render Section
```

## State Management Integration

```mermaid
flowchart TD
    A[Navigation State] --> B[Current Paper]
    A --> C[Current Section]
    A --> D[Navigation History]

    E[Selection State] --> F[Current Selection]
    E --> G[Saved Selections]
    E --> H[Selection Mode]

    I[Notes State] --> J[Paper Notes]
    I --> K[Section Notes]
    I --> L[Paragraph Notes]

    M[Pullup State] --> N[Active Tab]
    M --> O[Panel Height]
    M --> P[Persistent Mode]

    B --> Q[Content Service]
    C --> Q
    F --> R[Selection Service]
    G --> R
    J --> S[Notes Service]
    K --> S
    L --> S

    Q --> T[Reader UI]
    R --> T
    S --> T
    N --> T
    O --> T
    P --> T
```

## Implementation Timeline

```mermaid
gantt
    title UB Content Integration Timeline
    dateFormat  YYYY-MM-DD

    section Content Preparation
    Content Source Setup           :a1, 2025-04-10, 7d
    Content Structure Definition   :a2, after a1, 3d
    Content Repository Setup       :a3, after a2, 4d

    section Content Transformation
    Transformation Pipeline       :b1, after a3, 5d
    Metadata Generation           :b2, after b1, 3d
    Content Loading System        :b3, after b2, 6d

    section UI Enhancement
    Paper Navigation              :c1, after b3, 4d
    Section Navigation            :c2, after c1, 3d
    Breadcrumb Navigation         :c3, after c2, 2d

    section UB-Specific Components
    Enhanced Table of Contents    :d1, after c3, 4d
    Reference System              :d2, after d1, 5d
    Specialized Formatting        :d3, after d2, 3d

    section State Integration
    Navigation State Integration  :e1, after d3, 3d
    Pullup Panel Integration      :e2, after e1, 3d
    Selection Integration         :e3, after e2, 4d
```

These diagrams provide a visual representation of our content integration plan, showing the data structure, transformation process, loading strategy, state management integration, and implementation timeline.
