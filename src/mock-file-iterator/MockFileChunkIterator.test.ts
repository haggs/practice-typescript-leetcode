import { MockFileChunkIterator } from './MockFileChunkIterator.js';
import { describe, it } from 'vitest';

describe.concurrent('MockFileChunkIterator', async () => {
  describe.concurrent('next', async () => {
    it.concurrent('returns chunks of the original file', async ({ expect }) => {
      const iterator = new MockFileChunkIterator('123456', 3);
      const chunks = [iterator.next(), iterator.next()];
      expect(chunks).toEqual(['123', '456']);
    });

    it.concurrent('defaults chunk size to 6 chars', async ({ expect }) => {
      const iterator = new MockFileChunkIterator('1234567');
      const chunk = iterator.next();
      expect(chunk?.length).toBe(6);
    });

    describe.concurrent('next', async () => {
      it.concurrent(
        'next returns strings with length less than or equal to provided chunk size',
        async ({ expect }) => {
          const iterator = new MockFileChunkIterator('123456', 2);
          const chunk = iterator.next();
          expect(chunk?.length).toBe(2);
        },
      );

      it.concurrent(
        'returns null when all the entries are exhausted',
        async ({ expect }) => {
          const iterator = new MockFileChunkIterator('123456', 6);
          const chunks = [iterator.next(), iterator.next()];
          expect(chunks).toEqual(['123456', null]);
        },
      );
    });
  });
});
