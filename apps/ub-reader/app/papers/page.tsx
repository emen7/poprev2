'use client';

import Link from &apos;next/link';
import React, { useState, useEffect } from &apos;react';

import type { PartInfo } from '../../services/PaperDataService';
import { getContentsData } from '../../services/PaperDataService';

/**
 * Papers List Page
 *
 * This page displays a list of all papers in the Urantia Book organized by parts,
 * based on the format in the original FM_Titles.htm file.
 */
export default function PapersPage() {
  const [contentsData, setContentsData] = useState<PartInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContentsData();
        setContentsData(data);
      } catch (error) {
        console.error('Error fetching contents data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <h1 className="mb-6 text-3xl font-bold">The Urantia Book - Papers</h1>

      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="inline-block text-blue-600 hover:underline">
          ← Back to Home
        </Link>

        <Link href="/contents" className="inline-block text-blue-600 hover:underline">
          View Full Contents →
        </Link>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <div className="mx-auto max-w-4xl">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="w-16 py-2 text-left">Paper</th>
                <th className="py-2 text-left">Title</th>
                <th className="py-2 text-left">Presenter</th>
              </tr>
            </thead>
            <tbody>
              {contentsData.map(part => (
                <React.Fragment key={part.number}>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <td colSpan={3} className="px-2 py-3 font-semibold">
                      PART {part.number}: {part.title}
                    </td>
                  </tr>

                  {part.papers.map(paper => (
                    <tr
                      key={paper.number}
                      className="dark:hover:bg-gray-750 border-t border-gray-200 hover:bg-gray-50 dark:border-gray-700"
                    >
                      <td className="py-2 text-gray-600 dark:text-gray-400">
                        {paper.number === 0 ? '' : paper.number}
                      </td>
                      <td className="py-2">
                        <Link
                          href={`/traditional-reader/${paper.number}`}
                          className="text-blue-600 hover:underline"
                        >
                          {paper.number === 0 ? &apos;Foreword' : paper.title}
                        </Link>
                      </td>
                      <td className="py-2 italic text-gray-600 dark:text-gray-400">
                        {paper.author}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
