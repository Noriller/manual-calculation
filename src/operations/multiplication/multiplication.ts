import { getFloatPosition } from '../shared/getFloatPosition';
import { Sum } from '../sum/sum';
import { addFloatToString } from '../shared/addFloatToString';

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

  return addFloatToString(sumValues, floatPosition);
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
