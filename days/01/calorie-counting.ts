import fs from 'fs';
import path from 'path';
import { MaxHeap } from '../../util/heap/heap';

const PUZZLE_INPUT = './puzzle-input.txt';

const getElvesData = () => {
  const puzzleInput = fs.readFileSync(path.join(__dirname, PUZZLE_INPUT), {
    encoding: 'utf-8',
  });

  const elves = puzzleInput.split('\r\n\r\n');
  return elves;
};

const getCalorieHeap = () => {
  const elves = getElvesData();
  const totals = new MaxHeap();

  for (let elf of elves) {
    const calories = elf.split('\r\n');
    let total = 0;
    for (let calorie of calories) {
      total += +calorie;
    }
    totals.push(total);
  }

  return totals;
};

export const getMostCalories = () => {
  const elves = getElvesData();
  const totals = getCalorieHeap();
  return totals.top;
};

export const getTopThreeCalories = () => {
  const elves = getElvesData();
  const totals = getCalorieHeap();
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    sum += totals.pop() || 0;
  }
  return sum;
};
