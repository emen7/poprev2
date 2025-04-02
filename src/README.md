# PopRev2 - Document Presentation Platform

PopRev2 is a versatile document presentation platform designed to adapt to different purposes, all centered around presenting documents in a uniform, accessible manner across devices. It now features TinaCMS integration for content management.

## Features

- Multi-format document transformation (Markdown, DOCX)
- Uniform display across web and mobile interfaces
- Content organization with intuitive navigation
- Responsive design for optimal reading experience
- TinaCMS integration for content management
- Purpose-specific document schemas (Scientific, Perplexity, Lectionary)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/poprev2.git
   cd poprev2
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Run the development server:

   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the home page.

### Running with TinaCMS

To run the application with TinaCMS for local content editing:

1. Start the TinaCMS development server:

   ```
   npx tinacms dev -c "npm run dev"
   ```

2. Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the TinaCMS admin interface.

3. Create or edit content through the TinaCMS interface.

4. View the content at [http://localhost:3000/scientific](http://localhost:3000/scientific) or other relevant paths.

## Deployment on Vercel

The easiest way to deploy the PopRev2 application is to use the [Vercel Platform](https://vercel.com/new).

### Basic Deployment

1. Push your code to a GitHub repository
2. Import the project into Vercel
3. Vercel will detect Next.js and set up the build configuration automatically
4. Your application will be deployed and available at a Vercel URL

### Setting Up TinaCMS for Production

For production use of TinaCMS:

1. Create an account on [TinaCMS](https://tina.io)
2. Create a new project and connect it to your GitHub repository
3. Get your TinaCMS Client ID and Token
4. Add the following environment variables in your Vercel project settings:
   - `NEXT_PUBLIC_TINA_CLIENT_ID`: Your TinaCMS Client ID
   - `TINA_TOKEN`: Your TinaCMS Token
5. Redeploy your application

This will enable the TinaCMS admin interface in your production environment with proper authentication and Git-backed content storage.

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── admin/                    # TinaCMS admin interface
│   ├── example/                  # Example page
│   ├── scientific/               # Scientific documents section
│   │   ├── [slug]/               # Dynamic route for individual documents
│   │   └── page.tsx              # Scientific documents index
│   ├── test/                     # Test page with scientific document
│   └── tina-example/             # TinaCMS integration example
├── components/                   # React components
│   ├── document-reader.tsx       # Document reader component
│   ├── document-reader.css       # Reader styles
│   ├── tina-document-loader.tsx  # TinaCMS document loader
│   └── tina-provider.tsx         # TinaCMS provider component
├── content/                      # Content directory
│   ├── raw/                      # Raw, untransformed content
│   │   ├── scientific/           # Scientific articles
│   │   │   ├── markdown/         # Markdown format
│   │   │   └── docx/             # DOCX format
│   │   ├── perplexity/           # Perplexity responses
│   │   └── lectionary/           # Lectionary articles
│   └── README.md                 # Content documentation
├── lib/                          # Utility libraries
│   └── document-transformer/     # Document transformation system
└── tina/                         # TinaCMS configuration
    ├── __generated__/            # Generated TinaCMS files
    ├── client.ts                 # TinaCMS client
    ├── config.ts                 # TinaCMS configuration
    └── README.md                 # TinaCMS documentation
```

## Mobile Viewing

The application is designed to be responsive and work well on mobile devices. After deploying to Vercel, you can access the application from your phone using the Vercel URL.

## TinaCMS Integration

The platform now includes TinaCMS integration for content management:

### Features

- Git-backed content management
- Visual editing interface
- Purpose-specific document schemas
- Media management
- Content validation

### Using TinaCMS

1. Access the admin interface at `/admin`
2. Create and edit documents through the visual interface
3. Changes are saved to the Git repository
4. Documents are automatically transformed and displayed using the document reader

For more details, see the [TinaCMS documentation](./tina/README.md).

## Next Steps

- ✅ Implement TinaCMS for content management
- ✅ Create purpose-specific configurations
- ✅ Add support for scientific document schema
- Enhance DOCX processing for complex scientific documents
- Implement advanced search functionality
- Add document sharing and download options
- Create data visualization components for scientific documents
- Implement citation management system
- Improve mobile experience with touch-optimized controls

## License

This project is licensed under the MIT License - see the LICENSE file for details.
