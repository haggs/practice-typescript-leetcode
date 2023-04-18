import { BinaryNode } from '../common/BinaryNode.js';

export function breadthFirstTraverse<T>(head: BinaryNode<T>, value: T): T[] {
  const nodesToExplore = [head];
  const path: T[] = [];

  while (nodesToExplore.length) {
    const currentNode = nodesToExplore.shift();
    if (currentNode) {
      path.push(currentNode.value);
      if (currentNode.value === value) {
        return path;
      }
      nodesToExplore.push(currentNode.left);
      nodesToExplore.push(currentNode.right);
    }
  }

  return [];
}
