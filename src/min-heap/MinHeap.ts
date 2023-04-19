import { HeapElement } from './HeapElement.js';

export class MinHeap<DataType = undefined> {
  private data: HeapElement<DataType>[];
  public length: number;

  constructor() {
    this.data = [];
    this.length = 0;
  }

  insert(value: number, data?: DataType): void {
    this.data[this.length] = { value, data };
    this.heapifyUp(this.length); // Bubble up this new value
    this.length++;
  }

  pop(): HeapElement<DataType> {
    if (this.length === 0) {
      return null;
    }

    const minElement = this.data[0];
    this.length--;

    if (this.length === 0) {
      this.data = [];
      return minElement;
    }

    // Take bottom most value and move it up to the top, then heapify down
    this.data[0] = this.data[this.length];

    this.heapifyDown(0);

    return minElement;
  }

  private heapifyUp(idx: number): void {
    if (idx === 0) {
      return;
    }

    const elementToHeapifyUp = this.data[idx];

    const parentIdx = this.parent(idx);
    const parentElement = this.data[parentIdx];

    if (elementToHeapifyUp.value < parentElement.value) {
      this.data[idx] = parentElement;
      this.data[parentIdx] = elementToHeapifyUp;
      this.heapifyUp(parentIdx);
    }
  }

  /* istanbul ignore next */
  private heapifyDown(idx: number): void {
    if (idx >= this.length) {
      return;
    }

    const leftChildIdx = this.leftChild(idx);
    const rightChildIdx = this.rightChild(idx);

    // Since we always fill in from left to right, we can just see
    // if we're at the end by checking if the leftChild index is out of bounds
    if (leftChildIdx >= this.length) {
      return;
    }

    const elementToHeapifyDown = this.data[idx];
    const leftChildElement = this.data[leftChildIdx];
    const rightChildElement = this.data[rightChildIdx];

    // Possibly swap with the smaller of the two children
    if (
      leftChildElement.value < rightChildElement.value &&
      elementToHeapifyDown.value > leftChildElement.value
    ) {
      this.data[idx] = leftChildElement;
      this.data[leftChildIdx] = elementToHeapifyDown;
      this.heapifyDown(leftChildIdx);
    } else if (
      rightChildElement.value < leftChildElement.value &&
      elementToHeapifyDown.value > rightChildElement.value
    ) {
      this.data[idx] = rightChildElement;
      this.data[rightChildIdx] = elementToHeapifyDown;
      this.heapifyDown(rightChildIdx);
    }
  }

  private parent(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }

  private leftChild(idx: number): number {
    return 2 * idx + 1;
  }

  private rightChild(idx: number): number {
    return 2 * idx + 2;
  }
}
