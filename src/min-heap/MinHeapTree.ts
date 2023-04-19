import { BinaryNode } from '../common/BinaryNode.js';

type HeapElement<DataType = undefined> = {
  value: number;
  data?: DataType;
};

export class MinHeapTree<DataType = undefined> {
  private head: BinaryNode<number, DataType> | null;

  constructor() {
    this.head = null;
  }

  insert(value: number, data?: DataType): void {
    // Create new node
    const newNode = new BinaryNode<number, DataType>(value, data);

    if (!this.head) {
      this.head = newNode;
    } else {
      // BFS for first empty spot to place new node
      const queue = [this.head];

      while (queue.length) {
        const currentNode = queue.shift();

        if (!currentNode) {
          return;
        }

        if (!currentNode.left) {
          // here's our spot
          currentNode.left = newNode;
          newNode.parent = currentNode;
          this.heapifyUp(newNode);
          return;
        } else if (!currentNode.right) {
          // here's our spot
          currentNode.right = newNode;
          newNode.parent = currentNode;
          this.heapifyUp(newNode);
          return;
        } else {
          queue.push(currentNode.left);
          queue.push(currentNode.right);
        }
      }
    }
  }

  pop(): HeapElement<DataType> | null {
    if (!this.head) {
      return null;
    }

    const retVal = {
      value: this.head.value,
      data: this.head.data,
    };

    if (!this.head.left && !this.head.right) {
      this.head = null;
      return retVal;
    }

    // BFS for last node, move it to head, then heapify down
    const queue: (BinaryNode<number, DataType> | null)[] = [this.head];

    let lastNode = this.head;
    while (queue.length) {
      const currentNode = queue.shift();
      if (currentNode) {
        lastNode = currentNode;
        queue.push(currentNode.left);
        queue.push(currentNode.right);
      }
    }

    this.swapNodeData(this.head, lastNode);
    this.removeNode(lastNode);
    this.heapifyDown(this.head);
    return retVal;
  }

  private heapifyUp(currentNode: BinaryNode<number, DataType>): void {
    // We're at the root, do nothing
    if (!currentNode.parent) {
      return;
    }

    const parentNode = currentNode.parent;

    if (currentNode.value < parentNode.value) {
      this.swapNodeData(currentNode, parentNode);
      this.heapifyUp(parentNode);
    }
  }

  /* istanbul ignore next */
  private heapifyDown(currentNode: BinaryNode<number, DataType> | null): void {
    if (!currentNode) {
      return;
    }

    const leftChild = currentNode.left;
    const rightChild = currentNode.right;

    // Since we always fill in from left to right, we can just see
    // if we're at the end by checking if the leftChild index is out of bounds
    if (!leftChild) {
      return;
    }

    // Possibly swap with the smaller of the two children
    if (
      (!rightChild || leftChild.value < rightChild.value) &&
      currentNode.value > leftChild.value
    ) {
      this.swapNodeData(leftChild, currentNode);
      this.heapifyDown(leftChild);
    } else if (
      rightChild &&
      rightChild.value < leftChild.value &&
      currentNode.value > rightChild.value
    ) {
      this.swapNodeData(rightChild, currentNode);
      this.heapifyDown(rightChild);
    }
  }

  /* istanbul ignore next */
  private removeNode(node: BinaryNode<number, DataType>): void {
    if (!node.parent) {
      return;
    }

    const parentNode = node.parent;
    if (parentNode.left === node) {
      parentNode.left = null;
    } else if (parentNode.right === node) {
      parentNode.right = null;
    }
  }

  private swapNodeData(
    a: BinaryNode<number, DataType>,
    b: BinaryNode<number, DataType>,
  ): void {
    const tmpValue = a.value;
    const tmpData = a.data;
    a.value = b.value;
    a.data = b.data;
    b.value = tmpValue;
    b.data = tmpData;
  }
}
