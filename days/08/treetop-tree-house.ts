import fs from 'fs';
import path from 'path';

const PUZZLE_INPUT = 'test.txt';

const getTrees = () => {
  const treeData = fs.readFileSync(path.join(__dirname, PUZZLE_INPUT), {
    encoding: 'utf-8',
  });

  const treeRows = treeData.split('\n');
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
    let tallestLeft = 0;
    let tallestRight = 0;

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
    let tallestTop = 0;
    let tallestBottom = 0;

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

    console.log(trees);
    console.log(boolMap);

    return boolMap.reduce((acc, currentRow) => {
      return acc + currentRow.reduce((acc2, cur) => acc2 + (cur ? 1 : 0), 0);
    }, 0);
  }
};
