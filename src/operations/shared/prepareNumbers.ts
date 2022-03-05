import { getFloatPosition } from './getFloatPosition';

export function prepareNumbers(numbers: string[]) {
  // get the biggest float of all numbers
  const biggestFloat = Math.max(...numbers.map(n => getFloatPosition(n)));

  // pad each number after the float to have the same length
  const normalizedFloats = numbers.map(n => {
    const currentFloat = getFloatPosition(n);
    if (currentFloat === biggestFloat) {
      return n;
    }

    const floatDiff = currentFloat === -1 ? 0 : currentFloat;
    const repeatNeeded = biggestFloat - floatDiff;
    return n + '0'.repeat(repeatNeeded);
  });

  // remove everything that isn't a number from the string
  const normalizedNumbers = normalizedFloats.map(n => {
    return n.replace(/\D/g, '');
  });

  // get the biggest length
  const digitsQuantity = normalizedNumbers.reduce((acc, curr) => {
    return Math.max(acc, curr.length);
  }, 0);

  // pad each number with 0s to have the same length
  const paddedNumbers = normalizedNumbers.map(n => n.padStart(digitsQuantity, '0'));

  return { digitsQuantity, paddedNumbers, biggestFloat };
}
