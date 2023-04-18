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

        if (!currentNode.left) {
          // here's our spot
          currentNode.left = newNode;
          newNode.parent = currentNode;
          this.heapifyUp(newNode);
        } else if (!currentNode.right) {
          // here's our spot
          currentNode.right = newNode;
          newNode.parent = currentNode;
          this.heapifyUp(newNode);
        } else {
          queue.push(currentNode.left);
          queue.push(currentNode.right);
        }
      }
    }
  }

  pop(): HeapElement<DataType> {
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

    // BFS for last node, swap it with head, then heapify down
    const queue = [this.head];

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
      leftChild.value < rightChild.value &&
      currentNode.value > leftChild.value
    ) {
      this.swapNodeData(leftChild, currentNode);
      this.heapifyDown(leftChild);
    } else if (
      rightChild.value < leftChild.value &&
      currentNode.value > rightChild.value
    ) {
      this.swapNodeData(rightChild, currentNode);
      this.heapifyDown(rightChild);
    }
  }
}
