'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getContentsData, PartInfo, FOREWORD_SECTIONS } from '../../services/PaperDataService';

/**
 * Contents Page
 *
 * This page displays a comprehensive table of contents for the Urantia Book,
 * based on the format in the original FM_Contents-table.htm file.
 */
export default function ContentsPage() {
  const [contentsData, setContentsData] = useState<PartInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'standard' | 'original'>('standard');

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
      <h1 className="text-3xl font-bold mb-6">The Urantia Book - Contents</h1>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="text-blue-600 hover:underline inline-block">
            ← Back to Home
          </Link>

          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded ${
                viewMode === 'standard'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setViewMode('standard')}
            >
              Standard View
            </button>
            <button
              className={`px-4 py-2 rounded ${
                viewMode === 'original'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setViewMode('original')}
            >
              Original Format
            </button>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {viewMode === 'standard'
            ? 'This table of contents provides links to all papers and sections in the Urantia Book.'
            : 'This view presents the contents in a format similar to the original printed edition.'}
        </p>
      </div>

      {viewMode === 'standard' ? (
        <StandardContentsView contentsData={contentsData} />
      ) : (
        <OriginalContentsView contentsData={contentsData} />
      )}
    </div>
  );
}

/**
 * Helper function to create vertical columns for sections
 * This ensures sections are listed in a vertical sequence (1,2,3,4 in first column, 5,6,7,8 in second, etc.)
 */
function createSectionColumns(sections: { number: number; title: string }[], paperNumber: number) {
  // Determine number of columns based on section count
  let columnCount = 1;
  if (sections.length > 6) columnCount = 2;
  if (sections.length > 12) columnCount = 3;
  if (sections.length > 18) columnCount = 4;

  // Calculate items per column (rounded up to ensure all items are included)
  const itemsPerColumn = Math.ceil(sections.length / columnCount);

  // Create columns
  const columns: { number: number; title: string }[][] = [];

  for (let i = 0; i < columnCount; i++) {
    const startIndex = i * itemsPerColumn;
    const endIndex = Math.min(startIndex + itemsPerColumn, sections.length);
    columns.push(sections.slice(startIndex, endIndex));
  }

  return columns;
}

/**
 * Standard Contents View Component
 *
 * Displays the contents in a modern, hierarchical format.
 */
function StandardContentsView({ contentsData }: { contentsData: PartInfo[] }) {
  return (
    <div className="space-y-8">
      {contentsData.map(part => (
        <div
          key={part.number}
          id={`part${part.number}`}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-3">
            Part {part.number}: {part.title}
          </h2>

          <div className="space-y-6">
            {part.papers.map(paper => (
              <div key={paper.number} className="border-t pt-4 first:border-t-0 first:pt-0">
                <h3 className="text-xl font-medium mb-2">
                  <Link
                    href={`/traditional-reader/${paper.number}`}
                    className="text-blue-600 hover:underline"
                  >
                    {paper.number === 0 ? 'Foreword' : `Paper ${paper.number}: ${paper.title}`}
                  </Link>
                </h3>

                {/* Vertical section list for better numerical readability */}
                <div className="flex flex-wrap">
                  {/* Create columns based on section count */}
                  {createSectionColumns(paper.sections, paper.number).map((column, colIndex) => (
                    <div key={colIndex} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                      <ul className="space-y-1 pr-2">
                        {column.map(section => (
                          <li key={section.number} className="text-gray-700 dark:text-gray-300">
                            <Link
                              href={`/traditional-reader/${paper.number}#section${section.number}`}
                              className="hover:text-blue-600 hover:underline block"
                            >
                              {paper.number === 0
                                ? `${
                                    FOREWORD_SECTIONS.find(s => s.number === section.number)
                                      ?.romanNumeral
                                  }. ${section.title}`
                                : `${section.number}. ${section.title}`}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Original Contents View Component
 *
 * Displays the contents in a format similar to the original printed edition.
 */
function OriginalContentsView({ contentsData }: { contentsData: PartInfo[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-2xl font-semibold mb-6">CONTENTS OF THE BOOK</h2>

        {contentsData.map(part => (
          <div key={part.number} id={`part${part.number}`} className="mb-10">
            <h3 className="text-center text-xl font-medium mb-4">
              PART {part.number}.<br />
              {part.title}
            </h3>

            {part.papers.map(paper => (
              <div key={paper.number} className="mb-6">
                <p className="font-medium mb-2">
                  {paper.number === 0 ? (
                    <Link
                      href={`/traditional-reader/${paper.number}`}
                      className="text-blue-600 hover:underline"
                    >
                      Foreword
                    </Link>
                  ) : (
                    <span>
                      {paper.number}.{' '}
                      <Link
                        href={`/traditional-reader/${paper.number}`}
                        className="text-blue-600 hover:underline"
                      >
                        {paper.title}
                      </Link>
                    </span>
                  )}
                </p>

                <div className="pl-8">
                  <table className="w-full">
                    <tbody>
                      {paper.sections.map(section => (
                        <tr key={section.number}>
                          <td className="text-right pr-4 w-16 align-top">
                            <Link
                              href={`/traditional-reader/${paper.number}#section${section.number}`}
                              className="text-blue-600 hover:underline"
                            >
                              {paper.number === 0
                                ? FOREWORD_SECTIONS.find(s => s.number === section.number)
                                    ?.romanNumeral
                                : section.number}
                              .
                            </Link>
                          </td>
                          <td>
                            <Link
                              href={`/traditional-reader/${paper.number}#section${section.number}`}
                              className="text-blue-600 hover:underline"
                            >
                              {section.title}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
