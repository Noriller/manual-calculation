import { getFloatPosition } from '../shared/getFloatPosition';
import { Sum } from '../sum/sum';

export function Multiplication(a: string, b: string): string {
  const toSum = [];

  const floatPosition = getMultiplicationFloat(a, b);

  const aNormalized = a.replace(/\D/g, '');
  const bNormalized = b.replace(/\D/g, '');

  for (let i = 0; i < bNormalized.length; i++) {
    const { current, carry } = aNormalized.split('')
      .reduceRight((acc, curr) => {
        const currentDigit = (
          (Number(curr) * Number(bNormalized[i])) + acc.carry
        ).toString().split('');

        acc.current = currentDigit.pop().concat(acc.current);
        acc.carry = Number(currentDigit.join(''));

        return acc;
      }, {
        current: '',
        carry: 0
      });

    const rightToLeftIndex = bNormalized.length - 1 - i;
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

function getMultiplicationFloat(a: string, b: string) {
  const aFloat = getFloatPosition(a);
  const bFloat = getFloatPosition(b);

  if (aFloat === -1 && bFloat === -1) {
    return -1;
  }

  if (aFloat === -1) {
    return bFloat;
  }

  if (bFloat === -1) {
    return aFloat;
  }

  return aFloat + bFloat;
}
