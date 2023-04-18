import { BinaryNode } from '../common/BinaryNode.js';

function walk<T>(
  currentNode: BinaryNode<T> | null,
  value: T,
  path: T[],
): T[] | null {
  if (!currentNode) {
    return null;
  }

  const leftPath = walk(currentNode.left, value, path);
  if (leftPath) {
    return leftPath;
  }

  path.push(currentNode.value);
  if (currentNode.value === value) {
    return path;
  }

  const rightPath = walk(currentNode.right, value, path);
  if (rightPath) {
    return rightPath;
  }

  return null;
}

export function inOrderTraverse<T>(head: BinaryNode<T>, value: T): T[] | null {
  return walk(head, value, []);
}
