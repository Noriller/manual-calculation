import { getFloatPosition } from '../shared/getFloatPosition';

export function Sum(...numbers: string[]): string {
  if (numbers.length === 0) return '0';

  const biggestFloat = Math.max(...numbers.map(n => getFloatPosition(n)));

  const normalizedFloats = numbers.map(n => {
    const currentFloat = getFloatPosition(n);
    if (currentFloat === biggestFloat) {
      return n;
    }

    const floatDiff = currentFloat === -1 ? 0 : currentFloat;
    const repeatNeeded = biggestFloat - floatDiff;
    return n + '0'.repeat(repeatNeeded);
  });

  const normalizedNumbers = normalizedFloats.map(n => {
    return n.replace(/\D/g, '');
  });

  let numbersToSum = normalizedNumbers.reduce((acc, curr) => {
    return Math.max(acc, curr.length);
  }, 0);

  const paddedNumbers = normalizedNumbers.map(n => n.padStart(numbersToSum, '0'));

  let sum = '';
  let carry = BigInt(0);

  while (numbersToSum > 0) {
    const digits = paddedNumbers.map(n => Number(n[numbersToSum - 1]));
    const sumDigit = (digits.reduce(
      (acc, curr) => BigInt(acc) + BigInt(curr), BigInt(0)
    ) + BigInt(carry)).toString().split('');

    sum = sumDigit.pop().concat(sum);
    carry = BigInt(sumDigit.join(''));
    numbersToSum--;
  }

  const carryLeft = carry === BigInt(0) ? '' : carry.toString();
  sum = carryLeft.concat(sum);

  if (biggestFloat === -1) {
    sum = sum.replace(/^0+/, '');
  }

  if (biggestFloat > -1) {
    const floatPosition = sum.length - biggestFloat;
    const sumWithFloat = sum
      .substring(0, floatPosition)
      .concat('.')
      .concat(sum.substring(floatPosition));
    return sumWithFloat.replace(/\.?0+$/, '');
  }

  return sum;
}
