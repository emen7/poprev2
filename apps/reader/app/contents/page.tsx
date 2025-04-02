import React from 'react';
import Link from 'next/link';

// This would be replaced with actual data fetching
const getTableOfContents = async () => {
  // Mock data for demonstration
  return {
    papers: [
      {
        number: 0,
        title: 'Foreword',
        sections: [],
        isSpecial: true,
      },
      {
        number: 1,
        title: 'The Universal Father',
        sections: [
          { number: 1, title: 'The Father\'s Name' },
          { number: 2, title: 'The Reality of God' },
          { number: 3, title: 'God Is a Universal Spirit' },
          { number: 4, title: 'The Mystery of God' },
          { number: 5, title: 'The Personality of the Universal Father' },
          { number: 6, title: 'Personality in the Universe' },
          { number: 7, title: 'Spiritual Value of the Personality Concept' },
        ],
      },
      {
        number: 2,
        title: 'The Nature of God',
        sections: [
          { number: 1, title: 'The Infinity of God' },
          { number: 2, title: 'The Father\'s Eternal Perfection' },
          { number: 3, title: 'Justice and Righteousness' },
          { number: 4, title: 'The Divine Mercy' },
          { number: 5, title: 'The Love of God' },
          { number: 6, title: 'The Goodness of God' },
          { number: 7, title: 'Divine Truth and Beauty' },
        ],
      },
      // More papers would be added here
    ],
  };
};

export default async function ContentsPage() {
  const { papers } = await getTableOfContents();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Table of Contents</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/"
            className="text-blue-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
        
        <div className="space-y-8">
          {papers.map((paper) => (
            <div key={paper.number} className="border-b pb-4">
              <h2 className="text-2xl font-semibold mb-2">
                <Link 
                  href={paper.isSpecial ? `/foreword` : `/paper/${paper.number}`}
                  className="hover:text-blue-600"
                >
                  {paper.isSpecial ? paper.title : `Paper ${paper.number}: ${paper.title}`}
                </Link>
              </h2>
              
              {paper.sections.length > 0 && (
                <ul className="pl-6 space-y-1">
                  {paper.sections.map((section) => (
                    <li key={section.number} className="text-gray-700">
                      <Link 
                        href={`/paper/${paper.number}/section/${section.number}`}
                        className="hover:text-blue-600"
                      >
                        {section.number}. {section.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}