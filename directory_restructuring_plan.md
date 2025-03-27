# Directory Restructuring Plan for PopRev2

## Current Structure Analysis

Based on the error messages and file paths observed, the current project structure appears to be:

```
/poprev2/
  /src/                  # Main Next.js application code
    /app/                # Next.js app router pages
    /components/         # React components
    /lib/                # Utility libraries
    /src/                # Nested src directory (problematic)
      /content/          # Content files
        /raw/            # Raw content
          /scientific/   # Scientific content
            /markdown/   # Markdown files
          /perplexity/   # Perplexity content
          /lectionary/   # Lectionary content
          /catechism/    # UB Catechism content
```

This structure has a nested `/src/src/` path which can cause confusion and make imports unnecessarily verbose.

## Proposed New Structure

```
/poprev2/
  /src/                  # Main Next.js application code
    /app/                # Next.js app router pages
    /components/         # React components
    /lib/                # Utility libraries
    /content/            # Content files (moved up one level)
      /raw/              # Raw content
        /scientific/     # Scientific content
          /markdown/     # Markdown files
        /perplexity/     # Perplexity content
        /lectionary/     # Lectionary content
        /catechism/      # UB Catechism content
```

This structure eliminates the nested `src` directory by moving the `content` directory up one level.

## Migration Plan

### Phase 1: Preparation

1. **Create a Git Branch**

   ```bash
   git checkout -b restructure-directories
   ```

2. **Backup Important Data**
   ```bash
   # Create a backup of the content directory
   cp -r src/src/content ./content-backup
   ```

### Phase 2: Directory Restructuring

1. **Create the New Directory Structure**

   ```bash
   # Create the new content directory at the correct level
   mkdir -p src/content
   ```

2. **Move Content Files**
   ```bash
   # Move all content from the nested directory to the new location
   mv src/src/content/* src/content/
   ```

### Phase 3: Code Updates

1. **Update Import Paths**

   - Search for all instances of imports or references to the old path structure
   - Replace `src/src/content` with `src/content` in all files

   ```bash
   # Find all files that reference the old path
   grep -r "src/src/content" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" ./src
   ```

2. **Update API Routes**

   - Modify any API routes that reference the old content paths
   - Focus on the document API route we created at `/api/scientific/document/[id]`

3. **Update Search Component**

   - Update the search results component to use the new path structure for document IDs

4. **Update Configuration Files**
   - Check for any path configurations in Next.js config files
   - Update any build scripts or other configurations that might reference the old paths

### Phase 4: Testing

1. **Run the Development Server**

   ```bash
   npm run dev
   ```

2. **Test All Functionality**

   - Verify that the search functionality works
   - Check that document viewing works
   - Ensure navigation between pages is functioning

3. **Check for Console Errors**
   - Look for any path-related errors in the browser console
   - Address any issues found

### Phase 5: Cleanup

1. **Remove the Old Directory Structure**

   ```bash
   # Only after confirming everything works
   rm -rf src/src
   ```

2. **Update Documentation**

   - Update any documentation that references the old directory structure
   - Update the README.md file with the new structure

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "Restructure directories to eliminate nested src folders"
   ```

## Code Changes Required

### 1. Update Document API Route

```typescript
// File: src/app/api/scientific/document/[id]/route.ts
// Change:
// const filePath = path.join(process.cwd(), 'src', 'src', 'content', 'raw', 'scientific', 'markdown', filename);
// To:
const filePath = path.join(
  process.cwd(),
  "src",
  "content",
  "raw",
  "scientific",
  "markdown",
  filename
);
```

### 2. Update Search Results Component

```typescript
// File: src/components/search/search-results.tsx
// If there are any hardcoded paths, update them
```

### 3. Update Document Transformer

```typescript
// File: src/lib/document-transformer/index.ts
// Update any paths that reference the content directory
```

## Potential Challenges and Solutions

### Challenge 1: Path References in Multiple Files

**Solution:** Use a global search and replace tool to find all instances of the old path. VSCode's search functionality can help with this.

### Challenge 2: Dynamic Path Construction

**Solution:** Look for code that dynamically constructs paths and ensure it's updated to use the new structure.

### Challenge 3: Build Process Dependencies

**Solution:** Check the Next.js build configuration and any custom scripts to ensure they're aware of the new structure.

## Future-Proofing Recommendations

1. **Use Path Aliases**

   - Configure path aliases in `tsconfig.json` to make imports cleaner and easier to update in the future

   ```json
   {
     "compilerOptions": {
       "paths": {
         "@content/*": ["./src/content/*"],
         "@components/*": ["./src/components/*"],
         "@lib/*": ["./src/lib/*"]
       }
     }
   }
   ```

2. **Create a Content Access Layer**

   - Implement a content access layer that abstracts the physical file structure
   - This would make future restructuring easier as only the access layer would need updates

3. **Document the Directory Structure**
   - Add a `STRUCTURE.md` file that explains the project's directory structure
   - This helps new developers understand the organization and prevents accidental creation of problematic structures

## Conclusion

This restructuring will eliminate the confusing nested `src` directories while maintaining all functionality. The plan provides a step-by-step approach to safely migrate the directory structure with minimal risk.

After completing this restructuring, the project will have a cleaner, more maintainable directory structure that follows standard conventions and is easier for developers to navigate.
