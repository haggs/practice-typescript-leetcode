import { MockFileChunkIterator } from './MockFileChunkIterator.js';

/**
 * A mock for an iterator that iterates over a file line by line.
 */
export class MockFileLineIterator {
  private fileChunkIterator: MockFileChunkIterator;
  private currentString: string | null;
  private currentPointer: number;

  constructor(fileContents: string) {
    this.fileChunkIterator = new MockFileChunkIterator(fileContents, 6);
    this.currentString = null;
    this.currentPointer = 0;
  }

  next() {
    let currentLine = '';
    let hasFoundCompleteLine = false;

    while (!hasFoundCompleteLine) {
      if (!this.currentString) {
        this.currentString = this.fileChunkIterator.next();
        if (!this.currentString) {
          return currentLine || null;
        }
      }

      if (this.currentPointer >= this.currentString.length) {
        this.currentString = null;
        this.currentPointer = 0;
        continue;
      }

      const currentChar = this.currentString[this.currentPointer];

      if (currentChar === '\n') {
        hasFoundCompleteLine = true;
      } else {
        currentLine += currentChar;
      }

      this.currentPointer++;
    }

    return currentLine;
  }
}
