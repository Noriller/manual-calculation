import { getFloatPosition } from '../shared/getFloatPosition';
import { Sum } from '../sum/sum';

export function Multiplication(
  multiplicand: string, multiplier: string
): string {
  const toSum = [];

  const floatPosition = getMultiplicationFloat(multiplicand, multiplier);

  const multiplicandNormalized = multiplicand.replace(/\D/g, '');
  const multiplierNormalized = multiplier.replace(/\D/g, '');

  for (let i = 0; i < multiplierNormalized.length; i++) {
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

    const rightToLeftIndex = multiplierNormalized.length - 1 - i;
    const carryLeft = carry === 0 ? '' : carry.toString();
    const paddedValue = carryLeft.concat(
      current.concat('0'.repeat(rightToLeftIndex))
    );
    toSum.push(paddedValue);
  }

  const sumValues = Sum(...toSum);

  if (floatPosition === -1) {
    return sumValues;
  }

  const finalLength = getFinalStringLength(sumValues, floatPosition);

  const paddedSum = sumValues
    .padStart(finalLength, '0');
  const finalFloatPosition = finalLength - floatPosition;

  return paddedSum
    .substring(0, finalFloatPosition)
    .concat('.')
    .concat(paddedSum.substring(finalFloatPosition))
    .replace(/0+$/, '')
    .replace(/\.$/, '');
}


function getFinalStringLength(finalValue: string, floatPosition: number) {
  if (finalValue.length <= floatPosition) {
    return floatPosition + 1;
  }

  return finalValue.length;
}

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
