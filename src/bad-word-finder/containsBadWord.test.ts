import { containsBadWord } from './containsBadWord.js';
import { describe, it } from 'vitest';

describe.concurrent('containsBadWord', async () => {
  it.concurrent('finds bad words', async ({ expect }) => {
    expect(containsBadWord('them@ddest')).toBe(true);
    expect(containsBadWord('theb@ddest')).toBe(true);
    expect(containsBadWord('k|11y0urM0th3r')).toBe(true);
    expect(containsBadWord('mud')).toBe(false);
  });
});
