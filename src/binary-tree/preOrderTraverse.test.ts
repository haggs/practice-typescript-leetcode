import { BinaryNode } from '../common/BinaryNode.js';
import { preOrderTraverse } from './preOrderTraverse.js';

describe('preOrderTraverse', () => {
  it('traverses in the correct order', () => {
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

    const path = preOrderTraverse(a, 'e');

    expect(path).toEqual(['a', 'b', 'c', 'd', 'e']);
  });
});
