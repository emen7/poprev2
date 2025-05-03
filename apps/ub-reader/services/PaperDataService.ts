/**
 * Paper Data Service
 *
 * This service provides functions for fetching paper data and related information.
 * It uses the ContentService to load real content when available and falls back to mock data.
 */

import { loadPaper, isPaperAvailable } from './ContentService';

export interface Paragraph {
  number: number;
  text: string;
}

export interface Section {
  number: number;
  title: string;
  paragraphs: Paragraph[];
}

export interface Paper {
  number: number;
  title: string;
  author: string;
  sections: Section[];
}

export interface Part {
  number: number;
  title: string;
  papers: { number: number; title: string }[];
}

export interface SectionInfo {
  number: number;
  title: string;
}

export interface PaperInfo {
  number: number;
  title: string;
  author: string;
  sections: SectionInfo[];
}

export interface PartInfo {
  number: number;
  title: string;
  papers: PaperInfo[];
}

// Mock data for the parts of the Urantia Book
const PARTS: Part[] = [
  {
    number: 1,
    title: 'THE CENTRAL AND SUPERUNIVERSES',
    papers: Array.from({ length: 31 }, (_, i) => ({
      number: i + 1,
      title: getPaperTitle(i + 1),
    })),
  },
  {
    number: 2,
    title: 'THE LOCAL UNIVERSE',
    papers: Array.from({ length: 25 }, (_, i) => ({
      number: i + 32,
      title: getPaperTitle(i + 32),
    })),
  },
  {
    number: 3,
    title: 'THE HISTORY OF URANTIA',
    papers: Array.from({ length: 63 }, (_, i) => ({
      number: i + 57,
      title: getPaperTitle(i + 57),
    })),
  },
  {
    number: 4,
    title: 'THE LIFE AND TEACHINGS OF JESUS',
    papers: Array.from({ length: 77 }, (_, i) => ({
      number: i + 120,
      title: getPaperTitle(i + 120),
    })),
  },
];

// Foreword sections with Roman numerals
export const FOREWORD_SECTIONS = [
  { number: 1, romanNumeral: 'I', title: 'Deity and Divinity' },
  { number: 2, romanNumeral: 'II', title: 'God' },
  { number: 3, romanNumeral: 'III', title: 'The First Source and Center' },
  { number: 4, romanNumeral: 'IV', title: 'Universe Reality' },
  { number: 5, romanNumeral: 'V', title: 'Personality Realities' },
  { number: 6, romanNumeral: 'VI', title: 'Energy and Pattern' },
  { number: 7, romanNumeral: 'VII', title: 'The Supreme Being' },
  { number: 8, romanNumeral: 'VIII', title: 'God the Sevenfold' },
  { number: 9, romanNumeral: 'IX', title: 'God the Ultimate' },
  { number: 10, romanNumeral: 'X', title: 'God the Absolute' },
  { number: 11, romanNumeral: 'XI', title: 'The Three Absolutes' },
  { number: 12, romanNumeral: 'XII', title: 'The Trinities' },
];

