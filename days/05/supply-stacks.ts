import fs from 'fs';
import path from 'path';

const PUZZLE_INPUT = './puzzle-input.txt';

type CrateStacks = Record<string, string[]>;
interface Instruction {
  count: number;
  from: string;
  to: string;
}

const getCratesData = () => {
  const crateInstructionData = fs.readFileSync(
    path.join(__dirname, PUZZLE_INPUT),
    {
      encoding: 'utf-8',
    }
  );

  const [crateData, instructionsData] = crateInstructionData.split('\r\n\r\n');

  const crateStacks = parseCrateStacks(crateData);
  const instructions = parseInstructions(instructionsData);

  return { crateStacks, instructions };
};

const parseCrateStacks = (rawCrateData: string) => {
  const crates = rawCrateData.split('\r\n');
  const crateNames = crates.pop();

  const crateStacks: CrateStacks = {};

  if (!crateNames) return crateStacks;

  for (let i = 1; i < crateNames.length; i += 4) {
    crateStacks[crateNames[i]] = [];
    for (let j = crates.length - 1; j >= 0; j--) {
      if (crates[j][i] === ' ') break;
      crateStacks[crateNames[i]].push(crates[j][i]);
    }
  }

  return crateStacks;
};

const parseInstructions = (rawInstructionsData: string): Instruction[] => {
  const instructions = rawInstructionsData.split('\r\n');
  return instructions.map((instruction) => {
    const [, count, , from, , to] = instruction.split(' ');
    return {
      count: +count,
      from,
      to,
    };
  });
};

const processInstruction = (
  crateStacks: CrateStacks,
  instruction: Instruction
) => {
  for (let i = 0; i < instruction.count; i++) {
    crateStacks[instruction.to].push(crateStacks[instruction.from].pop() || '');
  }
};

const extractStackTops = (crateStacks: CrateStacks): string => {
  let outputStr = '';
  for (let i = 1; i < Object.keys(crateStacks).length + 1; i++) {
    outputStr +=
      crateStacks[i.toString()][crateStacks[i.toString()].length - 1];
  }
  return outputStr;
};

export const getRearrangedCrateStack = () => {
  const { crateStacks, instructions } = getCratesData();
  for (let instruction of instructions) {
    processInstruction(crateStacks, instruction);
  }
  console.log(crateStacks);
  return extractStackTops(crateStacks);
};

const processInstruction9001 = (
  crateStacks: CrateStacks,
  instruction: Instruction
) => {
  const { count, from, to } = instruction;

  const cratesToMove = crateStacks[from].splice(
    crateStacks[from].length - count,
    count
  );
  crateStacks[to].push(...cratesToMove);
};

export const getRearrangedCrateStack9001 = () => {
  const { crateStacks, instructions } = getCratesData();
  for (let instruction of instructions) {
    processInstruction9001(crateStacks, instruction);
  }
  console.log(crateStacks);
  return extractStackTops(crateStacks);
};
