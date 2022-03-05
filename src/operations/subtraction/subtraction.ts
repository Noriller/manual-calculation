import { prepareNumbers } from '../shared/prepareNumbers';

export function Subtraction(minuend: string, subtrahend: string): string {
  const {
    digitsQuantity,
    paddedNumbers: [paddedMinuend, paddedSubtrahend],
    biggestFloat
  } = prepareNumbers([minuend, subtrahend]);

  let subtraction = '';
  let carry = 0;

  // start right to left
  for (let i = digitsQuantity - 1; i >= 0; i--) {
    const minuendDigit = Number(paddedMinuend[i]);
    const subtrahendDigit = Number(paddedSubtrahend[i]);

    // subtract the digit and the carry
    const subtractionDigit = minuendDigit - subtrahendDigit - carry;
    // if the result is negative, set a carry
    carry = subtractionDigit < 0 ? 1 : 0;
    // if the result is negative, add 10 to it
    // this way we don't need to first check if which digit is bigger
    const finalSubtractionValue = (subtractionDigit < 0 ? subtractionDigit + 10 : subtractionDigit).toString();
    // finally, concatenate the subtraction
    subtraction = finalSubtractionValue.concat(subtraction);
  }

  // if there's no float, clean zero's from the start
  if (biggestFloat === -1) {
    subtraction = subtraction.replace(/^0+/, '');
  }

  // if there's a float, add the decimal point
  // and clean zeros from the end
  // in case of only zero's after the decimal point, remove the decimal point
  if (biggestFloat > -1) {
    const floatPosition = subtraction.length - biggestFloat;
    const sumWithFloat = subtraction
      .substring(0, floatPosition)
      .concat('.')
      .concat(subtraction.substring(floatPosition));
    return sumWithFloat.replace(/\.?0+$/, '');
  }

  // after the cleaning, a empty string means 0
  return subtraction.length > 0 ? subtraction : '0';
}
