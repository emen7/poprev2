/**
 * Sample data for UB Reader demo
 */

export interface Paragraph {
  number: number;
  text: string;
  isTopicChange?: boolean;
}

export interface Section {
  number: number;
  title: string;
  paragraphs: Paragraph[];
}

export interface Paper {
  title: string;
  author: string;
  date: string;
  sections: Section[];
}

export const samplePaper: Paper = {
  title: 'The Urantia Book: A Study of Cosmic Philosophy',
  author: 'Anonymous',
  date: '1955',
  sections: [
    {
      number: 1,
      title: 'Introduction to Cosmic Philosophy',
      paragraphs: [
        {
          number: 1,
          text: 'The universe of universes presents phenomena of deity evolution at all levels of cosmic realities. The potential of divine perfection exists in all creation, and the evolutionary technique is the method by which this potential is gradually realized in time and space.',
        },
        {
          number: 2,
          text: 'The comprehension of cosmic philosophy requires a broad perspective that encompasses both the material and spiritual aspects of existence. This dual nature of reality forms the foundation upon which all meaningful understanding must be built.',
        },
        {
          number: 3,
          text: 'Throughout the ages, human beings have sought to understand their place in the cosmos. This search has led to various philosophical and religious systems, each attempting to provide answers to the fundamental questions of existence.',
        },
        {
          number: 4,
          text: 'The study of cosmic philosophy involves the recognition that truth is both relative and progressive. What may be considered true at one level of understanding may be transcended at higher levels of cosmic comprehension.',
          isTopicChange: true,
        },
        {
          number: 5,
          text: 'Material existence represents only one aspect of the multidimensional reality that comprises the grand universe. Beyond the physical realm lies a vast spiritual cosmos that interpenetrates and gives meaning to material existence.',
        },
        {
          number: 6,
          text: 'The evolution of the cosmos follows a divine pattern that reflects the purpose and plan of the Universal Creator. This pattern is discernible at all levels of reality, from the smallest atomic particles to the largest galactic structures.',
        },
        {
          number: 7,
          text: 'Human consciousness, with its capacity for self-reflection and spiritual insight, represents a unique evolutionary achievement in the cosmos. Through this consciousness, individuals can participate in the ongoing process of cosmic evolution.',
          isTopicChange: true,
        },
        {
          number: 8,
          text: 'The development of cosmic philosophy requires the integration of scientific knowledge, philosophical wisdom, and spiritual insight. No single approach can provide a complete understanding of the multifaceted nature of reality.',
        },
        {
          number: 9,
          text: 'Throughout history, various civilizations have contributed valuable insights to the evolving understanding of cosmic philosophy. Each cultural perspective adds a unique dimension to the collective wisdom of humanity.',
        },
        {
          number: 10,
          text: 'The pursuit of truth is a never-ending journey that spans both time and eternity. As finite beings, humans can approach truth asymptotically, continuously growing in understanding without ever achieving complete comprehension in the mortal state.',
        },
        {
          number: 11,
          text: 'The concept of progressive revelation suggests that truth is disclosed to humanity in accordance with evolving capacity for understanding. Each age receives the light it is capable of comprehending and utilizing for spiritual growth.',
          isTopicChange: true,
        },
        {
          number: 12,
          text: 'The material cosmos, with its billions of galaxies and countless stars, provides the physical stage upon which the drama of spiritual evolution unfolds. The vastness of space reflects the infinite nature of the divine reality that sustains it.',
        },
        {
          number: 13,
          text: 'Time represents the sequential aspect of reality that allows for growth and development. In the eternal perspective, all moments exist simultaneously, but in the temporal experience, events unfold progressively, enabling evolutionary advancement.',
        },
        {
          number: 14,
          text: 'The relationship between the finite and the infinite constitutes one of the profound mysteries of cosmic philosophy. How the absolute and unchanging can relate to the relative and evolving presents a paradox that challenges human understanding.',
          isTopicChange: true,
        },
        {
          number: 15,
          text: 'The concept of personality occupies a central place in cosmic philosophy. Personality represents the unique identity that persists through all changes and transformations, providing continuity of consciousness and experience.',
        },
      ],
    },
    {
      number: 2,
      title: 'The Nature of Reality',
      paragraphs: [
        {
          number: 16,
          text: 'Reality encompasses both the actual and the potential, the absolute and the relative, the eternal and the temporal. These complementary aspects form a unified whole that transcends the limitations of any single perspective.',
        },
        {
          number: 17,
          text: 'The material level of reality, while most immediately apparent to human perception, represents only the outer surface of a multidimensional cosmos. Beneath the physical appearance lies layers of energy, mind, and spirit reality.',
        },
        {
          number: 18,
          text: 'The concept of energy-matter provides a bridge between the physical and metaphysical aspects of reality. Modern physics has demonstrated that matter is essentially a form of energy, confirming the unity underlying apparent diversity.',
        },
      ],
    },
  ],
};

export const sampleNotes = [
  {
    id: '1',
    text: 'The concept of progressive revelation is particularly interesting in relation to modern scientific discoveries.',
    paragraphNumber: 11,
    timestamp: '2023-05-01T14:30:00Z',
  },
  {
    id: '2',
    text: 'Compare this view of personality with existentialist philosophy, especially Kierkegaard and Sartre.',
    paragraphNumber: 15,
    timestamp: '2023-05-02T09:15:00Z',
  },
  {
    id: '3',
    text: 'The integration of scientific knowledge with spiritual insight reminds me of Teilhard de Chardin\'s approach.',
    paragraphNumber: 8,
    timestamp: '2023-05-03T16:45:00Z',
  },
];

export const sampleQuotes = [
  {
    id: '1',
    text: 'The universe of universes presents phenomena of deity evolution at all levels of cosmic realities.',
    paragraphNumber: 1,
    timestamp: '2023-05-01T10:20:00Z',
  },
  {
    id: '2',
    text: 'The pursuit of truth is a never-ending journey that spans both time and eternity.',
    paragraphNumber: 10,
    timestamp: '2023-05-02T11:30:00Z',
  },
  {
    id: '3',
    text: 'The relationship between the finite and the infinite constitutes one of the profound mysteries of cosmic philosophy.',
    paragraphNumber: 14,
    timestamp: '2023-05-03T14:15:00Z',
  },
];
