import fs from 'fs';
import path from 'path';

const PUZZLE_INPUT = 'puzzle-input.txt';

type Direction = 'R' | 'U' | 'L' | 'D';

interface HeadMove {
  dir: Direction;
  steps: number;
}

const getHeadMoves = () => {
  const headMovementData = fs.readFileSync(path.join(__dirname, PUZZLE_INPUT), {
    encoding: 'utf-8',
  });

  const headMoves: HeadMove[] = headMovementData.split('\r\n').map((line) => {
    const [dir, stepsStr] = line.split(' ');
    return { dir: dir as Direction, steps: Number(stepsStr) };
  });

  return headMoves;
};

interface Position {
  x: number;
  y: number;
}

class Head {
  private _currentPosition: Position = { x: 0, y: 0 };
  private _moveSet: HeadMove[];
  private _tail: Tail;

  constructor(moveSet: HeadMove[]) {
    this._tail = new Tail();
    this._moveSet = moveSet;
  }

  public move() {
    const moveFunctions = {
      R: () => (this._currentPosition.x += 1),
      L: () => (this._currentPosition.x -= 1),
      U: () => (this._currentPosition.y += 1),
      D: () => (this._currentPosition.y -= 1),
    };
    moveFunctions[this._moveSet[0].dir]();
    this._moveSet[0].steps -= 1;
    if (this._moveSet[0].steps === 0) {
      this._moveSet.shift();
    }
    this._tail.updatePosition(this._currentPosition);
  }

  public get movesLeft() {
    return this._moveSet.length;
  }

  public get tailPositions() {
    return this._tail.totalVisitedPositions;
  }

  public addTail() {
    this._tail.addTail(new Tail());
  }
}

class Tail {
  private _currentPosition: Position = { x: 0, y: 0 };
  private _visitedPositions: Set<string> = new Set(['0:0']);
  private _tail: Tail | null = null;

  public addTail(tail: Tail) {
    if (this._tail) {
      this._tail.addTail(tail);
    } else {
      this._tail = tail;
    }
  }

  public updatePosition(headPos: Position) {
    // console.log('headPos: ', headPos, 'tailPos: ', this._currentPosition);
    // if (!this._tail) console.log('I am the tail.');
    if (this.isCloseEnough(headPos)) {
      return;
    }

    if (this.sameRow(headPos)) {
      this._currentPosition.x += headPos.x > this._currentPosition.x ? 1 : -1;
    } else if (this.sameColumn(headPos)) {
      this._currentPosition.y += headPos.y > this._currentPosition.y ? 1 : -1;
    } else {
      this._currentPosition.x += headPos.x > this._currentPosition.x ? 1 : -1;
      this._currentPosition.y += headPos.y > this._currentPosition.y ? 1 : -1;
    }

    this._visitedPositions.add(
      `${this._currentPosition.x}:${this._currentPosition.y}`
    );

    if (this._tail) {
      this._tail.updatePosition(this._currentPosition);
    }
  }

  public get totalVisitedPositions(): number {
    if (this._tail) return this._tail.totalVisitedPositions;
    return [...this._visitedPositions].length;
  }

  private isCloseEnough(headPos: Position) {
    const xDiff = Math.abs(headPos.x - this._currentPosition.x);
    const yDiff = Math.abs(headPos.y - this._currentPosition.y);
    return xDiff <= 1 && yDiff <= 1;
  }

  private sameRow(headPos: Position) {
    return headPos.y === this._currentPosition.y;
  }

  private sameColumn(headPos: Position) {
    return headPos.x === this._currentPosition.x;
  }
}

export const getVisitedTailPositions = (tails: number = 1) => {
  const headMoves = getHeadMoves();
  const head = new Head(headMoves);

  let tailCount = 1;
  while (tailCount < tails) {
    head.addTail();
    tailCount++;
  }

  while (head.movesLeft) {
    head.move();
  }

  return head.tailPositions;
};
