import { MockFileChunkIterator } from './MockFileChunkIterator.js';

describe('MockFileChunkIterator', () => {
  describe('next', () => {
    it('returns chunks of the original file', () => {
      const iterator = new MockFileChunkIterator('123456', 3);
      const chunks = [iterator.next(), iterator.next()];
      expect(chunks).toEqual(['123', '456']);
    });

    it('nextreturns strings with length less than or equal to provided chunk size', () => {
      const iterator = new MockFileChunkIterator('123456', 2);
      const chunk = iterator.next();
      expect(chunk.length).toBe(2);
    });

    it('returns null when all the entries are exhausted', () => {
      const iterator = new MockFileChunkIterator('123456', 6);
      const chunks = [iterator.next(), iterator.next()];
      expect(chunks).toEqual(['123456', null]);
    });
  });
});
