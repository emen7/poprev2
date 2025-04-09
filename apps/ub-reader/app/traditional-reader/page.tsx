import { redirect } from 'next/navigation';

/**
 * Traditional Reader Default Page
 *
 * This page redirects to Paper 1 of the Traditional Reader.
 */
export default function TraditionalReaderDefaultPage() {
  redirect('/traditional-reader/1');

  // This return statement is never reached due to the redirect,
  // but is required to satisfy TypeScript
  return null;
}
