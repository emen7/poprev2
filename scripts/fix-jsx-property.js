/**
 * Script to fix unknown 'jsx' property issues in React components
 * 
 * This script:
 * 1. Finds all TSX files in the ub-reader app
 * 2. Replaces jsx="..." with data-jsx="..." to avoid ESLint errors
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Get all TSX files in the ub-reader app
const files = glob.sync('apps/ub-reader/**/*.tsx', {
  ignore: [
    'apps/ub-reader/node_modules/**',
    'apps/ub-reader/.next/**',
    'apps/ub-reader/dist/**',
  ],
});

console.log(`Found ${files.length} TSX files to process`);

// Process each file
files.forEach(filePath => {
  try {
    console.log(`Processing ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Count original jsx properties
    const jsxPropCount = (content.match(/jsx=["']/g) || []).length;
    
    // Fix: Replace jsx="..." with data-jsx="..."
    content = content.replace(/jsx=(["'])/g, 'data-jsx=$1');
    
    // Report changes
    if (jsxPropCount > 0) {
      console.log(`  Replaced ${jsxPropCount} jsx properties with data-jsx`);
      
      // Write the modified content back to the file
      fs.writeFileSync(filePath, content, 'utf8');
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
});

console.log('Finished processing files');
