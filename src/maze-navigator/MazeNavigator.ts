export type Maze = readonly string[][];
export type Point = { x: number; y: number };

export class MazeNavigator {
  private pos: Point;
  private availableSteps: Point[] = [];
  private seen = new Set<string>(); // Contains strings like "1,2"

  constructor(private maze: Maze, private start: Point, private end: Point) {
    if (!this.isValidStep(this.start)) {
      throw new Error(`Invalid start value: ${JSON.stringify(this.start)}`);
    }
    if (!this.isValidStep(this.end)) {
      throw new Error(`Invalid end value: ${JSON.stringify(this.end)}`);
    }
    this.pos = { ...this.start };
    this.markSeen(this.start);
    this.addAvailableSteps();
  }

  private markSeen(point: Point): void {
    this.seen.add(this.stringifyPoint(point));
  }

  private stringifyPoint(point: Point): string {
    return `${point.x},${point.y}`;
  }

  private hasSeen(point: Point): boolean {
    return this.seen.has(this.stringifyPoint(point));
  }

  private addAvailableSteps(): void {
    const up: Point = { ...this.pos, y: this.pos.y - 1 };
    const right: Point = { ...this.pos, x: this.pos.x + 1 };
    const down: Point = { ...this.pos, y: this.pos.y + 1 };
    const left: Point = { ...this.pos, x: this.pos.x - 1 };

    const possibleSteps = [up, right, down, left];
    const validSteps = possibleSteps.filter(this.isValidStep.bind(this));
    this.availableSteps = [...this.availableSteps, ...validSteps];
  }

  private isValidStep(point: Point): boolean {
    return (
      point.y >= 0 &&
      point.y < this.maze.length &&
      point.x >= 0 &&
      point.x < this.maze[point.y].length &&
      !this.hasSeen(point) &&
      this.maze[point.y][point.x] === '0'
    );
  }

  private canStep(): boolean {
    return this.availableSteps.length > 0;
  }

  private hasExited(): boolean {
    return this.pos.x === this.end.x && this.pos.y === this.end.y;
  }

  step(): void {
    if (this.canStep()) {
      this.pos = this.availableSteps.pop();
      this.markSeen(this.pos);
      this.addAvailableSteps();
    }
  }

  getNumberOfStepsToExit(): number {
    while (this.canStep() && !this.hasExited()) {
      this.step();
    }
    return this.hasExited() ? this.seen.size : -1;
  }

  renderMaze(): string {
    let str = '\n';
    for (let y = 0; y < this.maze.length; ++y) {
      let row = '';
      for (let x = 0; x < this.maze[y].length; ++x) {
        if (y === this.pos.y && x === this.pos.x) {
          row += `$ `;
        } else if (this.hasSeen({ x, y })) {
          row += `* `;
        } else {
          row += `${this.maze[y][x]} `;
        }
      }
      str += row + '\n';
    }
    return str;
  }

  print(): void {
    console.log(this.renderMaze());
  }
}
