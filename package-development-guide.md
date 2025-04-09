# Package Development Guide

This guide provides detailed instructions for developing and maintaining the shared packages in the PopRev2 monorepo. Since our focus is on completing the packages before moving on to the apps, this guide will help ensure consistent, high-quality package development.

## Package Structure

Each package should follow this standard structure:

```
packages/[package-name]/
├── src/           # Source code
│   └── index.ts   # Main entry point that exports the public API
├── dist/          # Compiled output (generated)
├── tests/         # Tests
│   └── [name].test.ts
├── package.json   # Package configuration
├── tsconfig.json  # TypeScript configuration
└── README.md      # Documentation
```

## Development Workflow

### 1. Package Setup

For each package, ensure it has the proper configuration:

1. **package.json**:

   ```json
   {
     "name": "@ub-ecosystem/[package-name]",
     "version": "0.1.0",
     "description": "[Description]",
     "main": "dist/index.js",
     "types": "dist/index.d.ts",
     "scripts": {
       "build": "tsc",
       "test": "jest",
       "lint": "eslint src --ext .ts,.tsx",
       "clean": "rimraf dist",
       "prepublishOnly": "npm run clean && npm run build"
     },
     "dependencies": {
       // Package-specific dependencies
     },
     "devDependencies": {
       "typescript": "^5.0.0",
       "jest": "^29.0.0",
       "@types/jest": "^29.0.0",
       "eslint": "^8.0.0",
       "rimraf": "^5.0.0"
     }
   }
   ```

2. **tsconfig.json**:

   ```json
   {
     "extends": "../../config/tsconfig.base.json",
     "compilerOptions": {
       "outDir": "./dist",
       "rootDir": "./src",
       "declaration": true
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist", "tests"]
   }
   ```

3. **README.md**:
   - Package description
   - Installation instructions
   - Usage examples
   - API documentation

### 2. Development Process

Follow these steps when developing a package:

1. **Define the API**:

   - Clearly define what functionality the package will provide
   - Design a clean, intuitive API
   - Document the API in the README.md

2. **Implement the Core Functionality**:

   - Create the necessary files in the `src` directory
   - Implement the functionality according to the API design
   - Use TypeScript for type safety

3. **Export the Public API**:

   - In `src/index.ts`, export only what should be part of the public API
   - Use named exports for better tree-shaking
   - Example:

     ```typescript
     // Export types
     export * from "./types";

     // Export main functions
     export { functionA } from "./module-a";
     export { functionB, functionC } from "./module-b";

     // Export components (for UI packages)
     export { ComponentA } from "./components/component-a";
     ```

4. **Write Tests**:

   - Create tests in the `tests` directory
   - Aim for high test coverage
   - Test both happy paths and edge cases

5. **Build and Verify**:
   - Run `npm run build` to compile the package
   - Verify that the compiled output works as expected

### 3. Package Integration

To use a package within the monorepo:

1. **Add as a Dependency**:

   - In the consuming package or app's `package.json`:
     ```json
     "dependencies": {
       "@ub-ecosystem/[package-name]": "*"
     }
     ```

2. **Import and Use**:
   ```typescript
   import { functionA, ComponentA } from "@ub-ecosystem/[package-name]";
   ```

## Package-Specific Guidelines

### content-transformer

This package transforms content from various formats into a standardized internal format.

**Key Components**:

- `types.ts`: Define all types used in the transformation process
- `markdown-transformer.ts`: Transform markdown content
- `docx-transformer.ts`: Transform DOCX content
- `perplexity-transformer.ts`: Transform Perplexity content
- `content-normalizer.ts`: Normalize content structure
- `metadata-enricher.ts`: Enrich content with metadata
- `content-validator.ts`: Validate content structure

**API Design**:

```typescript
// Main transformation function
async function transformContent(
  content: string | Buffer,
  documentType: DocumentType,
  options?: TransformOptions
): Promise<TransformedDocument>;

// Helper functions
async function transformMarkdown(content: string): Promise<TransformedDocument>;
async function transformDocx(content: Buffer): Promise<TransformedDocument>;
// ... other helper functions
```

