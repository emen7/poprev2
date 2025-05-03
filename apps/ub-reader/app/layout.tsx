import React from &apos;react';

import RootLayoutClient from './layout-client';

// Import the reportWebVitalsMetrics function from the web-vitals utility
export { reportWebVitalsMetrics } from '../lib/web-vitals';

export const metadata = {
  title: &apos;UB Reader',
  description: &apos;A modern reader for The Urantia Book',
};

/**
 * Server component for the root layout
 * This handles metadata and other server-side concerns
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
