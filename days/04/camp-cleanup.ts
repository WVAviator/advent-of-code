import fs from 'fs';
import path from 'path';

const PUZZLE_INPUT = 'puzzle-input.txt';

interface SectionRange {
  start: number;
  end: number;
}

interface CleanupPair {
  firstElf: SectionRange;
  secondElf: SectionRange;
}

const getCleanupPairs = (): CleanupPair[] => {
  const pairData = fs.readFileSync(path.join(__dirname, PUZZLE_INPUT), {
    encoding: 'utf-8',
  });
  const pairs = pairData.split('\r\n').map((pair) => {
    const [first, second] = pair.split(',');
    const firstRange = first.split('-');
    const secondRange = second.split('-');
    const cleanupPair: CleanupPair = {
      firstElf: {
        start: +firstRange[0],
        end: +firstRange[1],
      },
      secondElf: {
        start: +secondRange[0],
        end: +secondRange[1],
      },
    };

    return cleanupPair;
  });
  return pairs;
};

const getOverlap = (
  range1: SectionRange,
  range2: SectionRange
): SectionRange | null => {
  const start = Math.max(range1.start, range2.start);
  const end = Math.min(range1.end, range2.end);
  if (end < start) return null;
  return {
    start,
    end,
  };
};

const isEqualRange = (range1: SectionRange, range2: SectionRange): boolean => {
  return range1.start === range2.start && range1.end === range2.end;
};

export const getFullyContainedCleanupPairCount = () => {
  const cleanupPairs = getCleanupPairs();

  let totalPairs = 0;
  for (let cleanupPair of cleanupPairs) {
    const overlap = getOverlap(cleanupPair.firstElf, cleanupPair.secondElf);
    if (
      overlap &&
      (isEqualRange(overlap, cleanupPair.firstElf) ||
        isEqualRange(overlap, cleanupPair.secondElf))
    ) {
      totalPairs++;
    }
  }
  return totalPairs;
};

export const getAllOverlappingPairs = () => {
  const cleanupPairs = getCleanupPairs();

  let totalPairs = 0;
  for (let cleanupPair of cleanupPairs) {
    const overlap = getOverlap(cleanupPair.firstElf, cleanupPair.secondElf);
    if (overlap) totalPairs++;
  }

  return totalPairs;
};
