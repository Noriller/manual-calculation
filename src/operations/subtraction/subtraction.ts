import { getFloatPosition } from '../shared/getFloatPosition';

export function Subtraction(minuend: string, subtrahend: string): string {
  const biggestFloat = Math.max(...[minuend, subtrahend].map(n => getFloatPosition(n)));

  const normalizedFloats = [minuend, subtrahend].map(n => {
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

  const digitsToSubtract = normalizedNumbers.reduce((acc, curr) => {
    return Math.max(acc, curr.length);
  }, 0);

  const [paddedMinuend, paddedSubtrahend] = normalizedNumbers.map(n => n.padStart(digitsToSubtract, '0'));

  let subtraction = '';
  let carry = 0;

  for (let i = paddedMinuend.length - 1; i >= 0; i--) {
    const minuendDigit = Number(paddedMinuend[i]);
    const subtrahendDigit = Number(paddedSubtrahend[i]);

    const subtractionDigit = minuendDigit - subtrahendDigit - carry;
    carry = subtractionDigit < 0 ? 1 : 0;
    subtraction = (subtractionDigit < 0 ? subtractionDigit + 10 : subtractionDigit) + subtraction;
  }

  if (biggestFloat === -1) {
    subtraction = subtraction.replace(/^0+/, '');
  }

  if (biggestFloat > -1) {
    const floatPosition = subtraction.length - biggestFloat;
    const sumWithFloat = subtraction
      .substring(0, floatPosition)
      .concat('.')
      .concat(subtraction.substring(floatPosition));
    return sumWithFloat.replace(/\.?0+$/, '');
  }

  return subtraction.length > 0 ? subtraction : '0';
}
