/**
 * Header Component
 *
 * This component provides the main navigation header for the application.
 */

import Link from 'next/link';
import { Suspense } from 'react';
import { SearchBar } from '../search/search-bar';

/**
 * Props for the Header component
 */
interface HeaderProps {
  className?: string;
}

/**
 * Header component
 *
 * @param props Component props
 * @returns React component
 */
export function Header({ className = '' }: HeaderProps) {
  return (
    <header className={`border-b border-gray-200 bg-white ${className}`}>
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">
          PopRev2
        </Link>

        <div className="hidden md:block">
          <Suspense fallback={<div className="w-64 h-10 bg-gray-100 rounded animate-pulse"></div>}>
            <SearchBar />
          </Suspense>
        </div>

        <nav className="flex items-center space-x-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link href="/search" className="text-gray-600 hover:text-gray-900">
            Search
          </Link>
          <Link href="/admin" className="text-gray-600 hover:text-gray-900">
            Admin
          </Link>

          {/* Mobile search icon */}
          <Link href="/search" className="md:hidden">
            <svg
              className="h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
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
            <span className="sr-only">Search</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
