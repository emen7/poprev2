# PopRev2 - Document Presentation Platform

PopRev2 is a versatile document presentation platform designed to adapt to different purposes, all centered around presenting documents in a uniform, accessible manner across devices.

## Features

- Multi-format document transformation (Markdown, DOCX)
- Uniform display across web and mobile interfaces
- Content organization with intuitive navigation
- Responsive design for optimal reading experience

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

4. Open [http://localhost:3000/test](http://localhost:3000/test) in your browser to see the test page with a sample scientific document.

## Deployment on Vercel

The easiest way to deploy the PopRev2 application is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub repository
2. Import the project into Vercel
3. Vercel will detect Next.js and set up the build configuration automatically
4. Your application will be deployed and available at a Vercel URL

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── example/                  # Example page
│   └── test/                     # Test page with scientific document
├── components/                   # React components
│   ├── document-reader.tsx       # Document reader component
│   └── document-reader.css       # Reader styles
├── content/                      # Content directory
│   ├── raw/                      # Raw, untransformed content
│   │   ├── scientific/           # Scientific articles
│   │   │   ├── markdown/         # Markdown format
│   │   │   └── docx/             # DOCX format
│   │   ├── perplexity/           # Perplexity responses
│   │   └── lectionary/           # Lectionary articles
│   └── README.md                 # Content documentation
└── lib/                          # Utility libraries
    └── document-transformer/     # Document transformation system
```

## Mobile Viewing

The application is designed to be responsive and work well on mobile devices. After deploying to Vercel, you can access the application from your phone using the Vercel URL.

## Next Steps

- Enhance DOCX processing for complex scientific documents
- Implement TinaCMS for content management
- Create purpose-specific configurations
- Add support for images and media
- Improve mobile experience with touch-optimized controls

## License

This project is licensed under the MIT License - see the LICENSE file for details.
