'use client';

import React from 'react';

import { ThemeEnabledReader } from '../../components/ThemeEnabledReader';
import { UBNumberedList } from '../../components/UBNumberedList';
import { UBParagraph } from '../../components/UBParagraph';
import { UBSectionDivider } from '../../components/UBSectionDivider';
import { UBTable } from '../../components/UBTable';

/**
 * Theme Example Page
 *
 * This page demonstrates the Modern and Traditional themes
 * with various content elements like paragraphs, lists, and tables.
 */
export default function ThemeExamplePage() {
  // Sample paragraphs
  const paragraphs = [
    {
      number: 1,
      text: 'OF ALL the names by which God the Father is known throughout the universes, those which designate him as the <i>First Source</i> and the <i>Universe Center</i> are most often encountered.',
    },
    {
      number: 2,
      text: 'The Universal Father never imposes any form of arbitrary recognition, formal worship, or slavish service upon the intelligent will creatures of the universes.',
    },
  ];

  // Sample list items
  const listItems = [
    {
      id: 1,
      content:
        'The First Source and Universe Center has never revealed himself by name, only by nature.',
    },
    {
      id: 2,
      content:
        'If we believe that we are the children of this Creator, it is only natural that we should eventually call him Father.',
    },
    {
      id: 3,
      content:
        'But this is the name of our own choosing, and it grows out of the recognition of our personal relationship with the First Source and Center.',
    },
  ];

  // Sample table rows
  const tableRows = [
    {
      cells: [
        { content: 'Name', isHeader: true },
        { content: 'Description', isHeader: true },
      ],
    },
    {
      cells: [
        { content: 'First Source' },
        { content: 'Designates God as the original source of all reality' },
      ],
    },
    {
      cells: [
        { content: 'Universe Center' },
        { content: 'Designates God as the center of all universe reality' },
      ],
    },
  ];

  return (
    <ThemeEnabledReader title="Theme Example">
      <h2>Modern and Traditional Theme Example</h2>

      <p>
        This page demonstrates the Modern and Traditional themes. Use the settings panel to switch
        between them.
      </p>

      <h3>Paragraphs</h3>
      {paragraphs.map(paragraph => (
        <UBParagraph key={paragraph.number} paragraph={paragraph} />
      ))}

      <UBSectionDivider />

      <h3>Numbered List</h3>
      <UBNumberedList items={listItems} />

      <h3>Table</h3>
      <UBTable caption="Names of God" rows={tableRows} />

      <p>
        Toggle between Modern and Traditional themes using the settings panel (gear icon) in the top
        right corner.
      </p>
    </ThemeEnabledReader>
  );
}
