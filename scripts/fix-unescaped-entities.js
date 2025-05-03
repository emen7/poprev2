/**
 * Script to fix unescaped HTML entities in React components
 * 
 * This script:
 * 1. Finds all TSX files in the ub-reader app
 * 2. Replaces unescaped quotes and apostrophes with their HTML entity equivalents
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
    
    // Count original unescaped entities
    const singleQuoteCount = (content.match(/(\s|>)'(\w)/g) || []).length;
    const doubleQuoteCount = (content.match(/(\s|>)"(\w)/g) || []).length;
    
    // Fix 1: Replace unescaped single quotes with &apos;
    content = content.replace(/(\s|>)'(\w)/g, '$1&apos;$2');
    
    // Fix 2: Replace unescaped double quotes with &quot;
    content = content.replace(/(\s|>)"(\w)/g, '$1&quot;$2');
    
    // Report changes
    if (singleQuoteCount > 0 || doubleQuoteCount > 0) {
      console.log(`  Replaced ${singleQuoteCount} single quotes and ${doubleQuoteCount} double quotes`);
      
      // Write the modified content back to the file
      fs.writeFileSync(filePath, content, 'utf8');
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
});

console.log('Finished processing files');
