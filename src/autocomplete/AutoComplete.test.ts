import { describe, it } from 'vitest';
import { AutoComplete } from './AutoComplete.js';

describe.concurrent('Autocomplete', async () => {
  it.concurrent(
    'constructor should insert all words in first arg',
    async ({ expect }) => {
      const autocomplete = new AutoComplete(['great', 'grand']);
      expect(autocomplete.contains('great')).toBe(true);
      expect(autocomplete.contains('grand')).toBe(true);
    },
  );

  describe.concurrent('insert', async () => {
    it.concurrent(
      'throws an error if word contains a non-english character',
      async ({ expect }) => {
        const autocomplete = new AutoComplete();
        const insert = () => autocomplete.insert('*abc');
        expect(insert).toThrow();
      },
    );

    it.concurrent(
      'throws an error if word contains a non lowercase character',
      async ({ expect }) => {
        const autocomplete = new AutoComplete();
        const insert = () => autocomplete.insert('Abc');
        expect(insert).toThrow();
      },
    );
  });

  describe.concurrent('contains', async () => {
    it.concurrent('returns true if the word is there', async ({ expect }) => {
      const autocomplete = new AutoComplete();
      autocomplete.insert('great');
      autocomplete.insert('grand');
      expect(autocomplete.contains('great')).toBe(true);
      expect(autocomplete.contains('grand')).toBe(true);
    });

    it.concurrent(
      'returns false when given word is not inserted',
      async ({ expect }) => {
        const autocomplete = new AutoComplete();
        expect(autocomplete.contains('grape')).toBe(false);
      },
    );

    it.concurrent(
      'returns false when given a subset of an inserted word',
      async ({ expect }) => {
        const autocomplete = new AutoComplete();
        autocomplete.insert('great');
        expect(autocomplete.contains('gre')).toBe(false);
      },
    );
  });

  describe.concurrent('startsWith', async () => {
    it.concurrent(
      'returns inserted words that start with the given string',
      async ({ expect }) => {
        const autocomplete = new AutoComplete(['great', 'grand', 'grape']);
        const result = autocomplete.startsWith('gra');
        const expected = expect.arrayContaining(['grand', 'grape']);
        expect(result).toEqual(expected);
      },
    );

    it.concurrent(
      'returns an empty array if there are no words',
      async ({ expect }) => {
        const autocomplete = new AutoComplete(['great', 'grand', 'grape']);
        const result = autocomplete.startsWith('s');
        expect(result).toEqual([]);
      },
    );
  });
});
