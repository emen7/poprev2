import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PopRev2 Platform Sandbox',
  description: 'A development playground and demonstration environment for the PopRev2 platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <a href="/" className="text-xl font-bold">
              PopRev2 Sandbox
            </a>
            <div className="space-x-4">
              <a href="/example" className="hover:text-gray-300">
                Example
              </a>
              <a href="/test" className="hover:text-gray-300">
                Scientific Test
              </a>
              {/* Add more links as more examples are migrated */}
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
