// This script initializes TinaCMS
const { execSync } = require('child_process');

console.log('Initializing TinaCMS...');

try {
  // Initialize TinaCMS
  execSync('npx @tinacms/cli init', { stdio: 'inherit' });
  
  console.log('TinaCMS initialized successfully!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Start the development server: npm run dev');
  console.log('2. Start the TinaCMS server: npx @tinacms/cli dev -c "npm run dev"');
  console.log('3. Open http://localhost:3000/admin to access the TinaCMS admin interface');
} catch (error) {
  console.error('Error initializing TinaCMS:', error);
  process.exit(1);
}