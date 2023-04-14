import { MockFileLineIterator } from './MockFileLineIterator.js';

describe('MockFileLineIterator', () => {
  it('returns complete lines', () => {
    const iterator = new MockFileLineIterator('123\n45\n6789\n');
    const data = [iterator.next(), iterator.next(), iterator.next()];

    expect(data).toEqual(['123', '45', '6789']);
  });

  it('does not require the file to end with a newline', () => {
    const iterator = new MockFileLineIterator('123\n45\n6789');
    const data = [iterator.next(), iterator.next(), iterator.next()];

    expect(data).toEqual(['123', '45', '6789']);
  });

  it('returns null when all the entries are exhausted', () => {
    const iterator = new MockFileLineIterator('123\n');

    const lines = [iterator.next(), iterator.next()];

    expect(lines).toEqual(['123', null]);
  });

  it('returns an empty string when next line is empty', () => {
    const iterator = new MockFileLineIterator('123\n\n456');

    const lines = [iterator.next(), iterator.next(), iterator.next()];

    expect(lines).toEqual(['123', '', '456']);
  });
});
