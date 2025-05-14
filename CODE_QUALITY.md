# Code Quality Tools

This project uses several tools to ensure code quality and consistency across the codebase.

## ESLint

ESLint is configured to enforce code quality rules for JavaScript and TypeScript files. The configuration can be found in `.eslintrc.js`.

To run ESLint:

```bash
pnpm lint:js
```

To automatically fix ESLint issues:

```bash
pnpm lint:js:fix
```

### JSDoc Comments

ESLint is configured to enforce JSDoc comments for public functions, methods, and classes. This helps maintain good documentation throughout the codebase.

Example of a properly documented function:

```typescript
/**
 * Transforms markdown content into a structured document
 *
 * @param content - The markdown content to transform
 * @param options - Optional transformation options
 * @returns The transformed document
 */
function transformMarkdown(content: string, options?: TransformOptions): Document {
  // Implementation
}
```

## TypeScript Type Checking

TypeScript provides static type checking to catch errors early in the development process.

To run type checking:

```bash
pnpm type-check
```

To run type checking in watch mode:

```bash
pnpm type-check:watch
```

## Prettier

Prettier is used for code formatting. The configuration can be found in `.prettierrc`.

To format all files:

```bash
pnpm format
```

To check if files are formatted correctly:

```bash
pnpm format:check
```

## Stylelint

Stylelint is used for CSS linting. The configuration can be found in `.stylelintrc.json`.

To run Stylelint:

```bash
pnpm lint:css
```

## Pre-commit Hooks

This project uses Husky and lint-staged to run linters and formatters on staged files before committing.

When you commit changes, the pre-commit hook will:

1. Run ESLint on staged JavaScript and TypeScript files
2. Run Stylelint on staged CSS files
3. Format all staged files with Prettier
4. Run TypeScript type checking on staged files

This ensures that all committed code meets the project's quality standards.

## Commit Message Format

We use the Conventional Commits format for commit messages. This helps maintain a clear and structured commit history.

Format: `type(scope): description`

Examples:

- `feat(ui): add new button component`
- `fix(api): resolve issue with data fetching`
- `docs(readme): update installation instructions`

The commit-msg hook will validate your commit messages against this format.

## Continuous Integration

GitHub Actions workflows automatically run linting, type checking, and tests on pull requests and pushes to the main branch.

This ensures that code quality standards are maintained throughout the development process.

## VSCode Integration

The project includes VSCode settings and recommended extensions to provide a consistent development experience:

- Format on save
- ESLint and Stylelint integration
- Debugging configurations for Next.js

To get the best experience, install the recommended extensions when prompted by VSCode.