// Helper function to get paper title based on paper number
function getPaperTitle(paperNumber: number): string {
  // This would be replaced with actual titles from a database
  const titles: Record<number, string> = {
    1: 'The Universal Father',
    2: 'The Nature of God',
    3: 'The Attributes of God',
    4: "God's Relation to the Universe",
    5: "God's Relation to the Individual",
    6: 'The Eternal Son',
    7: 'Relation of the Eternal Son to the Universe',
    8: 'The Infinite Spirit',
    9: 'Relation of the Infinite Spirit to the Universe',
    10: 'The Paradise Trinity',
    11: 'The Eternal Isle of Paradise',
    12: 'The Universe of Universes',
    13: 'The Sacred Spheres of Paradise',
    14: 'The Central and Divine Universe',
    15: 'The Seven Superuniverses',
    16: 'The Seven Master Spirits',
    17: 'The Seven Supreme Spirit Groups',
    18: 'The Supreme Trinity Personalities',
    19: 'The Co-ordinate Trinity-Origin Beings',
    20: 'The Paradise Sons of God',
    21: 'The Paradise Creator Sons',
    22: 'The Trinitized Sons of God',
    23: 'The Solitary Messengers',
    24: 'Higher Personalities of the Infinite Spirit',
    25: 'The Messenger Hosts of Space',
    26: 'Ministering Spirits of the Central Universe',
    27: 'Ministry of the Primary Supernaphim',
    28: 'Ministering Spirits of the Superuniverses',
    29: 'The Universe Power Directors',
    30: 'Personalities of the Grand Universe',
    31: 'The Corps of the Finality',
    32: 'The Evolution of Local Universes',
    33: 'Administration of the Local Universe',
    34: 'The Local Universe Mother Spirit',
    35: 'The Local Universe Sons of God',
    36: 'The Life Carriers',
    57: 'The Origin of Urantia',
    58: 'Life Establishment on Urantia',
    120: 'The Bestowal of Michael on Urantia',
    121: "The Times of Michael's Bestowal",
    196: 'The Faith of Jesus',
  };

  return titles[paperNumber] || `Paper ${paperNumber}`;
}

// Helper function to get paper author based on paper number
function getPaperAuthor(paperNumber: number): string {
  // This would be replaced with actual authors from a database
  const authors: Record<number, string> = {
    0: 'a Divine Counselor', // Foreword
    1: 'a Divine Counselor',
    2: 'a Divine Counselor',
    3: 'a Divine Counselor',
    4: 'a Divine Counselor',
    5: 'a Divine Counselor',
    6: 'a Divine Counselor',
    7: 'a Divine Counselor',
    8: 'a Divine Counselor',
    9: 'a Divine Counselor',
    10: 'a Universal Censor',
    11: 'a Perfector of Wisdom',
    12: 'a Perfector of Wisdom',
    13: 'a Perfector of Wisdom',
    14: 'a Perfector of Wisdom',
    15: 'a Universal Censor',
    16: 'a Universal Censor',
    17: 'a Divine Counselor',
    18: 'a Divine Counselor',
    19: 'a Divine Counselor',
    20: 'a Perfector of Wisdom',
    21: 'a Perfector of Wisdom',
    22: 'a Mighty Messenger',
    23: 'a Divine Counselor',
    24: 'a Divine Counselor',
    25: 'One High in Authority',
    26: 'a Perfector of Wisdom',
    27: 'a Perfector of Wisdom',
    28: 'a Mighty Messenger',
    29: 'a Universal Censor',
    30: 'a Mighty Messenger',
    31: 'a Divine Counselor and One Without Name and Number',
    32: 'a Mighty Messenger',
    33: 'Chief of Archangels',
    34: 'a Mighty Messenger',
    35: 'Chief of Archangels',
    36: 'a Vorondadek Son',
    57: 'a Life Carrier',
    58: 'a Life Carrier',
    120: 'Mantutia Melchizedek',
    121: 'Midwayer Commission',
    196: 'a Melchizedek',
  };

  return authors[paperNumber] || 'Unknown';
}

// Helper function to get section titles for a paper
function getSectionTitles(paperNumber: number): string[] {
  // This would be replaced with actual section titles from a database
  const sectionTitles: Record<number, string[]> = {
    0: FOREWORD_SECTIONS.map(section => section.title), // Foreword
    1: [
      "The Father's Name",
      'The Reality of God',
      'God is a Universal Spirit',
      'The Mystery of God',
      'Personality of the Universal Father',
      'Personality in the Universe',
      'Spiritual Value of the Personality Concept',
    ],
    2: [
      'The Infinity of God',
      "The Father's Eternal Perfection",
      'Justice and Righteousness',
      'The Divine Mercy',
      'The Love of God',
      'The Goodness of God',
      'Divine Truth and Beauty',
    ],
    3: [
      "God's Everywhereness",
      "God's Infinite Power",
      "God's Universal Knowledge",
      "God's Limitlessness",
      "The Father's Supreme Rule",
      "The Father's Primacy",
    ],
    4: [
      'The Universe Attitude of the Father',
      'God and Nature',
      "God's Unchanging Character",
      'The Realization of God',
      'Erroneous Ideas of God',
    ],
    5: [
      'The Approach to God',
      'The Presence of God',
      'True Worship',
      'God in Religion',
      'The Consciousness of God',
      'The God of Personality',
    ],
  };

  return sectionTitles[paperNumber] || Array.from({ length: 5 }, (_, i) => `Section ${i + 1}`);
}

