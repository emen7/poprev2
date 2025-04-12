'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { getHistory, clearHistory, HistoryEntry } from '../../services/HistoryService';

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
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Reading History</h1>

      <div className="mb-8 flex justify-between items-center">
        <Link href="/" className="text-blue-600 hover:underline inline-block">
          ← Back to Home
        </Link>

        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-400">
            You haven't read any papers yet. Your reading history will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="text-left py-2 w-16">Paper</th>
                <th className="text-left py-2">Title</th>
                <th className="text-left py-2">Last Read</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
                >
                  <td className="py-2 text-gray-600 dark:text-gray-400">
                    {entry.paperId === 0 ? 'FW' : entry.paperId}
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
