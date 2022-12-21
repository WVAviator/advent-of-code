import fs from 'fs';
import path from 'path';

const PUZZLE_INPUT = 'puzzle-input.txt';

interface CPUCommand {
  execute: (xRegister: number, argument?: number) => number;
  instruction: string;
  cycles: number;
}

const CPU_COMMANDS: Record<string, () => CPUCommand> = {
  addx: () => ({
    execute: (xRegister, argument) => xRegister + (argument || 0),
    cycles: 2,
    instruction: 'addx',
  }),
  noop: () => ({
    execute: (xRegister) => xRegister,
    cycles: 1,
    instruction: 'noop',
  }),
};

interface Instruction {
  command: CPUCommand;
  argument: number;
}

const getCPUInstructions = () => {
  const instructionData = fs.readFileSync(path.join(__dirname, PUZZLE_INPUT), {
    encoding: 'utf-8',
  });

  const instructions = instructionData.split('\r\n').map((line) => {
    const [rawInstruction, rawArgument] = line.split(' ');
    return {
      command: CPU_COMMANDS[rawInstruction](),
      argument: Number(rawArgument),
    } as Instruction;
  });

  return instructions;
};

class CPU {
  private _instructions: Instruction[];
  private _currentInstruction = 0;
  private _registerX = 1;
  private _programCycle = 1;

  constructor(instructions: Instruction[]) {
    this._instructions = instructions;
  }

  public execute(callback: (registerX: number, programCycle: number) => void) {
    while (this._currentInstruction < this._instructions.length) {
      //   console.log(
      //     `Start of the ${this._programCycle}th cycle: X is ${this._registerX}`
      //   );
      const { command, argument } =
        this._instructions[this._currentInstruction];
      //   console.log(
      //     `Command ${command.instruction} executes with ${
      //       command.cycles - 1
      //     } remaining.`
      //   );
      if (command.cycles > 1) {
        command.cycles--;
      } else {
        this._currentInstruction++;
        this._registerX = command.execute(this._registerX, argument);
      }
      this._programCycle++;
      callback(this._registerX, this._programCycle);
      //   console.log(
      //     `After the ${this._programCycle}th cycle: X is ${this._registerX}`
      //   );
    }
  }
}

export const getSignalStrengthSum = () => {
  const program = getCPUInstructions();
  const cpu = new CPU(program);

  const significantCycles = [20, 60, 100, 140, 180, 220];
  let signalStrengthSum = 0;

  cpu.execute((registerX, cycle) => {
    if (significantCycles.includes(cycle)) {
      signalStrengthSum += cycle * registerX;
      console.log(`Strength is ${cycle} * ${registerX} = ${cycle * registerX}`);
    }
  });

  return signalStrengthSum;
};

export const renderCRT = () => {
  const program = getCPUInstructions();
  const cpu = new CPU(program);

  const screen: string[] = [];

  cpu.execute((registerX, cycle) => {
    if (Math.abs(registerX - ((cycle - 1) % 40)) <= 1) {
      screen.push('#');
    } else {
      screen.push('.');
    }
    if (cycle % 40 === 0) screen.push('\n');
  });

  return screen.join('');
};
