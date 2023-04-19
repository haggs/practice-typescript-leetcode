import { MockFileLineIterator } from './MockFileLineIterator.js';
import { describe, it } from 'vitest';

describe.concurrent('MockFileLineIterator', async () => {
  it.concurrent('returns complete lines', async ({ expect }) => {
    const iterator = new MockFileLineIterator('123\n45\n6789\n');
    const data = [iterator.next(), iterator.next(), iterator.next()];

    expect(data).toEqual(['123', '45', '6789']);
  });

  it.concurrent(
    'does not require the file to end with a newline',
    async ({ expect }) => {
      const iterator = new MockFileLineIterator('123\n45\n6789');
      const data = [iterator.next(), iterator.next(), iterator.next()];

      expect(data).toEqual(['123', '45', '6789']);
    },
  );

  it.concurrent(
    'returns null when all the entries are exhausted',
    async ({ expect }) => {
      const iterator = new MockFileLineIterator('123\n');

      const lines = [iterator.next(), iterator.next()];

      expect(lines).toEqual(['123', null]);
    },
  );

  it.concurrent(
    'returns an empty string when next line is empty',
    async ({ expect }) => {
      const iterator = new MockFileLineIterator('123\n\n456');

      const lines = [iterator.next(), iterator.next(), iterator.next()];

      expect(lines).toEqual(['123', '', '456']);
    },
  );
});
