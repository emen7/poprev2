import { Header } from '../components/layout/header';
import '../styles/globals.css';

export const metadata = {
  title: 'PopRev2',
  description: 'Document Presentation Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
