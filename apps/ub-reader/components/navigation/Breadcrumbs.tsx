'use client';

import Link from 'next/link';
import React from 'react';

import { getPartForPaper } from '../../services/PaperDataService';

interface BreadcrumbsProps {
  paperId: number;
  paperTitle: string;
  sectionTitle?: string;
}

/**
 * Breadcrumbs Component
 *
 * This component displays breadcrumb navigation showing the current location
 * in the book hierarchy (part > paper > section).
 */
export default function Breadcrumbs({ paperId, paperTitle, sectionTitle }: BreadcrumbsProps) {
  // Get part information
  const partNumber = getPartForPaper(paperId);
  const partTitle = getPartTitle(partNumber);

  return (
    <nav className="breadcrumbs" aria-label="breadcrumbs">
      <ol className="breadcrumbs-list">
        <li className="breadcrumbs-item">
          <Link href="/contents" className="breadcrumbs-link">
            Contents
          </Link>
          <span className="breadcrumbs-separator">/</span>
        </li>

        {partNumber > 0 && (
          <li className="breadcrumbs-item">
            <Link href={`/contents#part${partNumber}`} className="breadcrumbs-link">
              Part {partNumber}
            </Link>
            <span className="breadcrumbs-separator">/</span>
          </li>
        )}

        <li className="breadcrumbs-item">
          <Link href={`/traditional-reader/${paperId}`} className="breadcrumbs-link">
            {paperId === 0 ? 'Foreword' : `Paper ${paperId}`}
          </Link>
          {sectionTitle && <span className="breadcrumbs-separator">/</span>}
        </li>

        {sectionTitle && (
          <li className="breadcrumbs-item breadcrumbs-current">
            <span className="breadcrumbs-text">{sectionTitle}</span>
          </li>
        )}
      </ol>
    </nav>
  );
}

/**
 * Helper function to get part title based on part number
 */
function getPartTitle(partNumber: number): string {
  switch (partNumber) {
    case 1:
      return 'THE CENTRAL AND SUPERUNIVERSES';
    case 2:
      return 'THE LOCAL UNIVERSE';
    case 3:
      return 'THE HISTORY OF URANTIA';
    case 4:
      return 'THE LIFE AND TEACHINGS OF JESUS';
    default:
      return '';
  }
}
