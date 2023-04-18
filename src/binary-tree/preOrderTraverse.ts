import { BinaryNode } from '../common/BinaryNode.js';

function walk<T>(
  currentNode: BinaryNode<T> | null,
  value: T,
  path: T[],
): T[] | null {
  if (!currentNode) {
    return null;
  }

  path.push(currentNode.value);

  if (currentNode.value === value) {
    return path;
  }

  const leftPath = walk(currentNode.left, value, path);

  if (leftPath) {
    return leftPath;
  }

  const rightPath = walk(currentNode.right, value, path);

  if (rightPath) {
    return rightPath;
  }

  return null;
}

export function preOrderTraverse<T>(head: BinaryNode<T>, value: T): T[] | null {
  return walk(head, value, []);
}
