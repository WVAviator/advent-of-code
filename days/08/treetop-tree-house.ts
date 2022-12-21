import fs from 'fs';
import path from 'path';

const PUZZLE_INPUT = 'puzzle-input.txt';

const getTrees = () => {
  const treeData = fs.readFileSync(path.join(__dirname, PUZZLE_INPUT), {
    encoding: 'utf-8',
  });

  const treeRows = treeData.split('\r\n');
  const treeMap = treeRows.map((treeRow) => {
    const strArray = Array.from(treeRow);
    const numArray = strArray.map((str) => +str);
    return numArray;
  });

  return treeMap;
};

export const countVisibleTrees = () => {
  const trees = getTrees();
  const boolMap = Array(trees.length)
    .fill([])
    .map((nested) => Array(trees[0].length).fill(false));

  trees.forEach((row, i) => {
    let tallestLeft = -1;
    let tallestRight = -1;

    for (let j = 0; j < row.length; j++) {
      const leftTree = trees[i][j];
      const rightTree = trees[i][row.length - j - 1];
      if (leftTree > tallestLeft) {
        tallestLeft = leftTree;
        boolMap[i][j] = true;
      }
      if (rightTree > tallestRight) {
        tallestRight = rightTree;
        boolMap[i][row.length - j - 1] = true;
      }
    }
  });

  for (let j = 0; j < trees[0].length; j++) {
    let tallestTop = -1;
    let tallestBottom = -1;

    for (let i = 0; i < trees.length; i++) {
      const topTree = trees[i][j];
      const bottomTree = trees[trees.length - i - 1][j];
      if (topTree > tallestTop) {
        tallestTop = topTree;
        boolMap[i][j] = true;
      }
      if (bottomTree > tallestBottom) {
        tallestBottom = bottomTree;
        boolMap[trees.length - i - 1][j] = true;
      }
    }
  }

  return boolMap.reduce((acc, currentRow) => {
    return acc + currentRow.reduce((acc2, cur) => acc2 + (cur ? 1 : 0), 0);
  }, 0);
};

export const getHighestScenicScore = () => {
  const trees = getTrees();
  const scenicFactors = Array(trees.length)
    .fill(1)
    .map((nested) => Array(trees[0].length).fill(1));

  for (let i = 0; i < trees.length; i++) {
    let treeStack: number[][] = [];
    for (let j = 0; j < trees[0].length; j++) {
      const tree = trees[i][j];
      while (treeStack.length && treeStack[treeStack.length - 1][0] <= tree) {
        const [smallerTree, treeIndex] = treeStack.pop() || [0, 0];
        scenicFactors[i][treeIndex] *= j - treeIndex;
      }
      treeStack.push([tree, j]);
    }
    while (treeStack.length) {
      const [edgeTree, treeIndex] = treeStack.pop() || [0, 0];
      scenicFactors[i][treeIndex] *= scenicFactors[i].length - 1 - treeIndex;
    }

    for (let j = trees[0].length - 1; j >= 0; j--) {
      const tree = trees[i][j];
      while (treeStack.length && treeStack[treeStack.length - 1][0] <= tree) {
        const [smallerTree, treeIndex] = treeStack.pop() || [0, 0];
        scenicFactors[i][treeIndex] *= treeIndex - j;
      }
      treeStack.push([tree, j]);
    }
    while (treeStack.length) {
      const [edgeTree, treeIndex] = treeStack.pop() || [0, 0];
      scenicFactors[i][treeIndex] *= treeIndex;
    }
  }

  for (let j = 0; j < trees[0].length; j++) {
    let treeStack: number[][] = [];

    for (let i = 0; i < trees.length; i++) {
      const tree = trees[i][j];
      while (treeStack.length && treeStack[treeStack.length - 1][0] <= tree) {
        const [smallerTree, treeIndex] = treeStack.pop() || [0, 0];
        scenicFactors[treeIndex][j] *= i - treeIndex;
      }
      treeStack.push([tree, i]);
    }
    while (treeStack.length) {
      const [edgeTree, treeIndex] = treeStack.pop() || [0, 0];
      scenicFactors[treeIndex][j] *= scenicFactors.length - 1 - treeIndex;
    }

    for (let i = trees.length - 1; i >= 0; i--) {
      const tree = trees[i][j];
      while (treeStack.length && treeStack[treeStack.length - 1][0] <= tree) {
        const [smallerTree, treeIndex] = treeStack.pop() || [0, 0];
        scenicFactors[treeIndex][j] *= treeIndex - i;
      }
      treeStack.push([tree, i]);
    }
    while (treeStack.length) {
      const [edgeTree, treeIndex] = treeStack.pop() || [0, 0];
      scenicFactors[treeIndex][j] *= treeIndex;
    }
  }

  let highestScenicFactor = 0;

  for (let i = 0; i < scenicFactors.length; i++) {
    for (let j = 0; j < scenicFactors.length; j++) {
      highestScenicFactor = Math.max(highestScenicFactor, scenicFactors[i][j]);
    }
  }

  return highestScenicFactor;
};
