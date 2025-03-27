# TinaCMS Integration for PopRev2

This directory contains the TinaCMS integration for the PopRev2 project. TinaCMS is used for content management, allowing users to edit and manage documents through a user-friendly interface.

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

## Configuration

The TinaCMS integration is configured in the following files:

- `config.ts`: Main TinaCMS configuration
- `schema.ts`: Content models and schemas
- `client.ts`: TinaCMS client for fetching content
- `queries.ts`: GraphQL queries for TinaCMS

## Content Models

The TinaCMS integration includes the following content models:

1. **Scientific Document**

   - Title, author, date, categories, tags
   - Abstract
   - Citations
   - Figures
   - Body content

2. **Perplexity Document**

   - Title, author, date, categories, tags
   - Original question
   - Responses with sources
   - Body content

3. **Lectionary Document**
   - Title, author, date, categories, tags
   - Scripture references
   - Liturgical season
   - Body content

## Integration with Document Transformation System

The TinaCMS integration works with the existing document transformation system:

1. Content is created and edited in TinaCMS
2. The content is fetched using the TinaCMS client
3. The content is transformed using the document transformation system
4. The transformed content is displayed using the document reader component

See the `src/app/tina-example/page.tsx` file for an example of how to use TinaCMS with the document transformation system.

## Deployment

For production deployment:

1. Build the TinaCMS admin and Next.js application:

   ```
   npm run tina:build
   ```

2. Start the production server:
   ```
   npm run start
   ```

## Environment Variables

The following environment variables are required for TinaCMS:

- `NEXT_PUBLIC_TINA_CLIENT_ID`: Client ID from tina.io
- `TINA_TOKEN`: Token from tina.io
- `NEXT_PUBLIC_TINA_CONTENT_URL`: URL for TinaCMS content API
- `TINA_SEARCH_TOKEN`: Token for TinaCMS search API (optional)

## Next Steps

1. Set up TinaCMS Cloud for production use
2. Implement role-based access control
3. Add media management
4. Create custom field components for specialized content
