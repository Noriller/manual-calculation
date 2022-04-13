import { prepareNumbers } from '../shared/prepareNumbers';
import { cleanOutput } from '../shared/cleanOutput';
import { subtractPreparedStrings } from './SubtractPreparedStrings';
import { sumPreparedStrings } from '../sum/sumPreparedStrings';

export function Subtraction(minuend: string, subtrahend: string): string {
  const { digitsQuantity, paddedNumbers, biggestFloat, signs } = prepareNumbers(
    [minuend, subtrahend],
  );

  let subtraction, finalSign;

  // if both are positive, use the subtraction result
  if (signs[0] === 1 && signs[1] === 1) {
    const result = subtractPreparedStrings(digitsQuantity, paddedNumbers);
    subtraction = result.subtraction;
    finalSign = result.finalSign;
    // if only the first is negative, sum both and the result is negative
    // ex: -1 -1 = -2
  } else if (signs[0] === -1 && signs[1] === 1) {
    subtraction = sumPreparedStrings(digitsQuantity, paddedNumbers);
    finalSign = '-';
    // if only the second is negative, sum both and the result is positive
    // ex: 1 --1 = 1 + 1 = 2 (-- is the same as +)
  } else if (signs[0] === 1 && signs[1] === -1) {
    subtraction = sumPreparedStrings(digitsQuantity, paddedNumbers);
    finalSign = '+';
    // if both are negative, subtract them and flip the sign of the subtraction result
    // ex: -2 --1 = -2 + 1 = -1 where 2 - 1 would give the positive sign, so we flip it
    // ex: -1 --2 = -1 + 2 = 1 where 1 - 2 would give the negative sign, so we flip it
  } else if (signs[0] === -1 && signs[1] === -1) {
    const result = subtractPreparedStrings(digitsQuantity, paddedNumbers);
    subtraction = result.subtraction;
    finalSign = result.finalSign === '-' ? '+' : '-';
  }

  return cleanOutput(subtraction, biggestFloat, finalSign);
}
