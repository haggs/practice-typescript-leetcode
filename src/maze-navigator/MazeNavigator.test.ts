import { MazeNavigator } from './MazeNavigator.js';
import { describe, it } from 'vitest';

const MAZE = [
  ['1', '1', '1', '1', '1', '1', '1', '1', '1'],
  ['0', '0', '0', '0', '0', '0', '0', '0', '1'],
  ['1', '0', '1', '0', '1', '0', '1', '0', '1'],
  ['1', '0', '1', '0', '1', '0', '1', '0', '1'],
  ['1', '0', '1', '0', '1', '0', '1', '0', '1'],
  ['1', '0', '1', '0', '1', '0', '1', '0', '1'],
  ['1', '0', '1', '0', '1', '0', '1', '0', '1'],
  ['1', '0', '1', '0', '1', '0', '1', '0', '1'],
  ['1', '1', '1', '1', '1', '1', '1', '0', '1'],
];

const START = { x: 0, y: 1 };
const END = { x: 7, y: 8 };

describe.concurrent('MazeNavigator', () => {
  it.concurrent('renders maze correctly', async ({ expect }) => {
    const navigator = new MazeNavigator(MAZE, START, END);

    navigator.step();
    navigator.step();
    navigator.step();

    const expected = `
1 1 1 1 1 1 1 1 1 
* * 0 0 0 0 0 0 1 
1 * 1 0 1 0 1 0 1 
1 $ 1 0 1 0 1 0 1 
1 0 1 0 1 0 1 0 1 
1 0 1 0 1 0 1 0 1 
1 0 1 0 1 0 1 0 1 
1 0 1 0 1 0 1 0 1 
1 1 1 1 1 1 1 0 1 
`;

    expect(navigator.renderMaze()).toEqual(expected);
  });

  describe.concurrent('getNumberOfStepsToExit', async () => {
    it.concurrent('returns true for example maze', async ({ expect }) => {
      const navigator = new MazeNavigator(MAZE, START, END);
      expect(navigator.getNumberOfStepsToExit()).toBe(33);
    });

    it.concurrent('returns -1 when there is no path', async ({ expect }) => {
      const maze = [
        ['1', '1', '1', '1', '1', '1', '1', '1', '1'],
        ['0', '1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '1', '0', '1', '0', '1', '0', '1'],
        ['1', '0', '1', '0', '1', '0', '1', '0', '1'],
        ['1', '0', '1', '0', '1', '0', '1', '0', '1'],
        ['1', '0', '1', '0', '1', '0', '1', '0', '1'],
        ['1', '0', '1', '0', '1', '0', '1', '0', '1'],
        ['1', '0', '1', '0', '1', '0', '1', '0', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '0', '1'],
      ];
      const navigator = new MazeNavigator(maze, START, END);
      expect(navigator.getNumberOfStepsToExit()).toBe(-1);
    });
  });

  describe.concurrent('error handling', async () => {
    it.concurrent(
      'throws when start coordinates are out of bounds',
      async ({ expect }) => {
        const badStart = { x: -1, y: 0 };
        const instantiate = () => new MazeNavigator(MAZE, badStart, END);
        expect(instantiate).toThrow('Invalid start value: {"x":-1,"y":0}');
      },
    );

    it.concurrent(
      'throws when start coordinates are a wall',
      async ({ expect }) => {
        const badStart = { x: 0, y: 0 };
        const instantiate = () => new MazeNavigator(MAZE, badStart, END);
        expect(instantiate).toThrow('Invalid start value: {"x":0,"y":0}');
      },
    );

    it.concurrent(
      'throws when end coordinates are out of bounds',
      async ({ expect }) => {
        const badEnd = { x: -1, y: 0 };
        const instantiate = () => new MazeNavigator(MAZE, START, badEnd);
        expect(instantiate).toThrow('Invalid end value: {"x":-1,"y":0}');
      },
    );

    it.concurrent(
      'throws when end coordinates are a wall',
      async ({ expect }) => {
        const badEnd = { x: 0, y: 0 };
        const instantiate = () => new MazeNavigator(MAZE, START, badEnd);
        expect(instantiate).toThrow('Invalid end value: {"x":0,"y":0}');
      },
    );
  });
});
