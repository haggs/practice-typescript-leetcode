import { powerset } from './powerset';

describe('powerset', () => {
  it('returns the correct powerset for []', () => {
    const result = powerset([]);
    const expected = [[]];
    expect(result).toEqual(expected);
  });

  it('returns the correct powerset for [1]', () => {
    const result = powerset([1]);
    const expected = expect.arrayContaining([[], [1]]);
    expect(result).toEqual(expected);
  });

  it('returns the correct powerset for [1,2]', () => {
    const result = powerset([1, 2]);
    const expected = expect.arrayContaining([[], [1], [2], [1, 2]]);
    expect(result).toEqual(expected);
  });

  it('returns the correct powerset for [1,2,3]', () => {
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
  });
});
