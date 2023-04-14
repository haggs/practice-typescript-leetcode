import { MinHeap } from '../min-heap/MinHeap.js';
import { Point } from './Point.js';

/**
 * Distance = sqrt((x2 – x1)^2 + (y2 – y1)^2).
 */
function getDistanceBetweenPoints(a: Point, b: Point): number {
  return Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
}

/**
 * Returns the k closest points in points to origin
 */
export function findKClosestPoints(
  points: Point[],
  k: number,
  origin: Point,
): Point[] {
  if (!points.length) {
    return [];
  }

  const minHeap = new MinHeap<Point>();

  for (const point of points) {
    const distance = getDistanceBetweenPoints(point, origin);
    minHeap.insert(distance, point);
  }

  const kClosestPoints = [];

  while (kClosestPoints.length < k) {
    kClosestPoints.push(minHeap.pop().data);
  }

  return kClosestPoints;
}
