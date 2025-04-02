import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogPost() {
  const router = useRouter();
  const { filename } = router.query;
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!filename) return;

    // Simulate loading content
    setLoading(true);
    setTimeout(() => {
      setContent(`This is the content for blog post "${filename}".
      
This is a demo page that shows how dynamic routing works in Next.js.
It uses the [filename] parameter from the URL to display different content.

In a real application, this would fetch content from an API or file system.`);
      setLoading(false);
    }, 500);
  }, [filename]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="animate-pulse h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Blog Post: {filename}</h1>
        <div className="prose max-w-none">
          {content && content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}