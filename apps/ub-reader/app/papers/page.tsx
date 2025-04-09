'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getContentsData, PartInfo } from '../../services/PaperDataService';

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
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">The Urantia Book - Papers</h1>

      <div className="mb-8 flex justify-between items-center">
        <Link href="/" className="text-blue-600 hover:underline inline-block">
          ← Back to Home
        </Link>

        <Link href="/contents" className="text-blue-600 hover:underline inline-block">
          View Full Contents →
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="max-w-4xl mx-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="text-left py-2 w-16">Paper</th>
                <th className="text-left py-2">Title</th>
                <th className="text-left py-2">Presenter</th>
              </tr>
            </thead>
            <tbody>
              {contentsData.map(part => (
                <React.Fragment key={part.number}>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <td colSpan={3} className="py-3 px-2 font-semibold">
                      PART {part.number}: {part.title}
                    </td>
                  </tr>

                  {part.papers.map(paper => (
                    <tr
                      key={paper.number}
                      className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
                    >
                      <td className="py-2 text-gray-600 dark:text-gray-400">
                        {paper.number === 0 ? '' : paper.number}
                      </td>
                      <td className="py-2">
                        <Link
                          href={`/traditional-reader/${paper.number}`}
                          className="text-blue-600 hover:underline"
                        >
                          {paper.number === 0 ? 'Foreword' : paper.title}
                        </Link>
                      </td>
                      <td className="py-2 text-gray-600 dark:text-gray-400 italic">
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
