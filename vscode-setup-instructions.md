# VS Code Setup Instructions

## Resolving TypeScript Formatter Conflicts

To resolve the TypeScript formatter conflicts and improve your development experience, follow these steps:

### 1. Create or Update VS Code Settings

Create a `.vscode/settings.json` file in your project root with the following content:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

> **Note**: If you prefer a different formatter, replace `"esbenp.prettier-vscode"` with your preferred formatter ID, such as `"dbaeumer.vscode-eslint"` for ESLint.

### 2. Close and Reopen VS Code

1. Close all open tabs in VS Code
2. Exit VS Code completely
3. Reopen VS Code and your project

This will refresh VS Code's file cache and state, resolving issues with tabs that reference files that no longer exist.

### 3. Install Required Extensions

Ensure you have the necessary extensions installed:

1. Prettier - Code formatter (`esbenp.prettier-vscode`)
2. ESLint (`dbaeumer.vscode-eslint`)

### 4. Configure Prettier (Optional)

If you're using Prettier, create a `.prettierrc` file in your project root:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

## Additional VS Code Optimizations

### Workspace Recommendations

Create a `.vscode/extensions.json` file to recommend extensions for your project:

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-typescript-vscode.typescript-language-features"
  ]
}
```

### TypeScript Configuration

Ensure your VS Code uses the workspace version of TypeScript:

```json
{
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

Add this to your `.vscode/settings.json` file.

## Implementation Steps

1. Switch to Code mode to implement these changes
2. Create the necessary configuration files
3. Restart VS Code
4. Verify that the TypeScript formatter conflict is resolved
