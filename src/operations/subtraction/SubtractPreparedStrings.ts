
export function subtractPreparedStrings(digitsQuantity: number, paddedNumbers: string[]) {
  const {
    orderedNumbers: [paddedMinuend, paddedSubtrahend], finalSign,
  } = (paddedNumbers[0] > paddedNumbers[1])
      ? {
        orderedNumbers: [paddedNumbers[0], paddedNumbers[1]],
        finalSign: '+'
      }
      : {
        orderedNumbers: [paddedNumbers[1], paddedNumbers[0]],
        finalSign: '-'
      };

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

  return { subtraction, finalSign };
}
