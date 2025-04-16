/**
 * Simple script to run the Core Package examples
 *
 * This script starts a local server to demonstrate the examples.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration
const PORT = 3000;
const EXAMPLES_DIR = __dirname;
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.jsx': 'text/javascript',
  '.ts': 'text/javascript',
  '.tsx': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown',
};

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);

  // Handle root path
  let filePath =
    req.url === '/' ? path.join(EXAMPLES_DIR, 'index.html') : path.join(PROJECT_ROOT, req.url);

  // Get file extension
  const extname = path.extname(filePath);

  // Set default content type to text/plain
  let contentType = MIME_TYPES[extname] || 'text/plain';

  // Special handling for TypeScript/React files
  if (extname === '.tsx' || extname === '.ts') {
    // In a real implementation, we would transpile these files
    // For this simple example, we'll just serve them as JavaScript
    contentType = 'text/javascript';
  }

  // Read the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404);
        res.end('File not found');
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Examples available at http://localhost:${PORT}/packages/core/examples/`);

  // Open the browser automatically
  const url = `http://localhost:${PORT}/packages/core/examples/`;
  let command;

  switch (process.platform) {
    case 'darwin': // macOS
      command = `open "${url}"`;
      break;
    case 'win32': // Windows
      command = `start "" "${url}"`;
      break;
    default: // Linux and others
      command = `xdg-open "${url}"`;
      break;
  }

  exec(command, err => {
    if (err) {
      console.error('Failed to open browser automatically');
      console.log(`Please open ${url} in your browser`);
    }
  });
});

console.log('Starting server...');
console.log('Press Ctrl+C to stop the server');
