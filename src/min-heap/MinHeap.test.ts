import { MinHeap } from './MinHeap.js';
import { describe, it } from 'vitest';

describe.concurrent('MinHeap', async () => {
  describe.concurrent('pop', async () => {
    it.concurrent('always gives the minimum value', async ({ expect }) => {
      const heap = new MinHeap();
      heap.insert(100);
      heap.insert(0);
      heap.insert(50);

      const results = [heap.pop(), heap.pop(), heap.pop()];
      const expected = [{ value: 0 }, { value: 50 }, { value: 100 }];

      expect(results).toEqual(expected);
    });

    it.concurrent(
      'returns null when there is nothing in the heap',
      async ({ expect }) => {
        const heap = new MinHeap();
        expect(heap.pop()).toBeNull();
      },
    );
  });
});
