import { addFloatToString } from '../shared/addFloatToString';
import { getFloatPosition } from '../shared/getFloatPosition';
import { prepareNumbers } from '../shared/prepareNumbers';
import { Subtraction } from '../subtraction/subtraction';
import { Sum } from '../sum/sum';

export function Division(divisor: string, dividend: string, maxDigits = 10): string {
  if (divisor === '0') {
    throw new Error('Division of zero');
  }
  if (dividend === '0') {
    throw new Error('Division by zero');
  }

  let divisorFloat = getFloatPosition(divisor); //?
  let dividendFloat = getFloatPosition(dividend); //?
  const maxFloat = Math.max(divisorFloat, dividendFloat);

  const paddedNumbers = [divisor, dividend];

  if (maxFloat > 0) {
    if (divisorFloat > dividendFloat) {
      dividendFloat = dividendFloat === -1 ? 0 : dividendFloat;
      paddedNumbers[1] = dividend.concat('0'.repeat(divisorFloat - dividendFloat));
    } else {
      divisorFloat = divisorFloat === -1 ? 0 : divisorFloat;
      paddedNumbers[0] = divisor.concat('0'.repeat(dividendFloat - divisorFloat));
    }
  }

  const signs = paddedNumbers.map(number => {
    if (number[0] === '-') {
      return '-';
    } else {
      return '+';
    }
  }); //?

  let preparedNumbers = paddedNumbers.map(number => {
    return number.replace(/\D/, '');
  }); //?

  let quotient = '';
  let currentDivisor = preparedNumbers[0]; //?
  let digits = 0;
  let startWithZero = false;
  let zeroAppends = 0;

  while (currentDivisor !== '0') {
    while (!leftIsBigger(currentDivisor, preparedNumbers[1])) {
      if (++digits > maxDigits) break;
      if (quotient === '') {
        if (startWithZero) {
          zeroAppends++;
        }
        startWithZero = true;
      } else {
        quotient = quotient.concat('0');
      }
      currentDivisor = currentDivisor.concat('0');
    }

    if (digits > maxDigits) break;

    currentDivisor = Subtraction(currentDivisor, preparedNumbers[1]); //?
    quotient = Sum(quotient, '1'); //?
  }

  if (zeroAppends > 0) {
    quotient = '0'.repeat(zeroAppends).concat(quotient);
  }

  if (startWithZero) {
    quotient = '0.'.concat(quotient);
  } else if (digits > 0) {
    quotient = addFloatToString(quotient, digits - 1);
  }

  quotient = quotient.replace(/\.?0+$/, '');

  if (signs[0] !== signs[1] && quotient !== '0') {
    quotient = '-'.concat(quotient);
  }

  return quotient;
}

function leftIsBigger(left: string, right: string): boolean {
  if (left.length > right.length) {
    return true;
  } else if (left.length < right.length) {
    return false;
  } else {
    for (let i = 0; i < left.length; i++) {
      if (left[i] > right[i]) {
        return true;
      } else if (left[i] < right[i]) {
        return false;
      }
    }
  }
  return true;
}