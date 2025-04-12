/**
 * Search Bar Component
 *
 * This component provides a search input field with a submit button.
 */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useCallback } from 'react';

/**
 * Props for the SearchBar component
 */
interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

/**
 * Search bar component
 *
 * @param props Component props
 * @returns React component
 */
export function SearchBar({ className = '', placeholder = 'Search documents...' }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get('q') || '');

  /**
   * Handle search form submission
   *
   * @param e Form submit event
   */
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Update URL with search query
      const params = new URLSearchParams(searchParams?.toString() || '');

      if (query) {
        params.set('q', query);
      } else {
        params.delete('q');
      }

      // Navigate to search page with query
      router.push(`/search?${params.toString()}`);
    },
    [query, router, searchParams]
  );

  return (
    <form onSubmit={handleSearch} className={`relative w-full max-w-lg ${className}`}>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>

        <input
          type="search"
          placeholder={placeholder}
          className="h-10 w-full rounded-md border border-gray-200 bg-white pl-10 pr-4 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <button type="submit" className="sr-only">
        Search
      </button>
    </form>
  );
}
