import fs from 'fs';
import path from 'path';

const PUZZLE_INPUT = './puzzle-input.txt';

const getRoundStrategies = () => {
  const strategyData = fs.readFileSync(path.join(__dirname, PUZZLE_INPUT), {
    encoding: 'utf-8',
  });

  const roundStrategies = strategyData.split('\r\n');

  return roundStrategies;
};

type EncryptedShape = 'A' | 'B' | 'C';
type DecryptedShape = 'rock' | 'paper' | 'scissors';
type EncryptedOutcome = 'X' | 'Y' | 'Z';
type DecryptedOutcome = 'win' | 'lose' | 'draw';

const SCORING_RULES: Record<
  DecryptedOutcome,
  Record<DecryptedShape, number>
> = {
  win: {
    scissors: 7,
    rock: 8,
    paper: 9,
  },
  lose: {
    paper: 1,
    scissors: 2,
    rock: 3,
  },
  draw: {
    rock: 4,
    paper: 5,
    scissors: 6,
  },
};

const decryptShape = (shape: EncryptedShape): DecryptedShape => {
  return {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
  }[shape] as DecryptedShape;
};

const decryptOutcome = (shape: EncryptedOutcome): DecryptedOutcome => {
  return {
    X: 'lose',
    Y: 'draw',
    Z: 'win',
  }[shape] as DecryptedOutcome;
};

const getPlayerScore = (
  playerOutcome: DecryptedOutcome,
  opponentShape: DecryptedShape
) => {
  return SCORING_RULES[playerOutcome][opponentShape];
};

const getRoundScore = (round: string) => {
  const [encryptedOpponent, encryptedPlayer] = round.split(' ') as [
    EncryptedShape,
    EncryptedOutcome
  ];

  const opponent = decryptShape(encryptedOpponent);
  const player = decryptOutcome(encryptedPlayer);

  return getPlayerScore(player, opponent);
};

export const getTotalRoundScore = () => {
  const roundStrategies = getRoundStrategies();
  let totalScore = 0;
  for (let round of roundStrategies) {
    totalScore += getRoundScore(round);
  }
  return totalScore;
};
