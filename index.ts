import {
  getRearrangedCrateStack,
  getRearrangedCrateStack9001,
} from './days/05/supply-stacks';
import {
  getMostCalories,
  getTopThreeCalories,
} from './days/01/calorie-counting';
import { getTotalRoundScore as getTotalRoundScorePt1 } from './days/02/rock-paper-scissors-pt1';
import { getTotalRoundScore as getTotalRoundScorePt2 } from './days/02/rock-paper-scissors-pt2';
import {
  getCommonItemPrioritySum,
  getBadgePrioritySum,
} from './days/03/rucksack-reorganization';
import {
  getFullyContainedCleanupPairCount,
  getAllOverlappingPairs,
} from './days/04/camp-cleanup';
import { findStartOfPacket } from './days/06/tuning-trouble';

// Day 1
// console.log('Most calories: ', getMostCalories());
// console.log('Top three most calories: ', getTopThreeCalories());

// Day 2
// console.log('Total round score pt 1: ', getTotalRoundScorePt1());
// console.log('Total round score pt 2: ', getTotalRoundScorePt2());

// Day 3
// console.log('Pt1 common item prioriy sum: ', getCommonItemPrioritySum());
// console.log('Pt2 get badge priority sum: ', getBadgePrioritySum());

// Day 4
// console.log(
//   'Number of pairs with fully overlapping ranges: ',
//   getFullyContainedCleanupPairCount()
// );
// console.log('Number of overlapping pairs: ', getAllOverlappingPairs());

// Day 5
// console.log('Rearranged crates stack: ', getRearrangedCrateStack());
// console.log('Rearranged crates stack: ', getRearrangedCrateStack9001());

// Day 6
console.log('First unique subsequence of 4: ', findStartOfPacket());
console.log('First unique subsequence of 14: ', findStartOfPacket('', 14));
