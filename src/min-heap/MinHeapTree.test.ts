import { MinHeapTree } from './MinHeapTree.js';

describe('MinHeapTree', () => {
  describe('pop', () => {
    it('always gives the minimum value', () => {
      const heap = new MinHeapTree();
      heap.insert(100);
      heap.insert(0);
      heap.insert(50);
      heap.insert(75);

      const results = [
        heap.pop(), 
        heap.pop(), 
        heap.pop(), 
        heap.pop(), 
        heap.pop()
      ];
      
      const expected = [
        { value: 0, data: undefined },
        { value: 50, data: undefined },
        { value: 75, data: undefined },
        { value: 100, data: undefined },
        null
      ];

      expect(results).toEqual(expected);
    });

    it('returns null when there is nothing in the heap', () => {
      const heap = new MinHeapTree();
      expect(heap.pop()).toBeNull();
    });
  });
});
