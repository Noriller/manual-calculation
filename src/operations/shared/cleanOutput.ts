export function cleanOutput(
  finalNumber: string,
  biggestFloat: number,
  finalSign: string,
) {
  if (Number(finalNumber) === 0) {
    return '0';
  }

  // if there's a float, add the decimal point
  // and clean zeros from the end
  // in case of only zero's after the decimal point, remove the decimal point
  if (biggestFloat > -1) {
    const floatPosition = finalNumber.length - biggestFloat;
    finalNumber = finalNumber
      .substring(0, floatPosition)
      .concat('.')
      .concat(finalNumber.substring(floatPosition))
      .replace(/\.?0+$/, '');
  }
  // remove trailing zeros from string, except for the first before the decimal point
  finalNumber = finalNumber.replace(/^0+(?!\.)/, '');

  return finalSign === '-' ? finalSign.concat(finalNumber) : finalNumber;
}
