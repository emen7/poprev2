# Paradise Finder Integration

This document outlines the plan for integrating the Paradise Finder application (https://github.com/emen7/findparadise) into the UB Ecosystem monorepo as an additional component.

## 1. Paradise Finder Overview

The Paradise Finder is an interactive application that helps users conceptualize and locate Paradise within the universe structure described in The Urantia Book. It will be integrated as a standalone application within the ecosystem, accessible via finder.masteruniverse.org.

## 2. Updated Domain Configuration

The domain configuration will be updated to include the Paradise Finder:

**packages/config/src/domains.ts** (updated)

```typescript
export type AppDomain = 'reader' | 'almanac' | 'publications' | 'lectionary' | 'finder';

export interface DomainConfig {
  subdomain: string;
  port: number;
  title: string;
  description: string;
}

export const domains: Record<AppDomain, DomainConfig> = {
  reader: {
    subdomain: 'reader',
    port: 3001,
    title: 'UB Reader',
    description: 'Read The Urantia Book online',
  },
  almanac: {
    subdomain: 'almanac',
    port: 3002,
    title: 'Master Universe Almanac',
    description: 'Explore the cosmology and personalities of the Urantia Book',
  },
  publications: {
    subdomain: 'publications',
    port: 3000,
    title: 'UB Publications',
    description: 'Publications and articles related to The Urantia Book',
  },
  lectionary: {
    subdomain: 'lectionary',
    port: 3003,
    title: 'UB Lectionary',
    description: 'Lectionary readings from The Urantia Book',
  },
  finder: {
    subdomain: 'finder',
    port: 3004,
    title: 'Paradise Finder',
    description: 'Interactive tool to conceptualize and locate Paradise',
  },
};
```

## 3. Monorepo Structure Update

The Paradise Finder will be added to the apps directory:

```
ub-ecosystem/
├── apps/
│   ├── reader/                 # UB Reader application
│   ├── almanac/                # Almanac application
│   ├── publications/           # Publications application
│   ├── lectionary/             # Lectionary application
│   └── finder/                 # Paradise Finder application
├── packages/
│   ├── ui/                     # Shared UI components
│   ├── content-transformer/    # Content transformation system
│   ├── table-transformer/      # HTML table transformation
│   ├── reference-parser/       # UB reference parsing and linking
│   ├── data-models/            # Shared data models and types
│   └── i18n/                   # Internationalization package
├── content/                    # Content directory
└── config/                     # Shared configuration
```

## 4. Integration Approach

### 4.1 Code Migration

The Paradise Finder application will be migrated from its current repository to the monorepo structure:

1. **Initial Import**

   - Clone the repository: https://github.com/emen7/findparadise
   - Analyze the codebase structure and dependencies
   - Create a new Next.js application in apps/finder

2. **Code Adaptation**

   - Update import paths to use the monorepo structure
   - Integrate with shared UI components
   - Implement the ecosystem navigation header/footer

3. **3D Visualization Components**
   - Extract 3D visualization components for potential reuse
   - Create a shared package if the components can be used in other apps

### 4.2 Integration with Other Apps

The Paradise Finder will be integrated with other applications in the ecosystem:

1. **Cross-Linking**

   - Add links to the Paradise Finder from relevant sections in the Reader
   - Create connections from the Almanac's cosmology sections
   - Implement deep linking to specific visualizations

2. **Shared Data**
   - Use shared data models for universe structures
   - Implement consistent terminology across applications
   - Ensure visualization aligns with descriptions in other apps

### 4.3 Enhanced Features

As part of the integration, consider enhancing the Paradise Finder with:

1. **Multi-Language Support**

   - Implement i18n for UI elements
   - Provide translations for key concepts
   - Support language switching consistent with other apps

2. **Accessibility Improvements**

   - Add descriptive text alternatives for visualizations
   - Ensure keyboard navigation for interactive elements
   - Provide high-contrast mode options

3. **Mobile Optimization**
   - Ensure responsive design for various screen sizes
   - Optimize 3D rendering for mobile devices
   - Implement touch-friendly controls

## 5. Implementation Timeline

The Paradise Finder integration will be incorporated into the overall implementation timeline:

### Phase 3: Content and Apps (Weeks 6-8)

- Set up Next.js app structure for all applications
- Create main pages and navigation
- **Add: Import Paradise Finder code**
- **Add: Adapt to monorepo structure**

### Phase 4: Multi-Language and Integration (Weeks 9-12)

- Implement language-specific routing
- Link applications with cross-references
- **Add: Enhance Paradise Finder with shared components**
- **Add: Implement cross-linking with other apps**

## 6. Conclusion

The Paradise Finder is a valuable addition to the UB Ecosystem, providing an interactive way to visualize and understand the complex cosmology described in The Urantia Book. By integrating it into the monorepo as finder.masteruniverse.org, we create a cohesive ecosystem of applications that work together to enhance the user's understanding and experience of The Urantia Book.

This integration will leverage shared components, consistent styling, and cross-application linking to create a seamless experience across the entire ecosystem. The Paradise Finder will benefit from the shared infrastructure for multi-language support, accessibility features, and responsive design.
