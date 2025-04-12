/**
 * Run Search Indexer Script
 *
 * This script runs the build-search-index.ts script using ts-node.
 * It's a simple helper to make it easier to run the indexer.
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('Running search indexer...');

try {
  // Install ts-node if not already installed
  try {
    execSync('npx ts-node --version', { stdio: 'ignore' });
    console.log('ts-node is already installed.');
  } catch (error) {
    console.log('Installing ts-node...');
    execSync('npm install --save-dev ts-node', { stdio: 'inherit' });
  }

  // Run the build-search-index.js script
  console.log('Building search index...');
  execSync('node scripts/build-search-index.js', {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..'),
  });

  console.log('Search index built successfully!');
  console.log('You can now search for scientific content at http://localhost:3000/search');
} catch (error) {
  console.error('Error building search index:', error.message);
  process.exit(1);
}
