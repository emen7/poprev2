'use client';

import React, { useEffect } from 'react';
import { TinaCMSProvider } from '../../../packages/ui/src/tina';

/**
 * Admin Page
 *
 * This page serves as the entry point for the TinaCMS admin interface.
 * It redirects to the TinaCMS admin UI which is built at /admin/index.html.
 */
export default function AdminPage() {
  useEffect(() => {
    // Redirect to the TinaCMS admin UI
    window.location.href = '/admin/index.html';
  }, []);

  return (
    <TinaCMSProvider>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">TinaCMS Admin</h1>
        <p className="mb-4">Redirecting to the TinaCMS admin interface...</p>
        <p>
          If you are not redirected automatically, please{' '}
          <a href="/admin/index.html" className="text-blue-500 hover:underline">
            click here
          </a>
          .
        </p>
      </div>
    </TinaCMSProvider>
  );
}
