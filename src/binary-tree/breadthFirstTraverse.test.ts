import { BinaryNode } from '../common/BinaryNode.js';
import { breadthFirstTraverse } from './breadthFirstTraverse.js';
import { describe, it } from 'vitest';

// The two tests marked with concurrent will be run in parallel
describe.concurrent('breadthFirstTraverse', async () => {
  it.concurrent('traverses breadth first', async ({ expect }) => {
    /**
     *         a
     *        / \
     *       b   d
     *      /     \
     *     c       e
     */
    const a = new BinaryNode('a');
    const b = new BinaryNode('b');
    const c = new BinaryNode('c');
    const d = new BinaryNode('d');
    const e = new BinaryNode('e');

    a.left = b;
    a.right = d;
    b.left = c;
    d.right = e;

    const path = breadthFirstTraverse(a, 'e');

    expect(path).toEqual(['a', 'b', 'd', 'c', 'e']);
  });

  it.concurrent(
    'returns an empty path when value is not found',
    async ({ expect }) => {
      /**
       *         a
       *        / \
       *       b   d
       *      /     \
       *     c       e
       */
      const a = new BinaryNode('a');
      const b = new BinaryNode('b');
      const c = new BinaryNode('c');
      const d = new BinaryNode('d');
      const e = new BinaryNode('e');

      a.left = b;
      a.right = d;
      b.left = c;
      d.right = e;

      const path = breadthFirstTraverse(a, 'f');

      expect(path).toEqual([]);
    },
  );
});
