const DEFAULT_CHUNK_SIZE_CHARS = 6;

/**
 * A mock for an iterator that iterates over a file in chunks of a specific size.
 * Chunk size is defined as number of characters to return in each call of next().
 */
export class MockFileChunkIterator {
  private index: number;
  private data: (string | null)[];

  constructor(fileContents: string, chunkSizeChars = DEFAULT_CHUNK_SIZE_CHARS) {
    this.data = [];
    for (let i = 0; i < fileContents.length; i += chunkSizeChars) {
      this.data.push(fileContents.slice(i, i + chunkSizeChars));
    }
    this.index = 0;
  }

  next(): string | null {
    if (this.index === this.data.length) {
      return null;
    }
    return this.data[this.index++];
  }
}
