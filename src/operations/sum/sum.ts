import { prepareNumbers } from '../shared/prepareNumbers';

export function Sum(...numbers: string[]): string {
  if (numbers.length === 0) return '0';

  const { digitsQuantity, paddedNumbers, biggestFloat } = prepareNumbers(numbers);

  let sum = '';
  let carry = BigInt(0);

  // start right to left
  for (let i = digitsQuantity - 1; i >= 0; i--) {
    // take all the digits
    const digits = paddedNumbers.map(n => Number(n[i]));
    // add them together and add the carry
    // using BigInt to avoid overflow in case of millions of numbers being added together
    // then convert it back to an array of digits
    const sumDigit = (digits.reduce(
      (acc, curr) => BigInt(acc) + BigInt(curr), BigInt(0)
    ) + BigInt(carry)).toString().split('');

    // take the last digit and concatenate it to the sum
    sum = sumDigit.pop().concat(sum);
    // the rest of the digits are the carry
    carry = BigInt(sumDigit.join(''));
  }

  // if a carry is present after all the digits have been summed
  const carryLeft = carry === BigInt(0) ? '' : carry.toString();
  // then concatenate the carry to the sum
  sum = carryLeft.concat(sum);

  // if there's no float, clean zero's from the start
  if (biggestFloat === -1) {
    sum = sum.replace(/^0+/, '');
  }

  // if there's a float, add the decimal point
  // and clean zeros from the end
  // in case of only zero's after the decimal point, remove the decimal point
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
