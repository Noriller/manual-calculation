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
  let carry = 0;

  while (numbersToSum > 0) {
    const digits = paddedNumbers.map(n => Number(n[numbersToSum - 1]));
    let sumDigit = digits.reduce((acc, curr) => acc + curr, 0) + carry;
    carry = 0;

    while (sumDigit > 9 && numbersToSum > 1) {
      sumDigit -= 10;
      carry += 1;
    }

    sum = sumDigit.toString().concat(sum);
    numbersToSum--;
  }

  if (biggestFloat > -1) {
    const floatPosition = sum.length - biggestFloat;
    return sum
      .substring(0, floatPosition)
      .concat('.')
      .concat(sum.substring(floatPosition));
  }

  return sum;
}
