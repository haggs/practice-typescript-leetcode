import { BinaryNode } from '../common/BinaryNode.js';
import { breadthFirstTraverse } from './breadthFirstTraverse.js';

describe('breadthFirstTraverse', () => {
  it('traverses breadth first', () => {
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
});