/**
 * Get all parts of the Urantia Book
 */
export function getParts(): Part[] {
  return PARTS;
}

/**
 * Get a specific part by number
 */
export function getPart(partNumber: number): Part | undefined {
  return PARTS.find(part => part.number === partNumber);
}

/**
 * Get a specific paper by number
 */
export async function getPaper(paperNumber: number): Promise<Paper> {
  try {
    // Check if the paper is available in the content repository
    const isAvailable = await isPaperAvailable(paperNumber);

    if (isAvailable) {
      // Load the paper from the content repository
      const paper = await loadPaper(paperNumber);

      if (paper) {
        // Return the paper
        return paper;
      }
    }
  } catch (error) {
    console.error(`Error loading paper ${paperNumber} from content repository:`, error);
  }

  // If the paper is not available or there was an error, fall back to mock data
  // Removed console.log

  const sectionTitles = getSectionTitles(paperNumber);

  return {
    number: paperNumber,
    title: getPaperTitle(paperNumber),
    author: getPaperAuthor(paperNumber),
    sections: sectionTitles.map((title, index) => ({
      number: index + 1,
      title,
      paragraphs: Array.from({ length: 2 }, (_, i) => ({
        number: i + 1,
        text: `This is paragraph ${i + 1} of section ${
          index + 1
        } in paper ${paperNumber}. In a real implementation, this would be the actual text from the Urantia Book.`,
      })),
    })),
  };
}

/**
 * Get the part number for a paper
 */
export function getPartForPaper(paperNumber: number): number {
  if (paperNumber >= 1 && paperNumber <= 31) return 1;
  if (paperNumber >= 32 && paperNumber <= 56) return 2;
  if (paperNumber >= 57 && paperNumber <= 119) return 3;
  if (paperNumber >= 120 && paperNumber <= 196) return 4;
  return 0; // Unknown or Foreword
}

/**
 * Get the previous paper number
 */
export function getPreviousPaper(paperNumber: number): number | null {
  // Handle special cases
  if (paperNumber <= 1) return null;

  return paperNumber - 1;
}

/**
 * Get the next paper number
 */
export function getNextPaper(paperNumber: number): number | null {
  // Handle special cases
  if (paperNumber >= 196) return null;

  return paperNumber + 1;
}

/**
 * Get detailed information for all parts, papers, and sections
 */
export async function getContentsData(): Promise<PartInfo[]> {
  // This would fetch data from an API or database in a real implementation

  const partsInfo: PartInfo[] = [];

  // Add Foreword as a special case
  const forewordInfo: PaperInfo = {
    number: 0,
    title: 'Foreword',
    author: getPaperAuthor(0),
    sections: FOREWORD_SECTIONS.map(section => ({
      number: section.number,
      title: section.title,
    })),
  };

  // Process each part
  for (const part of PARTS) {
    const paperInfos: PaperInfo[] = [];

    // If this is Part I, add the Foreword
    if (part.number === 1) {
      paperInfos.push(forewordInfo);
    }

    // Add papers for this part
    for (const paper of part.papers) {
      const sectionTitles = getSectionTitles(paper.number);

      paperInfos.push({
        number: paper.number,
        title: paper.title,
        author: getPaperAuthor(paper.number),
        sections: sectionTitles.map((title, index) => ({
          number: index + 1,
          title,
        })),
      });
    }

    partsInfo.push({
      number: part.number,
      title: part.title,
      papers: paperInfos,
    });
  }

  return partsInfo;
}
