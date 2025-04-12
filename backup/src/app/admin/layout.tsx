import React from 'react';

/**
 * Admin Layout
 *
 * This layout is used for the admin section of the application.
 * It provides a minimal wrapper for the TinaCMS admin interface.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-layout">{children}</div>;
}

export const metadata = {
  title: 'PopRev2 Admin',
  description: 'Content management interface for PopRev2',
};
