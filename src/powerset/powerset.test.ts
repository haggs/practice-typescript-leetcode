import { powerset } from './powerset.js';
import { describe, it } from 'vitest';

describe.concurrent('powerset', async () => {
  it.concurrent('returns the correct powerset for []', async ({ expect }) => {
    const result = powerset([]);
    const expected = [[]];
    expect(result).toEqual(expected);
  });

  it.concurrent('returns the correct powerset for [1]', async ({ expect }) => {
    const result = powerset([1]);
    const expected = expect.arrayContaining([[], [1]]);
    expect(result).toEqual(expected);
  });

  it.concurrent(
    'returns the correct powerset for [1,2]',
    async ({ expect }) => {
      const result = powerset([1, 2]);
      const expected = expect.arrayContaining([[], [1], [2], [1, 2]]);
      expect(result).toEqual(expected);
    },
  );

  it.concurrent(
    'returns the correct powerset for [1,2,3]',
    async ({ expect }) => {
      const result = powerset([1, 2, 3]);
      const expected = expect.arrayContaining([
        [],
        [1],
        [2],
        [3],
        [1, 2],
        [1, 3],
        [2, 3],
        [1, 2, 3],
      ]);
      expect(result).toEqual(expected);
    },
  );
});
