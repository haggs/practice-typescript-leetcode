export class MinHeap {
  private data: number[];
  public length: number;

  constructor() {
    this.data = [];
    this.length = 0;
  }

  insert(value: number): void {
    this.data[this.length] = value;
    this.heapifyUp(this.length); // Bubble up this new value
    this.length++;
  }

  pop(): number | null {
    if (this.length === 0) {
      return null;
    }

    const value = this.data[0];
    this.length--;

    if (this.length === 0) {
      this.data = [];
      return value;
    }

    // Take bottom most value and move it up to the dop, then heapify down
    this.data[0] = this.data[this.length];

    this.heapifyDown(0);

    return value;
  }

  private heapifyUp(idx: number): void {
    if (idx === 0) {
      return;
    }

    const valueToHeapifyUp = this.data[idx];

    const parentIdx = this.parent(idx);
    const parentValue = this.data[parentIdx];

    if (valueToHeapifyUp < parentValue) {
      this.data[idx] = parentValue;
      this.data[parentIdx] = valueToHeapifyUp;
      this.heapifyUp(parentIdx);
    }
  }

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

    const valueToHeapifyDown = this.data[idx];
    const leftChildValue = this.data[leftChildIdx];
    const rightChildValue = this.data[rightChildIdx];

    // Possibly swap with the smaller of the two children
    if (
      leftChildValue < rightChildValue &&
      valueToHeapifyDown > leftChildValue
    ) {
      this.data[idx] = leftChildValue;
      this.data[leftChildIdx] = valueToHeapifyDown;
      this.heapifyDown(leftChildIdx);
    } else if (
      rightChildValue < leftChildValue &&
      valueToHeapifyDown > rightChildValue
    ) {
      this.data[idx] = rightChildValue;
      this.data[rightChildIdx] = valueToHeapifyDown;
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
