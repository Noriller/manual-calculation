import { getFloatPosition } from '../shared/getFloatPosition';
import { Sum } from '../sum/sum';

export function Multiplication(
  multiplicand: string, multiplier: string
): string {
  const toSum = [];

  const floatPosition = getMultiplicationFloat(multiplicand, multiplier);

  const multiplicandNormalized = multiplicand.replace(/\D/g, '');
  const multiplierNormalized = multiplier.replace(/\D/g, '');

  // for multiplication, the order is not important
  for (let i = 0; i < multiplierNormalized.length; i++) {
    // each multiplicand is multiplied right to left and then added the carry
    const { current, carry } = multiplicandNormalized.split('')
      .reduceRight((acc, curr) => {
        const currentDigit = (
          (Number(curr) * Number(multiplierNormalized[i])) + acc.carry
        ).toString().split('');

        acc.current = currentDigit.pop().concat(acc.current);
        acc.carry = Number(currentDigit.join(''));

        return acc;
      }, {
        current: '',
        carry: 0
      });

    // depending on the position of the multiplier, zero's are padded in the end
    const rightToLeftIndex = multiplierNormalized.length - 1 - i;
    const carryLeft = carry === 0 ? '' : carry.toString();
    const paddedValue = carryLeft.concat(
      current.concat('0'.repeat(rightToLeftIndex))
    );
    // the result is pushed to the array to be summed
    toSum.push(paddedValue);
  }

  const sumValues = Sum(...toSum);

  // if there's no float, just return the sum
  if (floatPosition === -1) {
    return sumValues;
  }

  const finalLength = getFinalStringLength(sumValues, floatPosition);

  // pad the string with zeros to the final length
  const paddedSum = sumValues.padStart(finalLength, '0');
  // find the index of the float divisor
  const finalFloatPosition = finalLength - floatPosition;

  // split the string at the float divisor
  // add the float divisor
  // clean the zeroe's from the end
  // concat the string and return it
  return paddedSum
    .substring(0, finalFloatPosition)
    .concat('.')
    .concat(paddedSum.substring(finalFloatPosition))
    .replace(/\.?0+$/, '');
}

/**
 * Depending on the length of the multiplication result,
 * and the float position, returns the final length of the number string.
 * @example result "1" for a float 2 (0.01) returns final length 3
 */
function getFinalStringLength(finalValue: string, floatPosition: number) {
  if (finalValue.length <= floatPosition) {
    return floatPosition + 1;
  }

  return finalValue.length;
}

/**
 * Returns the position of the float in the multiplication result.
 */
function getMultiplicationFloat(multiplicand: string, multiplier: string) {
  const multiplicandFloat = getFloatPosition(multiplicand);
  const multiplierFloat = getFloatPosition(multiplier);

  if (multiplicandFloat === -1 && multiplierFloat === -1) {
    return -1;
  }

  if (multiplicandFloat === -1) {
    return multiplierFloat;
  }

  if (multiplierFloat === -1) {
    return multiplicandFloat;
  }

  return multiplicandFloat + multiplierFloat;
}
