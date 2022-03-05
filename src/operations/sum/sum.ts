import { prepareNumbers } from '../shared/prepareNumbers';
import { cleanOutput } from '../shared/cleanOutput';
import { Subtraction as Subtraction } from '../subtraction/subtraction';
import { SubtractPreparedStrings } from "../subtraction/SubtractPreparedStrings";
import { sumPreparedStrings } from './sumPreparedStrings';

export function Sum(...numbers: string[]): string {
  if (numbers.length === 0) return '0';

  const { digitsQuantity, paddedNumbers, biggestFloat, signs } = prepareNumbers(numbers);

  // split the numbers into positive and negative
  const [positiveNumbers, negativeNumbers] = paddedNumbers
    .reduce((acc, curr, index) => {
      const sign = signs[index];
      if (sign === 1) {
        acc[0].push(curr);
      } else {
        acc[1].push(curr);
      }

      return acc;
    }, [[], []]);

  const positiveSum = sumPreparedStrings(digitsQuantity, positiveNumbers);
  const negativeSum = sumPreparedStrings(digitsQuantity, negativeNumbers);

  // since either the positive or negative sum could be bigger than the other, we pad both again
  const newDigitQuantity = Math.max(positiveSum.length, negativeSum.length);
  const secondPadding = [positiveSum, negativeSum]
    .map(s => s.padStart(newDigitQuantity, '0'));

  let { subtraction: sum, finalSign } = SubtractPreparedStrings(newDigitQuantity, secondPadding);

  return cleanOutput(sum, biggestFloat, finalSign);
}
