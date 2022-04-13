export function sumPreparedStrings(
  digitsQuantity: number,
  paddedNumbers: string[],
) {
  let sum = '';
  let carry = BigInt(0);

  // start right to left
  for (let i = digitsQuantity - 1; i >= 0; i--) {
    // take all the digits
    const digits = paddedNumbers.map((n) => Number(n[i]));
    // add them together and add the carry
    // using BigInt to avoid overflow in case of millions of numbers being added together
    // then convert it back to an array of digits
    const sumDigit = (
      digits.reduce((acc, curr) => BigInt(acc) + BigInt(curr), BigInt(0)) +
      BigInt(carry)
    )
      .toString()
      .split('');

    // take the last digit and concatenate it to the sum
    sum = sumDigit.pop().concat(sum);
    // the rest of the digits are the carry
    carry = BigInt(sumDigit.join(''));
  }

  // if a carry is present after all the digits have been summed
  const carryLeft = carry === BigInt(0) ? '' : carry.toString();
  // then concatenate the carry to the sum
  return carryLeft.concat(sum);
}
