import { redirect } from 'next/navigation';

/**
 * Traditional Test Page
 *
 * This page redirects to the new Traditional Reader implementation.
 * It's kept for backward compatibility with existing links.
 */
export default function TraditionalTestPage() {
  redirect('/traditional-reader/1');

  // This return statement is never reached due to the redirect,
  // but is required to satisfy TypeScript
  return null;
}
