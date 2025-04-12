'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Paper 1
    router.push('/paper/1');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">UB Reader</h1>
      <p className="mb-4">Redirecting to Paper 1...</p>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>

      <div className="mt-8">
        <p>If you are not redirected automatically, please click the link below:</p>
        <a href="/paper/1" className="text-blue-500 hover:underline mt-2 inline-block">
          Go to Paper 1: The Universal Father
        </a>
      </div>
    </div>
  );
}
