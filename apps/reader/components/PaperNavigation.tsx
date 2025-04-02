"use client";

import React from 'react';
import Link from 'next/link';

interface PaperNavigationProps {
  currentPaper?: number;
  currentSection?: number;
  totalPapers?: number;
}

const PaperNavigation: React.FC<PaperNavigationProps> = ({
  currentPaper = 1,
  currentSection = 0,
  totalPapers = 196,
}) => {
  const prevPaper = currentPaper > 1 ? currentPaper - 1 : null;
  const nextPaper = currentPaper < totalPapers ? currentPaper + 1 : null;

  return (
    <div className="flex justify-between items-center py-4 border-t border-b my-6">
      <div>
        {prevPaper && (
          <Link
            href={`/paper/${prevPaper}`}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            ← Paper {prevPaper}
          </Link>
        )}
      </div>

      <div className="text-center">
        <select
          value={currentPaper}
          onChange={(e) => {
            const paper = parseInt(e.target.value, 10);
            window.location.href = `/paper/${paper}`;
          }}
          className="px-4 py-2 border rounded mr-2"
        >
          {Array.from({ length: totalPapers }, (_, i) => i + 1).map((paper) => (
            <option key={paper} value={paper}>
              Paper {paper}
            </option>
          ))}
        </select>

        {currentSection > 0 && (
          <select
            value={currentSection}
            onChange={(e) => {
              const section = parseInt(e.target.value, 10);
              window.location.href = `/paper/${currentPaper}/section/${section}`;
            }}
            className="px-4 py-2 border rounded"
          >
            <option value={0}>All Sections</option>
            {/* This would be dynamically populated based on the paper */}
            {Array.from({ length: 10 }, (_, i) => i + 1).map((section) => (
              <option key={section} value={section}>
                Section {section}
              </option>
            ))}
          </select>
        )}
      </div>

      <div>
        {nextPaper && (
          <Link
            href={`/paper/${nextPaper}`}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            Paper {nextPaper} →
          </Link>
        )}
      </div>
    </div>
  );
};

export default PaperNavigation;