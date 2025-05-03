/**
 * Script to fix unused variables in TypeScript files
 * 
 * This script:
 * 1. Finds all TS/TSX files in the ub-reader app
 * 2. Renames unused variables by adding an underscore prefix
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Get all TS/TSX files in the ub-reader app
const files = glob.sync('apps/ub-reader/**/*.{ts,tsx}', {
  ignore: [
    'apps/ub-reader/node_modules/**',
    'apps/ub-reader/.next/**',
    'apps/ub-reader/dist/**',
    '**/*.d.ts',
  ],
});

console.log(`Found ${files.length} files to process`);

// Common patterns for unused variables
const patterns = [
  {
    // Destructuring assignment
    regex: /const\s+\{\s*([a-zA-Z0-9]+)(?:\s*,|\s*\})/g,
    replacement: (match, p1) => match.replace(p1, `_${p1}`)
  },
  {
    // Function parameters
    regex: /\(\s*([a-zA-Z0-9]+)(?:\s*:|,|\s*\))/g,
    replacement: (match, p1) => match.replace(p1, `_${p1}`)
  },
  {
    // Variable declarations
    regex: /const\s+([a-zA-Z0-9]+)\s*=/g,
    replacement: (match, p1) => match.replace(p1, `_${p1}`)
  },
  {
    // Function parameters with type
    regex: /\(\s*([a-zA-Z0-9]+)\s*:\s*[a-zA-Z<>[\]{}|&]+\s*\)/g,
    replacement: (match, p1) => match.replace(p1, `_${p1}`)
  }
];

// List of known unused variables from ESLint output
const knownUnusedVars = [
  'setNotes',
  'activeNoteId',
  'setIsPersistent',
  'handleNoteCreate',
  'handleQuoteCreate',
  'showHighlights',
  'uiTheme',
  'extensionId',
  'extensionTocComponents',
  'extensionSettingsComponents',
  'isNavigationOpen',
  'isSettingsOpen',
  'setContent',
  'paperTitle',
  'partTitle',
  'getPreviousPaper',
  'getNextPaper',
  'DEFAULT_CONFIG',
  'isDarkMode'
];

// Process each file
files.forEach(filePath => {
  try {
    console.log(`Processing ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    let changes = 0;
    
    // Fix unused variables by adding underscore prefix
    knownUnusedVars.forEach(varName => {
      // Only rename if not already prefixed with underscore
      if (!content.includes(`_${varName}`)) {
        // Different patterns for different variable contexts
        const patterns = [
          // Destructuring assignment
          { 
            regex: new RegExp(`(\\{\\s*(?:[a-zA-Z0-9]+,\\s*)*)(${varName})(\\s*(?:,|\\}))`, 'g'),
            replacement: `$1_${varName}$3`
          },
          // Variable declaration
          {
            regex: new RegExp(`(const\\s+)(${varName})(\\s*=)`, 'g'),
            replacement: `$1_${varName}$3`
          },
          // Function parameter
          {
            regex: new RegExp(`(\\(\\s*(?:[a-zA-Z0-9]+,\\s*)*)(${varName})(\\s*(?::|,|\\)))`, 'g'),
            replacement: `$1_${varName}$3`
          }
        ];
        
        // Apply each pattern
        patterns.forEach(pattern => {
          const newContent = content.replace(pattern.regex, pattern.replacement);
          if (newContent !== content) {
            content = newContent;
            changes++;
          }
        });
      }
    });
    
    // Report changes
    if (changes > 0) {
      console.log(`  Renamed ${changes} unused variables with underscore prefix`);
      
      // Write the modified content back to the file
      fs.writeFileSync(filePath, content, 'utf8');
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
});

console.log('Finished processing files');
