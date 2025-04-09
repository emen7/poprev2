# TinaCMS Integration for PopRev2

This document provides instructions for using TinaCMS with the PopRev2 document transformation system.

## Setup

1. Initialize TinaCMS:

   ```
   npm run tina:init
   ```

2. Start the TinaCMS development server:

   ```
   npm run tina
   ```

3. Access the TinaCMS admin interface at:
   ```
   http://localhost:3000/admin
   ```

## Content Models

The TinaCMS integration includes the following content models:

1. **Posts**

   - Simple blog posts with title and body

2. **Scientific Documents**

   - Title, author, date, categories, tags
   - Abstract
   - Citations
   - Figures
   - Body content

3. **Perplexity Documents**

   - Title, author, date, categories, tags
   - Original question
   - Responses with sources
   - Body content

4. **Lectionary Documents**
   - Title, author, date, categories, tags
   - Scripture references
   - Liturgical season
   - Body content

## Directory Structure

Content is organized in the following directories:

- `content/posts`: Simple blog posts
- `content/raw/scientific/markdown`: Scientific documents
- `content/raw/perplexity`: Perplexity documents
- `content/raw/lectionary`: Lectionary documents

## Using TinaCMS with the Document Transformation System

The TinaCMS integration works with the existing document transformation system:

1. Content is created and edited in TinaCMS
2. The content is stored in the content directory
3. The TinaDocumentLoader component fetches the content from the content directory
4. The content is transformed using the document transformation system
5. The transformed content is displayed using the document reader component

### Example Usage

```tsx
import { TinaDocumentLoader } from "../components/tina-document-loader";

export default function MyPage() {
  return (
    <div>
      <h1>My Document</h1>
      <TinaDocumentLoader relativePath="hello-world.md" documentType="post" />
    </div>
  );
}
```

## Example Pages

- `/tina-example`: Demonstrates how to use TinaCMS with the document transformation system

## Environment Variables

No environment variables are required for the self-hosted version of TinaCMS. The current implementation works without any external dependencies.

If you decide to use TinaCMS Cloud in the future (optional), you would need to set up the following environment variables:

- `NEXT_PUBLIC_TINA_CLIENT_ID`: Client ID from tina.io
- `TINA_TOKEN`: Token from tina.io

## Development Workflow

1. Create and edit content in the TinaCMS admin interface
2. Content is automatically saved to the content directory
3. Use the TinaDocumentLoader component to display content in your application
4. Customize the document transformation process as needed

## Known Limitations

1. **Direct API Integration**: The current implementation uses file system access instead of the TinaCMS API directly. This approach is simpler and works well for most use cases, but doesn't provide real-time collaboration features.

2. **Admin Interface**: The admin interface is a simple redirect to the TinaCMS admin interface. This is sufficient for content management but doesn't include advanced features like user management or role-based access control.

## Production Deployment

For production deployment to Vercel or another hosting provider:

1. Build the application:

   ```
   npm run build
   ```

2. Deploy the application to Vercel:
   ```
   vercel --prod
   ```

The self-hosted version of TinaCMS works seamlessly with Vercel and other hosting providers. All content is stored in your Git repository, so there's no need for external services or databases.

## Troubleshooting

If you encounter issues with the TinaCMS integration:

1. Make sure the TinaCMS development server is running
2. Check the browser console for errors
3. Verify that the content directories exist and have the correct permissions
4. Check the TinaCMS documentation at https://tina.io/docs for more information
