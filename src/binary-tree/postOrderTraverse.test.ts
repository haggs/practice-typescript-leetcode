import { BinaryNode } from '../common/BinaryNode.js';
import { postOrderTraverse } from './postOrderTraverse.js';
import { describe, it } from 'vitest';

describe.concurrent('postOrderTraverse', async () => {
  it.concurrent('traverses in the correct order', async ({ expect }) => {
    /**
     *         a
     *        / \
     *       b   d
     *      /   /
     *     c   e
     */
    const a = new BinaryNode('a');
    const b = new BinaryNode('b');
    const c = new BinaryNode('c');
    const d = new BinaryNode('d');
    const e = new BinaryNode('e');

    a.left = b;
    a.right = d;
    b.left = c;
    d.left = e;

    const path = postOrderTraverse(a, 'e');

    expect(path).toEqual(['c', 'b', 'e']);
  });
});
