# Project Restart Guide

This guide provides instructions for shutting down the current development environment and restarting it smoothly for the next milestone.

## Current Project State

- **Directory Structure**: The project now has a clean structure with content directly under `src/content` instead of the nested `src/src/content` structure.
- **Git Repository**: The project is now properly set up with a Git repository at the root level, connected to GitHub at https://github.com/emen7/poprev2.
- **Deployment**: The project is successfully deployed to Vercel at https://poprev2-roo.vercel.app/test.

## Shutting Down

1. **Stop Running Processes**

   - Stop all running development servers and processes in the terminal
   - You can use Ctrl+C in each terminal tab to stop the processes

2. **Save Any Unsaved Files**

   - Make sure all changes are saved

3. **Commit Any Pending Changes**

   - If you have any uncommitted changes, commit them:
     ```bash
     git add .
     git commit -m "Your commit message here"
     git push origin main
     ```

4. **Close VSCode**
   - You can now safely close VSCode

## Restarting for Next Milestone

1. **Open the Project**

   - Open VSCode
   - Open the project folder: `c:/Users/neufe/Documents/aaWebHub/poprev2`

2. **Check Git Status**

   - Open a terminal in VSCode
   - Run `git status` to ensure everything is clean
   - If there are any pending changes from the previous session, decide whether to commit them or discard them

3. **Pull Latest Changes**

   - If you're working with others or made changes from another device:
     ```bash
     git pull origin main
     ```

4. **Install Dependencies (if needed)**

   - If there are new dependencies or you're starting fresh:
     ```bash
     cd src
     npm install
     ```

5. **Start Development Server**

   - Start the Next.js development server:
     ```bash
     cd src
     npm run dev
     ```

6. **Verify Everything Works**
   - Open http://localhost:3000/test in your browser
   - Verify that the test page loads correctly
   - Check that the search functionality works

## Important Files and Directories

- **Main Content Directory**: `src/content/` - This is where all content files are stored
- **Search Index Script**: `src/scripts/build-search-index.js` - This script generates the search index
- **Key Components**:
  - `src/components/document-reader.tsx` - Document reader component
  - `src/components/search/search-bar.tsx` - Search bar component
  - `src/components/layout/header.tsx` - Header component with search bar

## Common Commands

- **Start Development Server**: `cd src && npm run dev`
- **Build Search Index**: `cd src && node scripts/build-search-index.js`
- **Build for Production**: `cd src && npm run build`
- **Run Tests**: `cd src && npm test`

## Troubleshooting

- **Issue**: If you see errors related to `useSearchParams()` not being wrapped in a Suspense boundary

  - **Solution**: Ensure all components using `useSearchParams()` are wrapped in a Suspense boundary

- **Issue**: If the search index is not finding documents

  - **Solution**: Verify the document paths in `src/scripts/build-search-index.js` and run the script again

- **Issue**: If you see Git-related errors about nested repositories
  - **Solution**: Ensure there's no `.git` directory inside the `src` folder

## Next Milestone Preparation

Before starting the next milestone:

1. **Clean Up Old Directory Structure**

   - Remove the old `src/src/content` directory if it still exists:
     ```bash
     rm -rf src/src/content
     ```

2. **Review Documentation**

   - Review the `directory_restructuring_summary.md` file for a summary of changes made
   - Review the `directory_restructuring_plan.md` file for details on the restructuring process

3. **Check Vercel Deployment**
   - Verify that the Vercel deployment is still working at https://poprev2-roo.vercel.app/test

## Additional Notes

- The project is now set up with a clean directory structure that follows best practices
- All components using `useSearchParams()` are now properly wrapped in Suspense boundaries
- The search index is generated with 7 documents from the new directory structure
- The project is successfully deployed to Vercel and working on both desktop and mobile devices
