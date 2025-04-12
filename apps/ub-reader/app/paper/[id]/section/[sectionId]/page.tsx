import Link from 'next/link';
import React from 'react';

import PaperNavigation from '../../../../../components/PaperNavigation';
import PaperTTSPlayerWrapper from '../../../../../components/PaperTTSPlayerWrapper';
import UBParagraph from '../../../../../components/UBParagraph';

// This would be replaced with actual data fetching
const getPaperSection = async (paperId: string, sectionId: string) => {
  // Mock data for demonstration
  return {
    paper: {
      number: parseInt(paperId, 10),
      title: `Paper ${paperId}`,
      author: 'Divine Counselor',
      sections: [
        {
          number: parseInt(sectionId, 10),
          title: `Section ${sectionId}`,
          paragraphs: [
            {
              number: 1,
              text: 'This is a sample paragraph for demonstration purposes. In the actual implementation, this would be real content from The Urantia Book.',
            },
            {
              number: 2,
              text: 'Another sample paragraph. The real implementation would fetch this data from a database or API.',
            },
            {
              number: 3,
              text: 'A third sample paragraph with a reference to <a href="/paper/1/section/3" class="ub-reference">Paper 1, Section 3</a>.',
            },
          ],
        },
      ],
    },
    section: {
      number: parseInt(sectionId, 10),
      title: `Section ${sectionId}`,
      paragraphs: [
        {
          number: 1,
          text: 'This is a sample paragraph for demonstration purposes. In the actual implementation, this would be real content from The Urantia Book.',
        },
        {
          number: 2,
          text: 'Another sample paragraph. The real implementation would fetch this data from a database or API.',
        },
        {
          number: 3,
          text: 'A third sample paragraph with a reference to <a href="/paper/1/section/3" class="ub-reference">Paper 1, Section 3</a>.',
        },
      ],
    },
    totalSections: 10,
  };
};

export default async function SectionPage({
  params,
}: {
  params: { id: string; sectionId: string };
}) {
  const { paper, section, totalSections } = await getPaperSection(params.id, params.sectionId);

  const sectionNumber = parseInt(params.sectionId, 10);
  const prevSection = sectionNumber > 1 ? sectionNumber - 1 : null;
  const nextSection = sectionNumber < totalSections ? sectionNumber + 1 : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <PaperNavigation currentPaper={paper.number} currentSection={section.number} />

      <div className="ub-paper">
        <h1 className="ub-paper-title">
          <Link href={`/paper/${paper.number}`} className="hover:underline">
            Paper {paper.number}: {paper.title}
          </Link>
        </h1>

        {paper.author && <div className="ub-paper-author">Presented by: {paper.author}</div>}

        {/* TTS Audio Player */}
        <PaperTTSPlayerWrapper paper={paper} currentSectionNumber={section.number} />

        <div className="ub-section" id={`section-${section.number}`}>
          <h2 className="ub-section-title">
            {section.number}. {section.title}
          </h2>

          <div className="ub-section-paragraphs">
            {section.paragraphs.map(paragraph => (
              <UBParagraph key={paragraph.number} paragraph={paragraph} />
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          {prevSection && (
            <Link
              href={`/paper/${paper.number}/section/${prevSection}`}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              ← Section {prevSection}
            </Link>
          )}

          <Link
            href={`/paper/${paper.number}`}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            Full Paper
          </Link>

          {nextSection && (
            <Link
              href={`/paper/${paper.number}/section/${nextSection}`}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              Section {nextSection} →
            </Link>
          )}
        </div>
      </div>

      <PaperNavigation currentPaper={paper.number} currentSection={section.number} />
    </div>
  );
}
