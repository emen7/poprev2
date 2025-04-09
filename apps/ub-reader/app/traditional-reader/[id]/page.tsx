import React from 'react';
import TraditionalReader from '../../../components/traditional-reader/TraditionalReader';

interface TraditionalReaderPageProps {
  params: {
    id: string;
  };
}

/**
 * Traditional Reader Page
 *
 * This page renders the TraditionalReader component with the specified paper ID.
 */
export default function TraditionalReaderPage({ params }: TraditionalReaderPageProps) {
  const paperId = parseInt(params.id, 10) || 1;

  return <TraditionalReader paperId={paperId} />;
}
