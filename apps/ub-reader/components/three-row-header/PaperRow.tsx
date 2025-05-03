/**
 * Paper Row Component (Row 2)
 *
 * This is the second row of the 3-row header design.
 * It displays the paper name, left-aligned with medium font size.
 */

&apos;use client';

import React from &apos;react';

import type { PaperRowProps } from './types';
import './PaperRow.css';

export const PaperRow: React.FC<PaperRowProps> = ({ _paperTitle }) => {
  return (
    <div className="paper-row">
      <h2 className="paper-title">{_paperTitle}</h2>
    </div>
  );
};
