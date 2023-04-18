import { BinaryNode } from '../common/BinaryNode.js';
import { inOrderTraverse } from './inOrderTraverse.js';

describe('inOrderTraverse', () => {
  it('traverses in the correct order', () => {
    /**
     *         a
     *        / \
     *       b   e
     *      / \
     *     d   c
     */
    const a = new BinaryNode('a');
    const b = new BinaryNode('b');
    const c = new BinaryNode('c');
    const d = new BinaryNode('d');
    const e = new BinaryNode('e');

    a.left = b;
    a.right = e;
    b.left = d;
    b.right = c;

    const path = inOrderTraverse(a, 'e');

    expect(path).toEqual(['d', 'b', 'c', 'a', 'e']);
  });
});
