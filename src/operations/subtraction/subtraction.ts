import { prepareNumbers } from '../shared/prepareNumbers';
import { cleanOutput } from '../shared/cleanOutput';
import { SubtractPreparedStrings } from './SubtractPreparedStrings';

export function Subtraction(minuend: string, subtrahend: string): string {
  const {
    digitsQuantity,
    paddedNumbers,
    biggestFloat
  } = prepareNumbers([minuend, subtrahend]);

  let { subtraction, finalSign } = SubtractPreparedStrings(digitsQuantity, paddedNumbers);

  return cleanOutput(subtraction, biggestFloat, finalSign);
}
