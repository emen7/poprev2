import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the test page
  redirect('/test');
}