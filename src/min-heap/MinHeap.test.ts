import { MinHeap } from './MinHeap.js';

describe('MinHeap', () => {
  describe('pop', () => {
    it('always gives the minimum value', () => {
      const heap = new MinHeap();
      heap.insert(100);
      heap.insert(0);
      heap.insert(50);

      const results = [heap.pop(), heap.pop(), heap.pop()];
      const expected = [{ value: 0 }, { value: 50 }, { value: 100 }];

      expect(results).toEqual(expected);
    });

    it('returns null when there is nothing in the heap', () => {
      const heap = new MinHeap();
      expect(heap.pop()).toBeNull();
    });
  });
});