### ui

This package provides shared UI components for use across applications.

**Key Components**:

- `components/`: Directory containing all UI components
- `hooks/`: Custom React hooks
- `utils/`: Utility functions for UI components
- `styles/`: Shared styles and themes

**Component Structure**:

```
components/
├── [ComponentName]/
│   ├── index.ts        # Exports the component
│   ├── [ComponentName].tsx  # Component implementation
│   ├── [ComponentName].css  # Component styles (if not using CSS-in-JS)
│   └── [ComponentName].test.tsx  # Component tests
```

**API Design**:

```typescript
// Example component export
export interface ComponentProps {
  // Props definition
}

export function Component(props: ComponentProps): JSX.Element;
```

### data-models

This package defines shared data models and types used across the ecosystem.

**Key Components**:

- `models/`: Directory containing all data models
- `schemas/`: JSON schemas for validation
- `utils/`: Utility functions for working with the models

**API Design**:

```typescript
// Example model definition
export interface DocumentModel {
  // Model properties
}

// Example validation function
export function validateDocument(document: unknown): document is DocumentModel;
```

### reference-parser

This package parses and processes references within content.

**Key Components**:

- `parsers/`: Directory containing different reference parsers
- `resolvers/`: Reference resolution logic
- `formatters/`: Reference formatting utilities

**API Design**:

```typescript
// Main parsing function
export function parseReferences(content: string): Reference[];

// Reference resolution
export function resolveReference(reference: Reference): ResolvedReference;
```

## Testing Strategy

### Unit Tests

Write unit tests for each function and component:

```typescript
// Example test for a transformer function
describe("transformMarkdown", () => {
  it("should transform valid markdown", async () => {
    const markdown = "# Title\n\nContent";
    const result = await transformMarkdown(markdown);
    expect(result.content.type).toBe("root");
    expect(result.content.children[0].type).toBe("heading");
    // More assertions...
  });

  it("should handle empty input", async () => {
    const result = await transformMarkdown("");
    expect(result.content.children).toHaveLength(0);
  });

  // More test cases...
});
```

### Integration Tests

Write integration tests that verify packages work together:

```typescript
// Example integration test
describe("Content transformation and reference parsing", () => {
  it("should transform content and parse references", async () => {
    const markdown = "# Title\n\nSee [UB 1:1]";
    const transformed = await transformContent(markdown, "markdown");
    const references = parseReferences(transformed.text);
    expect(references).toHaveLength(1);
    expect(references[0].paper).toBe(1);
    expect(references[0].section).toBe(1);
  });
});
```

## Documentation

Each package should include:

1. **README.md**:

   - Package description
   - Installation instructions
   - Basic usage examples
   - Link to detailed API documentation

2. **API Documentation**:

   - Document each exported function, class, and type
   - Include parameter descriptions
   - Provide usage examples

3. **Inline Comments**:
   - Use JSDoc comments for functions and classes
   - Explain complex logic
   - Document edge cases and limitations

## Continuous Integration

Set up CI workflows to:

1. **Build packages**:

   - Verify that each package builds successfully

2. **Run tests**:

   - Run unit and integration tests
   - Generate coverage reports

3. **Lint code**:

   - Enforce code style and quality standards

4. **Check types**:
   - Verify TypeScript types are correct

## Versioning and Publishing

Follow semantic versioning (SemVer) for package versions:

- **Major version (1.0.0)**: Breaking changes
- **Minor version (0.1.0)**: New features, no breaking changes
- **Patch version (0.0.1)**: Bug fixes and minor changes

## Next Steps

1. **Audit Existing Packages**:

   - Review current implementation
   - Identify gaps and issues
   - Create a plan for each package

2. **Prioritize Development**:

   - Focus on core packages first (content-transformer, ui)
   - Then move to supporting packages

3. **Create Package Tests**:

   - Develop comprehensive test suites
   - Aim for high test coverage

4. **Document APIs**:
   - Create detailed API documentation
   - Provide usage examples
