import { AutoComplete } from './AutoComplete.js';

describe('Autocomplete', () => {
  it('constructor should insert all words in first arg', () => {
    const autocomplete = new AutoComplete(['great', 'grand']);
    expect(autocomplete.contains('great')).toBe(true);
    expect(autocomplete.contains('grand')).toBe(true);
  });

  it('insert throws an error if word contains non-lowercase or non-english character', () => {
    const autocomplete = new AutoComplete();
    const insert = () => autocomplete.insert('*!A');
    expect(insert).toThrow();
  });

  describe('contains', () => {
    it('returns true if the word is there', () => {
      const autocomplete = new AutoComplete();
      autocomplete.insert('great');
      autocomplete.insert('grand');
      expect(autocomplete.contains('great')).toBe(true);
      expect(autocomplete.contains('grand')).toBe(true);
    });

    it('returns false when given word is not inserted', () => {
      const autocomplete = new AutoComplete();
      expect(autocomplete.contains('grape')).toBe(false);
    });

    it('returns false when given a subset of an inserted word', () => {
      const autocomplete = new AutoComplete();
      autocomplete.insert('great');
      expect(autocomplete.contains('gre')).toBe(false);
    });
  });

  describe('startsWith', () => {
    it('returns inserted words that start with the given string', () => {
      const autocomplete = new AutoComplete(['great', 'grand', 'grape']);
      const result = autocomplete.startsWith('gra');
      const expected = expect.arrayContaining(['grand', 'grape']);
      expect(result).toEqual(expected);
    });

    it('returns an empty array if there are no words', () => {
      const autocomplete = new AutoComplete(['great', 'grand', 'grape']);
      const result = autocomplete.startsWith('s');
      expect(result).toEqual([]);
    });
  });
});
