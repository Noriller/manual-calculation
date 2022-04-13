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

  let divisorFloat = getFloatPosition(divisor);
  let dividendFloat = getFloatPosition(dividend);
  const maxFloat = Math.max(divisorFloat, dividendFloat);

  const paddedNumbers = [divisor, dividend];

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

  const signs = paddedNumbers.map((number) => {
    if (number[0] === '-') {
      return '-';
    } else {
      return '+';
    }
  });

  const preparedNumbers = paddedNumbers.map((number) => {
    return number.replace(/\D/, '');
  });

  /**
   * This is a table we usually make when dividing a number by hand
   * This allows us to easily find the biggest number possible to subtract
   */
  const dividendMap = {
    1: preparedNumbers[1],
    2: Multiplication(preparedNumbers[1], '2'),
    3: Multiplication(preparedNumbers[1], '3'),
    4: Multiplication(preparedNumbers[1], '4'),
    5: Multiplication(preparedNumbers[1], '5'),
    6: Multiplication(preparedNumbers[1], '6'),
    7: Multiplication(preparedNumbers[1], '7'),
    8: Multiplication(preparedNumbers[1], '8'),
    9: Multiplication(preparedNumbers[1], '9'),
  };

  let quotient = '';
  let currentDivisor = preparedNumbers[0];
  let digits = 0;
  let startWithZero = false;
  let zeroAppends = 0;

  while (currentDivisor !== '0') {
    while (leftIsBigger(preparedNumbers[1], currentDivisor)) {
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

    const { toSubtract, quotientAdd } = getNumberToSubtract(
      currentDivisor,
      dividendMap,
    );

    currentDivisor = Subtraction(currentDivisor, toSubtract);
    quotient = Sum(quotient, quotientAdd);
  }

  if (zeroAppends > 0) {
    quotient = '0'.repeat(zeroAppends).concat(quotient);
  }

  if (startWithZero) {
    quotient = '0.'.concat(quotient);
  } else if (digits > 0) {
    quotient = addFloatToString(quotient, digits);
  }

  quotient = quotient.replace(/\.?0+$/, '');

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
  const candidates = Object.entries(map).map(([key, value]) => {
    let candidateValue = value;
    let zeroes = 0;

    while (candidateValue.length <= number.length) {
      const biggestCandidate = candidateValue.concat('0');
      if (leftIsBigger(number, biggestCandidate)) {
        zeroes++;
        candidateValue = biggestCandidate;
      } else {
        break;
      }
    }

    if (!rightIsBigger(candidateValue, number)) {
      return ['0', '0'];
    }

    return [candidateValue, String(key).concat('0'.repeat(zeroes))];
  });

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
