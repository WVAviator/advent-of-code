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

type EncryptedShape = 'X' | 'Y' | 'Z' | 'A' | 'B' | 'C';
type DecryptedShape = 'rock' | 'paper' | 'scissors';

const SCORING_RULES: Record<DecryptedShape, Record<DecryptedShape, number>> = {
  rock: {
    rock: 4,
    paper: 1,
    scissors: 7,
  },
  paper: {
    rock: 8,
    paper: 5,
    scissors: 2,
  },
  scissors: {
    rock: 3,
    paper: 9,
    scissors: 6,
  },
};

const decryptShape = (shape: EncryptedShape): DecryptedShape => {
  return {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
    X: 'rock',
    Y: 'paper',
    Z: 'scissors',
  }[shape] as DecryptedShape;
};

const getPlayerScore = (
  playerShape: DecryptedShape,
  opponentShape: DecryptedShape
) => {
  return SCORING_RULES[playerShape][opponentShape];
};

const getRoundScore = (round: string) => {
  const [encryptedOpponent, encryptedPlayer] = round.split(
    ' '
  ) as EncryptedShape[];

  const opponent = decryptShape(encryptedOpponent);
  const player = decryptShape(encryptedPlayer);

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
