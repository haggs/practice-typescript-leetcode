import { Point } from './Point.js';
import { findKClosestPoints } from './findKClosestPoints.js';

describe('findKClosestPoints', () => {
  it('returns the correct points', () => {
    const origin: Point = [0, 0];
    const points: Point[] = [
      [0, 4], // Distance = 4
      [-4, -8], // Distance = 8.94427
      [1, 2], // Distance = 2.23606
    ];
    const k = 2;

    const result = findKClosestPoints(points, k, origin);
    const expected = [
      [1, 2],
      [0, 4],
    ];

    expect(result).toEqual(expected);
  });
});
