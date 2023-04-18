import { containsBadWord } from './containsBadWord.js';

describe('containsBadWord', () => {
  it('finds bad words', () => {
    expect(containsBadWord('them@ddest')).toBe(true);
    expect(containsBadWord('theb@ddest')).toBe(true);
    expect(containsBadWord('k|11y0urM0th3r')).toBe(true);
    expect(containsBadWord('frank')).toBe(false);
  });
});
