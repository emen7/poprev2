# Repository Cleanup: Revised Plan

## Current Status Assessment

The repository is currently undergoing restructuring according to the master plan. Progress has been made in several areas:

1. **Package Migration**:

   - Document transformer code has been successfully migrated from `src/lib/document-transformer/` to `packages/content-transformer/src/`
   - UI components are being migrated to `packages/ui/`

2. **Sandbox Creation**:

   - The sandbox directory has been set up with the necessary structure
   - The original `src` directory now only contains `node_modules/`

3. **Issues Identified**:
   - VS Code has tabs open for files that no longer exist on disk
   - TypeScript formatting conflicts are occurring
   - The sandbox is not being actively used but is causing development issues

## Revised Goals and Priorities

Based on the current status and priorities, this revised plan focuses on:

1. **Package Development First**: Complete and optimize the packages (content-transformer, ui, etc.) before focusing on apps
2. **Clean Development Environment**: Resolve VS Code and TypeScript issues for a smoother development experience
3. **Simplified Structure**: Streamline the repository structure to focus on what's actually being used

## Immediate Action Items

### 1. Resolve VS Code and TypeScript Issues

1. **Close and Reopen VS Code**:

   - Close all open tabs in VS Code
   - Restart VS Code to refresh its file cache and state

2. **Configure TypeScript Formatter**:
   - Create or update `.vscode/settings.json` with formatter preferences:
   ```json
   {
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "[typescript]": {
       "editor.defaultFormatter": "esbenp.prettier-vscode"
     },
     "[typescriptreact]": {
       "editor.defaultFormatter": "esbenp.prettier-vscode"
     }
   }
   ```
   - Adjust the formatter name if you're using a different one (e.g., "dbaeumer.vscode-eslint")

### 2. Complete Package Migration and Development

1. **Verify Content Transformer Package**:

   - Ensure all files have been properly migrated
   - Update package.json with correct dependencies
   - Add proper tests for the package

2. **Complete UI Package Migration**:

   - Finish migrating components from `src/components/` to `packages/ui/src/`
   - Ensure proper exports in `packages/ui/src/index.ts`
   - Add tests for UI components

3. **Develop Other Packages**:
   - Focus on completing the remaining packages:
     - data-models
     - reference-parser
     - audio-services
     - table-transformer

### 3. Streamline Repository Structure

1. **Evaluate Sandbox Necessity**:

   - Since the sandbox is not being actively used, consider:
     - Option A: Keep it as a minimal example environment
     - Option B: Remove it entirely to simplify the repository

2. **If Keeping Sandbox (Option A)**:

   - Simplify it to contain only essential examples
   - Ensure it properly imports from packages
   - Fix any TypeScript or import errors

3. **If Removing Sandbox (Option B)**:
   - Back up any potentially useful code
   - Remove the sandbox directory
   - Update documentation to reflect the change

### 4. Update Documentation

1. **Update README Files**:

   - Ensure the main README reflects the current structure
   - Update package READMEs with usage instructions

2. **Update Architecture Documentation**:
   - Move any remaining architecture documents to `docs/architecture/`
   - Update diagrams to reflect the current structure

## Package Development Guidelines

For each package, follow these guidelines:

1. **Structure**:

   ```
   packages/[package-name]/
   ├── src/           # Source code
   ├── dist/          # Compiled output
   ├── tests/         # Tests
   ├── package.json   # Package configuration
   ├── tsconfig.json  # TypeScript configuration
   └── README.md      # Documentation
   ```

2. **Package.json Template**:

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
       "lint": "eslint src --ext .ts,.tsx"
     },
     "dependencies": {
       // Package-specific dependencies
     },
     "devDependencies": {
       "typescript": "^5.0.0",
       "jest": "^29.0.0",
       "@types/jest": "^29.0.0",
       "eslint": "^8.0.0"
     }
   }
   ```

3. **Exports**:
   - Each package should have a clear entry point in `src/index.ts`
   - Export all public APIs from this file
   - Use named exports for better tree-shaking

## Next Steps After Package Development

Once the packages are complete and stable:

1. **App Development**:

   - Begin developing the apps (reader, publications, almanac)
   - Ensure they properly import from the packages
   - Develop app-specific features

2. **Integration Testing**:

   - Create integration tests that verify the apps work with the packages
   - Test the entire system end-to-end

3. **Deployment Configuration**:
   - Set up deployment pipelines for the apps
   - Configure CI/CD for the packages

## Success Criteria

The repository cleanup will be considered successful when:

1. All packages are properly structured and functioning
2. VS Code and TypeScript issues are resolved
3. The repository structure is clean and focused on what's being used
4. Documentation is up-to-date and accurate
5. Developers can work efficiently without encountering strange loops or formatting issues
