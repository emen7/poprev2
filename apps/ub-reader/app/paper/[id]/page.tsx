import React from 'react';
import Link from 'next/link';
import PaperNavigation from '../../../components/PaperNavigation';
import PaperTTSPlayerWrapper from '../../../components/PaperTTSPlayerWrapper';
import UBParagraph from '../../../components/UBParagraph';

// This would be replaced with actual data fetching
const getPaper = async (id: string) => {
  // Mock data for demonstration
  return {
    number: parseInt(id, 10),
    title: `Paper ${id}`,
    author: 'Divine Counselor',
    sections: [
      {
        number: 1,
        title: 'Introduction',
        paragraphs: [
          {
            number: 1,
            text: 'This is a sample paragraph for demonstration purposes. In the actual implementation, this would be real content from The Urantia Book. See Paper 2, Section 1 for more information.',
          },
          {
            number: 2,
            text: 'Another sample paragraph. The real implementation would fetch this data from a database or API. You can also refer to Section 3 of this paper for more details.',
          },
        ],
      },
      {
        number: 2,
        title: 'Sample Section',
        paragraphs: [
          {
            number: 1,
            text: 'This is a sample paragraph in section 2. It demonstrates how sections and paragraphs are structured. For more information on this topic, see Paper 3:2.5 or Paper 1-3.',
          },
        ],
      },
      {
        number: 3,
        title: 'References Section',
        paragraphs: [
          {
            number: 1,
            text: 'This section demonstrates various reference formats: Paper 1, Section 3; 2:1; 3-2; Paper 4; Section 2.',
          },
        ],
      },
    ],
  };
};

export default async function PaperPage({ params }: { params: { id: string } }) {
  const paper = await getPaper(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <PaperNavigation currentPaper={paper.number} />

      <div className="ub-paper">
        <h1 className="ub-paper-title">
          Paper {paper.number}: {paper.title}
        </h1>

        {paper.author && <div className="ub-paper-author">Presented by: {paper.author}</div>}

        {/* TTS Audio Player */}
        <PaperTTSPlayerWrapper paper={paper} />

        {/* Table of Contents for this paper */}
        <div className="my-6 p-4 bg-gray-50 rounded">
          <h2 className="text-xl font-semibold mb-2">Sections in this Paper</h2>
          <ul className="pl-6 space-y-1">
            {paper.sections.map(section => (
              <li key={section.number}>
                <Link
                  href={`/paper/${paper.number}/section/${section.number}`}
                  className="text-blue-600 hover:underline"
                >
                  {section.number}. {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="ub-paper-sections">
          {paper.sections.map(section => (
            <div key={section.number} className="ub-section" id={`section-${section.number}`}>
              <h2 className="ub-section-title">
                <Link
                  href={`/paper/${paper.number}/section/${section.number}`}
                  className="hover:underline"
                >
                  {section.number}. {section.title}
                </Link>
              </h2>

              <div className="ub-section-paragraphs">
                {section.paragraphs.map(paragraph => (
                  <UBParagraph
                    key={paragraph.number}
                    paragraph={paragraph}
                    currentPaper={paper.number}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <PaperNavigation currentPaper={paper.number} />
    </div>
  );
}
