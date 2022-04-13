import { Multiplication } from '../multiplication/multiplication';
import { addFloatToString } from '../shared/addFloatToString';
import { getFloatPosition } from '../shared/getFloatPosition';
import { Subtraction } from '../subtraction/subtraction';
import { Sum } from '../sum/sum';
import { leftIsBigger, rightIsBigger } from '../shared/leftIsBigger';

export function Division(
  divisor: string,
  dividend: string,
  maxDigits = 10,
): string {
  if (divisor === '0') {
    throw new Error('Division of zero');
  }
  if (dividend === '0') {
    throw new Error('Division by zero');
  }

  // we add one more digit to be able to round numbers
  const maxDigitsForRounding = maxDigits + 1;

  let divisorFloat = getFloatPosition(divisor);
  let dividendFloat = getFloatPosition(dividend);
  const maxFloat = Math.max(divisorFloat, dividendFloat);

  const paddedNumbers = [divisor, dividend];

  // we get the bigger float point and pad the necessary zeros
  if (maxFloat > 0) {
    if (divisorFloat > dividendFloat) {
      dividendFloat = dividendFloat === -1 ? 0 : dividendFloat;
      paddedNumbers[1] = dividend.concat(
        '0'.repeat(divisorFloat - dividendFloat),
      );
    } else {
      divisorFloat = divisorFloat === -1 ? 0 : divisorFloat;
      paddedNumbers[0] = divisor.concat(
        '0'.repeat(dividendFloat - divisorFloat),
      );
    }
  }

  // get the signs
  const signs = paddedNumbers.map((number) => {
    if (number[0] === '-') {
      return '-';
    } else {
      return '+';
    }
  });

  // remove anything that is not a number
  const preparedNumbers = paddedNumbers.map((number) => {
    return number.replace(/\D/, '');
  });

  const preparedDividend = preparedNumbers[1];

  /**
   * This is a table we usually make when dividing a number by hand
   * This allows us to easily find the biggest number possible to subtract
   */
  const dividendMap = {
    1: preparedDividend,
    2: Multiplication(preparedDividend, '2'),
    3: Multiplication(preparedDividend, '3'),
    4: Multiplication(preparedDividend, '4'),
    5: Multiplication(preparedDividend, '5'),
    6: Multiplication(preparedDividend, '6'),
    7: Multiplication(preparedDividend, '7'),
    8: Multiplication(preparedDividend, '8'),
    9: Multiplication(preparedDividend, '9'),
  };

  let quotient = '';
  let currentDivisor = preparedNumbers[0];
  let digits = 0;
  let startWithZero = false;
  let zeroAppends = 0;

  while (currentDivisor !== '0') {
    // while the dividend is greater than the current divisor
    while (leftIsBigger(preparedDividend, currentDivisor)) {
      // we stop with there's enough digits
      if (++digits > maxDigitsForRounding) break;
      // if there's no quotient
      if (quotient === '') {
        // and we already setted the first zero
        if (startWithZero) {
          // we append a zero
          // this covers the case where we have a result like 0.0000...
          zeroAppends++;
        }
        // we set the that it starts with a zero
        startWithZero = true;
      } else {
        // we simply append a zero if there's already some quotient
        quotient = quotient.concat('0');
      }
      // finally we append a zero to the divisor
      currentDivisor = currentDivisor.concat('0');
    }

    // we need to also break here to exit the main loop
    if (digits > maxDigitsForRounding) {
      break;
    }

    // we get the number to subtract from the divisor
    // and how much to add to the quotient
    const { toSubtract, quotientAdd } = getNumberToSubtract(
      currentDivisor,
      dividendMap,
    );

    currentDivisor = Subtraction(currentDivisor, toSubtract);
    quotient = Sum(quotient, quotientAdd);
  }

  // we add the zeroes to the left
  // we only add here to avoid trimming from other methods
  if (zeroAppends > 0 || startWithZero) {
    const startWithZeroAdd = 1;
    quotient = '0'.repeat(zeroAppends + startWithZeroAdd).concat(quotient);
  }

  // we have to check if there's a need to round
  if (digits > maxDigitsForRounding) {
    const quotientArr = quotient.split('');
    // rounding up if the last digit is 5 or more
    // this removes the extra digit regardless of rounding
    if (Number(quotientArr.pop()) > 4) {
      // and here the last is rounded if needed
      quotientArr.push(String(Number(quotientArr.pop()) + 1));
    }
    quotient = quotientArr.join('');
  }

  // here the float point is added
  // if start with zero, then the point is added after the first zero
  if (startWithZero) {
    const [zero, ...rest] = quotient.split('');
    quotient = zero.concat('.').concat(rest.join(''));
  } else if (digits > 0) {
    // else, we add the float point based on the number of digits
    const digitForRoundingAdjust = digits > maxDigitsForRounding ? 1 : 0;
    quotient = addFloatToString(quotient, digits - digitForRoundingAdjust);
  }

  // we clean the string for cases finishing with a zero or on the float point
  // it cleans: "x.", "x.0" and "x.000" (any number of zeroes)
  quotient = quotient.replace(/\.?0*$/, '');

  // we add the sign
  if (signs[0] !== signs[1] && quotient !== '0') {
    quotient = '-'.concat(quotient);
  }

  return quotient;
}

/**
 * Find biggest number possible to subtract from current dividend
 * the biggest number will be from 1 to 9 padded with enought zeros
 * Returns the number toSubtract and the quotientAdd
 */
function getNumberToSubtract(number: string, map: NumberMap) {
  // from the multiplication table
  const candidates = Object.entries(map).map(([key, value]) => {
    let candidateValue = value;
    let zeroes = 0;

    // while the possible candidate has a smaller length, we try using it
    while (candidateValue.length <= number.length) {
      // we try to add zeroes to the candidate
      const biggestCandidate = candidateValue.concat('0');
      // and check if it's bigger than the number
      if (leftIsBigger(number, biggestCandidate)) {
        // we keep track of the zeroes to add in the quotient
        zeroes++;
        // reassign the candidate to try again
        candidateValue = biggestCandidate;
      } else {
        // if it's bigger, we stop
        break;
      }
    }

    // we ignore the possible candidate if it's bigger than the current dividend
    if (leftIsBigger(candidateValue, number)) {
      return ['0', '0'];
    }

    // we return the candidate, that is already padded
    // and quotient with zeroes to match
    return [candidateValue, String(key).concat('0'.repeat(zeroes))];
  });

  // we reduce the candidates to get the biggest candidate possible
  const [toSubtract, quotientAdd] = candidates.reduce(
    (acc, candidate) => {
      if (leftIsBigger(candidate[0], acc[0])) {
        return candidate;
      } else {
        return acc;
      }
    },
    ['0', '0'],
  );

  return { toSubtract, quotientAdd };
}

type NumberMap = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
};
