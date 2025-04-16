# Core Package Examples

This directory contains examples demonstrating how to use the Core Package.

## SimpleReader Example

The SimpleReader example demonstrates how to create a basic reader application using the Core Package. It includes:

- Document rendering with sections and paragraphs
- Navigation between sections and paragraphs
- Theme switching (light, dark, sepia, traditional)
- Text selection and highlighting
- Table of contents

### Running the Example

#### Option 1: Using the Provided Script (Recommended)

The easiest way to run the example is using the provided script:

1. Make sure you have Node.js installed
2. Run the script from the project root:
   ```bash
   node packages/core/examples/run-example.js
   ```
3. The script will start a local server and automatically open your browser to the example

This script:

- Starts a simple HTTP server on port 3000
- Serves the example files
- Automatically opens your default browser
- Handles the necessary MIME types for different file extensions

#### Option 2: Using a Local Development Server

If you prefer to use your existing development setup:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000/examples/
   ```

#### Option 3: Using a Simple HTTP Server

You can also run the example using any HTTP server:

1. Install a simple HTTP server if you don't have one:

   ```bash
   npm install -g http-server
   ```

2. Start the server from the project root:

   ```bash
   http-server
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8080/packages/core/examples/
   ```

#### Option 4: Opening the HTML File Directly

For a quick preview, you can open the HTML file directly in your browser:

1. Navigate to the examples directory
2. Open `index.html` in your browser

Note: Some browsers may have security restrictions that prevent loading local modules. If you encounter issues, use one of the server options above.

## Customizing the Example

You can modify the `SimpleReader.tsx` file to experiment with different features of the Core Package:

- Change the sample document to test different content structures
- Modify the theme settings to customize the appearance
- Add new components to extend the functionality
- Implement additional hooks to access more features

## Creating Your Own Examples

To create your own example:

1. Create a new TypeScript file in the examples directory
2. Import the necessary components and hooks from the Core Package
3. Create your React components using the Core Package APIs
4. Update the `index.html` file to load your example

## Additional Resources

- [Core Package Documentation](../README.md)
- [API Reference](../README.md#api-reference)
- [Extension System](../README.md#extension-system)
- [Theme System](../README.md#theme-system)
