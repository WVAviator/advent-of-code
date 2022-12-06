import fs from 'fs';
import path from 'path';

const PUZZLE_INPUT = 'puzzle-input.txt';

const getRucksacks = () => {
  const rucksackData = fs.readFileSync(path.join(__dirname, PUZZLE_INPUT), {
    encoding: 'utf-8',
  });

  const rucksacks = rucksackData.split('\r\n');

  return rucksacks;
};

const getPriority = (item: string) => {
  const charCode = item.charCodeAt(0);
  if (charCode < 97) return charCode - 38;
  return charCode - 96;
};

const getCommonItem = (rucksack: string) => {
  const itemSet = new Set();
  for (let i = 0; i < rucksack.length; i++) {
    if (i < rucksack.length / 2) {
      itemSet.add(rucksack[i]);
    } else {
      if (itemSet.has(rucksack[i])) {
        return rucksack[i];
      }
    }
  }
  return '';
};

export const getCommonItemPrioritySum = () => {
  const rucksacks = getRucksacks();

  let prioritySum = 0;
  for (let rucksack of rucksacks) {
    const commonItem = getCommonItem(rucksack);
    const priority = getPriority(commonItem);
    prioritySum += priority;
  }

  return prioritySum;
};

const getBadgeItem = (rucksacks: string[]) => {
  let priorSet = new Set<string>(rucksacks[0]);
  for (let rucksack of rucksacks) {
    let currentSet = new Set<string>();
    for (let item of rucksack) {
      if (priorSet.has(item)) {
        currentSet.add(item);
      }
    }
    priorSet = currentSet;
  }
  return [...priorSet][0];
};

export const getBadgePrioritySum = () => {
  const rucksacks = getRucksacks();

  let prioritySum = 0;
  for (let i = 0; i < rucksacks.length; i += 3) {
    const group = rucksacks.slice(i, i + 3);
    const badge = getBadgeItem(group);
    const priority = getPriority(badge);
    prioritySum += priority;
  }
  return prioritySum;
};
