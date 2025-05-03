'use client';

import Link from &apos;next/link';
import React, { useState, useEffect } from &apos;react';

import type { HistoryEntry } from '../../services/HistoryService';
import { getHistory, clearHistory } from '../../services/HistoryService';

/**
 * History Page
 *
 * This page displays the user's reading history.
 */
export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load history from localStorage
    const historyData = getHistory();
    setHistory(historyData);
    setLoading(false);
  }, []);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your reading history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  // Format date for display
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      year: &apos;numeric',
      month: &apos;short',
      day: &apos;numeric',
      hour: &apos;2-digit',
      minute: &apos;2-digit',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex h-64 items-center justify-center">
          <div className="size-12 animate-spin rounded-full border-y-2 border-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-6 text-3xl font-bold">Reading History</h1>

      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="inline-block text-blue-600 hover:underline">
          ← Back to Home
        </Link>

        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-400">
            You haven't read any papers yet. Your reading history will appear here.
          </p>
        </div>
      ) : (
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="w-16 py-2 text-left">Paper</th>
                <th className="py-2 text-left">Title</th>
                <th className="py-2 text-left">Last Read</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr
                  key={index}
                  className="dark:hover:bg-gray-750 border-t border-gray-200 hover:bg-gray-50 dark:border-gray-700"
                >
                  <td className="py-2 text-gray-600 dark:text-gray-400">
                    {entry.paperId === 0 ? &apos;FW' : entry.paperId}
                  </td>
                  <td className="py-2">
                    <Link
                      href={`/traditional-reader/${entry.paperId}`}
                      className="text-blue-600 hover:underline"
                    >
                      {entry.title}
                    </Link>
                  </td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">
                    {formatDate(entry.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
