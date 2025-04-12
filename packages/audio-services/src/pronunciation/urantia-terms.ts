import { PronunciationEntry } from '../types';

/**
 * Sample of Urantia terms with their pronunciations from the official guide:
 * https://www.urantia.org/sites/default/files/study-materials/terms-and-pronunciation/Term-and-Pronunciation-List-for-The-Urantia-Book-2023-en.pdf
 *
 * This is a subset of the full dictionary. In a production implementation,
 * this would be generated from the PDF or stored in a database.
 */
export const urantiaPronunciations: PronunciationEntry[] = [
  {
    term: 'Andovontia',
    ipa: 'an-do-VON-sha',
    category: 'Personality',
    pageReference: '302',
  },
  {
    term: 'Avalon',
    ipa: 'AV-a-lon',
    category: 'Place',
    pageReference: '492',
  },
  {
    term: 'Caligastia',
    ipa: 'kal-i-GAS-sha',
    category: 'Personality',
    pageReference: '602',
  },
  {
    term: 'Divinington',
    ipa: 'di-VIN-ing-ton',
    category: 'Sacred Sphere',
    pageReference: '144',
  },
  {
    term: 'Edentia',
    ipa: 'e-DEN-sha',
    category: 'Place',
    pageReference: '174',
  },
  {
    term: 'Fandor',
    ipa: 'FAN-dor',
    category: 'Personality',
    pageReference: '1015',
  },
  {
    term: 'Grandfanda',
    ipa: 'grand-FAN-da',
    category: 'Personality',
    pageReference: '270',
  },
  {
    term: 'Havona',
    ipa: 'ha-VO-na',
    category: 'Place',
    pageReference: '7',
  },
  {
    term: 'Jerusem',
    ipa: 'JE-ru-sem',
    category: 'Place',
    pageReference: '174',
  },
  {
    term: 'Lanonandek',
    ipa: 'la-no-NAN-dek',
    category: 'Personality Order',
    pageReference: '223',
  },
  {
    term: 'Lucifer',
    ipa: 'LU-si-fer',
    category: 'Personality',
    pageReference: '601',
  },
  {
    term: 'Melchizedek',
    ipa: 'mel-KIZ-e-dek',
    category: 'Personality Order',
    pageReference: '223',
  },
  {
    term: 'Nebadon',
    ipa: 'NEB-a-don',
    category: 'Place',
    pageReference: '1',
  },
  {
    term: 'Norlatiadek',
    ipa: 'nor-LA-ti-a-dek',
    category: 'Place',
    pageReference: '174',
  },
  {
    term: 'Orvonton',
    ipa: 'or-VON-ton',
    category: 'Place',
    pageReference: '1',
  },
  {
    term: 'Paradise',
    ipa: 'PAR-a-dise',
    category: 'Place',
    pageReference: '1',
  },
  {
    term: 'Satania',
    ipa: 'sa-TA-ni-a',
    category: 'Place',
    pageReference: '174',
  },
  {
    term: 'Solonia',
    ipa: 'so-LO-ni-a',
    category: 'Personality',
    pageReference: '1015',
  },
  {
    term: 'Splandon',
    ipa: 'SPLAN-don',
    category: 'Place',
    pageReference: '174',
  },
  {
    term: 'Tabamantia',
    ipa: 'tab-a-MAN-sha',
    category: 'Personality',
    pageReference: '273',
  },
  {
    term: 'Urantia',
    ipa: 'yu-RAN-sha',
    category: 'Place',
    pageReference: '1',
  },
  {
    term: 'Uversa',
    ipa: 'yu-VER-sa',
    category: 'Place',
    pageReference: '1',
  },
  {
    term: 'Vorondadek',
    ipa: 'vo-RON-da-dek',
    category: 'Personality Order',
    pageReference: '223',
  },
  {
    term: 'Salvington',
    ipa: 'SAL-ving-ton',
    category: 'Place',
    pageReference: '1',
  },
  {
    term: 'Serapatatia',
    ipa: 'ser-a-pa-TA-sha',
    category: 'Personality',
    pageReference: '841',
  },
];

/**
 * Get a pronunciation entry by term
 */
export function getPronunciation(term: string): PronunciationEntry | undefined {
  return urantiaPronunciations.find(entry => entry.term.toLowerCase() === term.toLowerCase());
}

/**
 * Search for pronunciation entries by partial term
 */
export function searchPronunciations(partialTerm: string): PronunciationEntry[] {
  const lowerPartial = partialTerm.toLowerCase();
  return urantiaPronunciations.filter(entry => entry.term.toLowerCase().includes(lowerPartial));
}

/**
 * Get all pronunciations by category
 */
export function getPronunciationsByCategory(category: string): PronunciationEntry[] {
  return urantiaPronunciations.filter(entry => entry.category === category);
}
