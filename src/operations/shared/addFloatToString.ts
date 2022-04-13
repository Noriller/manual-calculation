/**
 * Add float point to string.
 */
export function addFloatToString(number: string, floatPosition: number) {
  const finalLength = getFinalStringLength(number, floatPosition);

  // pad the string with zeros to the final length
  const paddedSum = number.padStart(finalLength, '0');

  // it should come to this function when a float is needed
  // if the final length is the same as the original length,
  // then the float position is after the first digit
  const fixFloatPosition = finalLength === floatPosition ? 1 : 0;

  // find the index of the float divisor
  const finalFloatPosition = finalLength - floatPosition + fixFloatPosition;

  // split the string at the float divisor
  // add the float divisor
  // clean the zeroe's from the end
  // concat the string and return it
  return paddedSum
    .substring(0, finalFloatPosition)
    .concat('.')
    .concat(paddedSum.substring(finalFloatPosition))
    .replace(/\.?0+$/, '');
}

/**
 * Depending on the length of the multiplication result,
 * and the float position, returns the final length of the number string.
 * @example result "1" for a float 2 (0.01) returns final length 3
 */
function getFinalStringLength(finalValue: string, floatPosition: number) {
  if (finalValue.length < floatPosition) {
    return floatPosition + 1;
  }

  return finalValue.length;
}
