'use client';

import Link from &apos;next/link';
import React, { useState } from &apos;react';

/**
 * Reader UI Demo Page
 *
 * This page demonstrates different layout options for the UB Reader UI.
 * It allows switching between different layout structures to gather feedback.
 */
export default function ReaderUIDemoPage() {
  // State to track which layout option is currently selected
  const [layoutOption, setLayoutOption] = useState<'A' | &apos;B' | &apos;C'>('A');

  return (
    <div className="flex min-h-screen flex-col">
      {/* Options Selector Panel */}
      <div className="border-b border-gray-200 bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-2xl font-bold">Reader UI Demo - Layout Structure</h1>

          <div className="mb-4 flex flex-wrap gap-4">
            <button
              onClick={() => setLayoutOption('A')}
              className={`rounded-md px-4 py-2 ${
                layoutOption === &apos;A'
                  ? &apos;bg-blue-600 text-white'
                  : &apos;bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              Option A: Fixed Header
            </button>
            <button
              onClick={() => setLayoutOption('B')}
              className={`rounded-md px-4 py-2 ${
                layoutOption === &apos;B'
                  ? &apos;bg-blue-600 text-white'
                  : &apos;bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              Option B: Sticky Header
            </button>
            <button
              onClick={() => setLayoutOption('C')}
              className={`rounded-md px-4 py-2 ${
                layoutOption === &apos;C'
                  ? &apos;bg-blue-600 text-white'
                  : &apos;bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              Option C: Sidebar Layout
            </button>
          </div>

          <div className="mb-4 rounded-md bg-white p-4 dark:bg-gray-900">
            <h2 className="mb-2 font-semibold">
              Current Option: {getLayoutDescription(layoutOption)}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{getLayoutDetails(layoutOption)}</p>
          </div>

          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Layout Demonstration */}
      {layoutOption === &apos;A' && <FixedHeaderLayout />}
      {layoutOption === &apos;B' && <StickyHeaderLayout />}
      {layoutOption === &apos;C' && <SidebarLayout />}
    </div>
  );
}

/**
 * Helper function to get layout description
 */
function getLayoutDescription(option: &apos;A' | &apos;B' | &apos;C'): string {
  switch (option) {
    case &apos;A':
      return &apos;Fixed Header with Scrollable Content';
    case &apos;B':
      return &apos;Sticky Header that Minimizes on Scroll';
    case &apos;C':
      return &apos;Full-height Sidebar with Content Area';
  }
}

/**
 * Helper function to get layout details
 */
function getLayoutDetails(option: &apos;A' | &apos;B' | &apos;C'): string {
  switch (option) {
    case &apos;A':
      return &apos;A traditional layout with a fixed header at the top and scrollable content below. This provides a clean reading experience with maximum space for content.';
    case &apos;B':
      return &apos;A modern layout where the header shrinks as you scroll down, providing more reading space while maintaining navigation context.';
    case &apos;C':
      return &apos;A layout with a persistent sidebar for navigation and a separate content area. This provides quick access to different sections of the book.';
  }
}

/**
 * Option A: Fixed Header Layout
 */
function FixedHeaderLayout() {
  return (
    <div className="flex grow flex-col">
      {/* Fixed Header */}
      <header className="flex h-16 items-center bg-gray-800 px-4 text-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <div className="flex items-center">
            <button className="mr-2 p-2">
              <span className="mb-1 block h-0.5 w-6 bg-white" />
              <span className="mb-1 block h-0.5 w-6 bg-white" />
              <span className="block h-0.5 w-6 bg-white" />
            </button>
            <button className="mr-4 p-2">
              <span className="mb-1 block h-0.5 w-5 bg-blue-400" />
              <span className="mb-1 block h-0.5 w-5 bg-blue-400" />
              <span className="block h-0.5 w-5 bg-blue-400" />
            </button>
          </div>

          <h1 className="text-xl font-semibold">Paper 1: The Universal Father</h1>

          <div>
            <button className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="grow bg-gray-100 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold">1. The Father's Name</h2>

            <div className="space-y-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <p key={i} className="text-gray-800 dark:text-gray-200">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Button for Pullup Panel */}
      <div className="fixed bottom-6 right-6">
        <button className="flex size-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/**
 * Option B: Sticky Header Layout
 */
function StickyHeaderLayout() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex grow flex-col">
      {/* Sticky Header that changes on scroll */}
      <header
        className={`sticky top-0 z-10 bg-gray-800 text-white transition-all duration-300 ${
          isScrolled ? &apos;h-12' : &apos;h-16'
        }`}
      >
        <div className="mx-auto flex size-full max-w-7xl items-center justify-between px-4">
          <div className="flex items-center">
            <button className={`mr-2 p-2 transition-all ${isScrolled ? &apos;scale-75' : ''}`}>
              <span className="mb-1 block h-0.5 w-6 bg-white" />
              <span className="mb-1 block h-0.5 w-6 bg-white" />
              <span className="block h-0.5 w-6 bg-white" />
            </button>
            <button className={`mr-4 p-2 transition-all ${isScrolled ? &apos;scale-75' : ''}`}>
              <span className="mb-1 block h-0.5 w-5 bg-blue-400" />
              <span className="mb-1 block h-0.5 w-5 bg-blue-400" />
              <span className="block h-0.5 w-5 bg-blue-400" />
            </button>
          </div>

          <h1 className={`font-semibold transition-all ${isScrolled ? &apos;text-base' : &apos;text-xl'}`}>
            Paper 1: The Universal Father
          </h1>

          <div>
            <button className={`p-2 transition-all ${isScrolled ? &apos;scale-75' : ''}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="grow bg-gray-100 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold">1. The Father's Name</h2>

            <div className="space-y-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <p key={i} className="text-gray-800 dark:text-gray-200">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Button for Pullup Panel */}
      <div className="fixed bottom-6 right-6">
        <button className="flex size-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/**
 * Option C: Sidebar Layout
 */
function SidebarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-full grow">
      {/* Sidebar */}
      <aside
        className={`h-screen bg-gray-800 text-white transition-all duration-300 ${
          sidebarOpen ? &apos;w-64' : &apos;w-16'
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          {sidebarOpen && <h2 className="font-semibold">UB Reader</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-md p-1 hover:bg-gray-700"
          >
            {sidebarOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="grow overflow-y-auto">
          {sidebarOpen ? (
            <nav className="p-2">
              <div className="mb-4">
                <h3 className="mb-2 px-2 text-xs uppercase tracking-wider text-gray-400">Parts</h3>
                <ul>
                  {['Part I', &apos;Part II', &apos;Part III', &apos;Part IV'].map((part, i) => (
                    <li key={i}>
                      <a href="#" className="block rounded px-2 py-1 hover:bg-gray-700">
                        {part}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="mb-2 px-2 text-xs uppercase tracking-wider text-gray-400">
                  Current Paper
                </h3>
                <ul>
                  {["1. The Father's Name", &apos;2. The Reality of God', &quot;3. God's Attributes"].map(
                    (section, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className={`block rounded px-2 py-1 ${i === 0 ? &apos;bg-blue-600' : &apos;hover:bg-gray-700'}`}
                        >
                          {section}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </nav>
          ) : (
            <nav className="flex flex-col items-center p-2">
              <button className="mb-4 rounded p-2 hover:bg-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <button className="mb-4 rounded p-2 hover:bg-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </button>
              <button className="rounded p-2 hover:bg-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </nav>
          )}
        </div>

        <div className="p-4">
          <button className="flex w-full items-center justify-center rounded-md bg-blue-600 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {sidebarOpen && <span className="ml-2">Settings</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="grow overflow-y-auto bg-gray-100 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h1 className="mb-2 text-3xl font-bold">Paper 1: The Universal Father</h1>
            <h2 className="mb-4 text-2xl font-bold">1. The Father's Name</h2>

            <div className="space-y-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <p key={i} className="text-gray-800 dark:text-gray-200">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Button for Pullup Panel */}
      <div className="fixed bottom-6 right-6">
        <button className="flex size-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
