import {
  tagContentWithPronunciation,
  tagSpecificTerms,
  extractUrantiaTerms,
  addPauses,
} from '../pronunciation-tagger';

describe('Pronunciation Tagger', () => {
  describe('tagContentWithPronunciation', () => {
    it('should tag Urantia terms with SSML phonetic markup', () => {
      const text = 'Urantia is located in Nebadon.';
      const tagged = tagContentWithPronunciation(text, 'ssml');

      expect(tagged).toContain('<phoneme alphabet="ipa" ph="yu-RAN-sha">Urantia</phoneme>');
      expect(tagged).toContain('<phoneme alphabet="ipa" ph="NEB-a-don">Nebadon</phoneme>');
    });

    it('should tag Urantia terms with Narakeet phonetic markup', () => {
      const text = 'Urantia is located in Nebadon.';
      const tagged = tagContentWithPronunciation(text, 'narakeet');

      expect(tagged).toContain('<phoneme alphabet="ipa" ph="yu-RAN-sha">Urantia... ...</phoneme>');
      expect(tagged).toContain('<phoneme alphabet="ipa" ph="NEB-a-don">Nebadon... ...</phoneme>');
    });

    it('should not tag terms that are not in the dictionary', () => {
      const text = 'Earth is a planet in the solar system.';
      const tagged = tagContentWithPronunciation(text, 'ssml');

      expect(tagged).toBe(text);
    });

    it('should handle terms with different capitalization', () => {
      const text = 'URANTIA is located in nebadon.';
      const tagged = tagContentWithPronunciation(text, 'ssml');

      expect(tagged).toContain('<phoneme alphabet="ipa" ph="yu-RAN-sha">URANTIA</phoneme>');
      expect(tagged).toContain('<phoneme alphabet="ipa" ph="NEB-a-don">nebadon</phoneme>');
    });
  });

  describe('tagSpecificTerms', () => {
    it('should only tag the specified terms', () => {
      const text = 'Urantia is located in Nebadon, which is part of Orvonton.';
      const tagged = tagSpecificTerms(text, ['Nebadon'], 'ssml');

      expect(tagged).not.toContain('<phoneme alphabet="ipa" ph="yu-RAN-sha">Urantia</phoneme>');
      expect(tagged).toContain('<phoneme alphabet="ipa" ph="NEB-a-don">Nebadon</phoneme>');
      expect(tagged).not.toContain('<phoneme alphabet="ipa" ph="or-VON-ton">Orvonton</phoneme>');
    });

    it('should handle terms that are not in the dictionary', () => {
      const text = 'Urantia is located in Nebadon.';
      const tagged = tagSpecificTerms(text, ['Earth'], 'ssml');

      expect(tagged).toBe(text);
    });
  });

  describe('extractUrantiaTerms', () => {
    it('should extract Urantia terms from text', () => {
      const text = 'Urantia is located in Nebadon, which is part of Orvonton.';
      const terms = extractUrantiaTerms(text);

      expect(terms).toContain('Urantia');
      expect(terms).toContain('Nebadon');
      expect(terms).toContain('Orvonton');
    });

    it('should return an empty array if no terms are found', () => {
      const text = 'Earth is a planet in the solar system.';
      const terms = extractUrantiaTerms(text);

      expect(terms).toEqual([]);
    });
  });

  describe('addPauses', () => {
    it('should add pauses after sentences', () => {
      const text = 'This is a sentence. This is another sentence.';
      const withPauses = addPauses(text);

      expect(withPauses).toBe('This is a sentence... ... This is another sentence... ... ');
    });

    it('should add pauses after commas', () => {
      const text = 'This is a phrase, and this is another phrase.';
      const withPauses = addPauses(text);

      expect(withPauses).toBe('This is a phrase,... and this is another phrase... ... ');
    });
  });
});
