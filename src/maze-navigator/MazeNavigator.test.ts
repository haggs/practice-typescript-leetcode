import { MazeNavigator } from './MazeNavigator.js';

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

describe('MazeNavigator', () => {
  it('renderMazes renders correctly', () => {
    const navigator = new MazeNavigator(MAZE, START, END);

    const expected = `
1 1 1 1 1 1 1 1 1 
$ 0 0 0 0 0 0 0 1 
1 0 1 0 1 0 1 0 1 
1 0 1 0 1 0 1 0 1 
1 0 1 0 1 0 1 0 1 
1 0 1 0 1 0 1 0 1 
1 0 1 0 1 0 1 0 1 
1 0 1 0 1 0 1 0 1 
1 1 1 1 1 1 1 0 1 
`;
    expect(navigator.renderMaze()).toEqual(expected);
  });

  describe('getNumberOfStepsToExit', () => {
    it('returns true for example maze', () => {
      const navigator = new MazeNavigator(MAZE, START, END);
      expect(navigator.getNumberOfStepsToExit()).toBe(33);
    });

    it('returns -1 when there is no path', () => {
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

  describe('error handling', () => {
    it('throws when start coordinates are out of bounds', () => {
      const badStart = { x: -1, y: 0 };
      const instantiate = () => new MazeNavigator(MAZE, badStart, END);
      expect(instantiate).toThrow('Invalid start value: {"x":-1,"y":0}');
    });

    it('throws when start coordinates are a wall', () => {
      const badStart = { x: 0, y: 0 };
      const instantiate = () => new MazeNavigator(MAZE, badStart, END);
      expect(instantiate).toThrow('Invalid start value: {"x":0,"y":0}');
    });

    it('throws when end coordinates are out of bounds', () => {
      const badEnd = { x: -1, y: 0 };
      const instantiate = () => new MazeNavigator(MAZE, START, badEnd);
      expect(instantiate).toThrow('Invalid end value: {"x":-1,"y":0}');
    });

    it('throws when end coordinates are a wall', () => {
      const badEnd = { x: 0, y: 0 };
      const instantiate = () => new MazeNavigator(MAZE, START, badEnd);
      expect(instantiate).toThrow('Invalid end value: {"x":0,"y":0}');
    });
  });
});
