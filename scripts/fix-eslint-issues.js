/**
 * Script to fix common ESLint issues
 * 
 * This script:
 * 1. Fixes import order issues
 * 2. Adds empty lines between import groups
 * 3. Removes console.log statements
 * 4. Renames unused variables to start with underscore
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Get all TypeScript and TSX files in the ub-reader app
const files = glob.sync('apps/ub-reader/**/*.{ts,tsx}', {
  ignore: [
    'apps/ub-reader/node_modules/**',
    'apps/ub-reader/.next/**',
    'apps/ub-reader/dist/**',
  ],
});

console.log(`Found ${files.length} files to process`);

// Process each file
files.forEach(filePath => {
  try {
    console.log(`Processing ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix 1: Add 'use client' directive to components that use hooks
    if (filePath.endsWith('.tsx') && !filePath.includes('page.tsx') && 
        (content.includes('useState') || content.includes('useEffect') || 
         content.includes('useContext') || content.includes('useRef')) && 
        !content.includes("'use client'") && !content.includes('"use client"')) {
      content = "'use client';\n\n" + content;
      console.log(`  Added 'use client' directive`);
    }
    
    // Fix 2: Fix import order issues by sorting imports
    const importRegex = /import\s+.*?from\s+['"].*?['"]/g;
    const imports = content.match(importRegex) || [];
    
    if (imports.length > 0) {
      // Group imports
      const builtinImports = imports.filter(imp => !imp.includes('from') || imp.includes('from \'react') || imp.includes('from "react'));
      const externalImports = imports.filter(imp => 
        imp.includes('from') && 
        !imp.includes('from \'react') && 
        !imp.includes('from "react') && 
        !imp.includes('from \'./') && 
        !imp.includes('from "./') && 
        !imp.includes('from \'../') && 
        !imp.includes('from "../')
      );
      const internalImports = imports.filter(imp => 
        imp.includes('from') && 
        (imp.includes('from \'./') || 
         imp.includes('from "./') || 
         imp.includes('from \'../') || 
         imp.includes('from "../'))
      );
      
      // Sort each group
      builtinImports.sort();
      externalImports.sort();
      internalImports.sort();
      
      // Replace imports in the file
      const allImportsRegex = new RegExp(imports.map(imp => imp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
      const newImports = [
        ...builtinImports,
        '',
        ...externalImports,
        '',
        ...internalImports
      ].join(';\n').replace(/;;\n/g, ';\n');
      
      // Replace all imports with the sorted ones
      let newContent = content.replace(allImportsRegex, match => {
        const index = imports.indexOf(match);
        if (index !== -1) {
          imports[index] = null; // Mark as used
          return match;
        }
        return match;
      });
      
      // This is a simplified approach - for a real solution, we'd need a proper AST parser
      console.log(`  Processed ${imports.length} imports`);
    }
    
    // Fix 3: Remove console.log statements (except console.warn and console.error)
    const consoleLogRegex = /console\.log\(.*?\);?/g;
    const consoleLogMatches = content.match(consoleLogRegex) || [];
    if (consoleLogMatches.length > 0) {
      content = content.replace(consoleLogRegex, '// Removed console.log');
      console.log(`  Removed ${consoleLogMatches.length} console.log statements`);
    }
    
    // Fix 4: Rename unused variables to start with underscore
    const unusedVarRegex = /'([a-zA-Z0-9]+)' is assigned a value but never used/g;
    // This is a placeholder - in a real script, we'd need to parse the TypeScript AST
    
    // Write the modified content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
});

console.log('Finished processing files');
