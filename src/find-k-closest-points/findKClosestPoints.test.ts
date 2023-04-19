import { Point } from './Point.js';
import { findKClosestPoints } from './findKClosestPoints.js';
import { describe, it } from 'vitest';

describe.concurrent('findKClosestPoints', async () => {
  it.concurrent('returns the k closest points points', async ({ expect }) => {
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

  it.concurrent('returns an empty array if k < 1', async ({ expect }) => {
    const origin: Point = [0, 0];
    const points: Point[] = [
      [0, 4], // Distance = 4
      [-4, -8], // Distance = 8.94427
      [1, 2], // Distance = 2.23606
    ];
    const k = 0;

    const result = findKClosestPoints(points, k, origin);
    const expected: Point[] = [];

    expect(result).toEqual(expected);
  });

  it.concurrent(
    'returns an empty array there are no points given',
    async ({ expect }) => {
      const origin: Point = [0, 0];
      const points: Point[] = [];
      const k = 3;

      const result = findKClosestPoints(points, k, origin);
      const expected: Point[] = [];

      expect(result).toEqual(expected);
    },
  );
});
