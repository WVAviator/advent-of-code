import fs from 'fs';
import path from 'path';

const PUZZLE_INPUT = './puzzle-input.txt';

const getSignalData = () => {
  const signalData = fs.readFileSync(path.join(__dirname, PUZZLE_INPUT), {
    encoding: 'utf-8',
  });

  return signalData;
};

const getFirstUniqueSubsequence = (str: string, sequenceLength: number = 4) => {
  const counts: Record<string, number> = {};

  for (let i = 0; i < str.length; i++) {
    if (i >= sequenceLength) {
      const c = str[i - sequenceLength];
      counts[c]--;
      if (counts[c] === 0) {
        delete counts[c];
      }
    }

    const c = str[i];

    if (c in counts) {
      counts[c]++;
    } else {
      counts[c] = 1;
    }

    if (Object.keys(counts).length === sequenceLength) {
      return i + 1;
    }
  }

  return -1;
};

export const findStartOfPacket = (
  test: string = '',
  sequenceLength: number = 4
) => {
  const signalData = test || getSignalData();
  return getFirstUniqueSubsequence(signalData, sequenceLength);
};

// console.log('Expect 7: ', findStartOfPacket('mjqjpqmgbljsphdztnvjfqwrcgsmlb'));
// console.log('Expect 5: ', findStartOfPacket('bvwbjplbgvbhsrlpgdmjqwftvncz'));
// console.log('Expect 6: ', findStartOfPacket('nppdvjthqldpwncqszvftbrmjlhg'));
// console.log(
//   'Expect 10: ',
//   findStartOfPacket('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')
// );
// console.log(
//   'Expect 11: ',
//   findStartOfPacket('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')
// );
// console.log('Using puzzle input part 1: ', findStartOfPacket());

// console.log(
//   'Expect 19: ',
//   findStartOfPacket('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)
// );
// console.log(
//   'Expect 23: ',
//   findStartOfPacket('bvwbjplbgvbhsrlpgdmjqwftvncz', 14)
// );
// console.log(
//   'Expect 23: ',
//   findStartOfPacket('nppdvjthqldpwncqszvftbrmjlhg', 14)
// );
// console.log(
//   'Expect 29: ',
//   findStartOfPacket('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14)
// );
// console.log(
//   'Expect 26: ',
//   findStartOfPacket('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14)
// );

// console.log('Using puzzle input part 2: ', findStartOfPacket('', 14));
