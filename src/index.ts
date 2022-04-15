import { humanReadable } from './operations/shared/humanReadable';
import { Division } from './operations/division/division';
import { Multiplication } from './operations/multiplication/multiplication';
import { Subtraction } from './operations/subtraction/subtraction';
import { Sum } from './operations/sum/sum';

/**
 * This is a calculator that uses strings to calculate in base 10.
 *
 * It basically calculates the way we do in pen and paper.
 *
 * It supports addition, subtraction, multiplication and division.
 *
 * Remember to always pass the numbers as strings.
 */
function ManualCalculator({
  useHumanReadableNumbers = false,
  divisionDigits = 10,
}: ManualCalculatorOptions = {}) {
  const sum = (...numbers: string[]) => {
    checkInput(numbers);
    const nums = numbers.map((s) => s.replace(/_/g, ''));
    const result = Sum(...nums);
    return useHumanReadableNumbers ? humanReadable(result) : result;
  };

  const subtraction = (minuend: string, subtrahend: string) => {
    checkInput([minuend, subtrahend]);
    const nums = [minuend.replace(/_/g, ''), subtrahend.replace(/_/g, '')];
    const result = Subtraction(nums[0], nums[1]);
    return useHumanReadableNumbers ? humanReadable(result) : result;
  };

  const multiplication = (multiplicand: string, multiplier: string) => {
    checkInput([multiplicand, multiplier]);
    const nums = [multiplicand.replace(/_/g, ''), multiplier.replace(/_/g, '')];
    const result = Multiplication(nums[0], nums[1]);
    return useHumanReadableNumbers ? humanReadable(result) : result;
  };

  const division = (dividend: string, divisor: string) => {
    checkInput([dividend, divisor]);
    const nums = [dividend.replace(/_/g, ''), divisor.replace(/_/g, '')];
    const result = Division(nums[0], nums[1], divisionDigits);
    return useHumanReadableNumbers ? humanReadable(result) : result;
  };

  return {
    /**
     * This adds any number of numbers together.
     */
    sum,
    /**
     * This adds any number of numbers together.
     */
    add: sum,
    /**
     * This subtracts a subtrahend from the minuend.
     */
    subtraction,
    /**
     * This subtracts a subtrahend from the minuend.
     */
    subtract: subtraction,
    /**
     * This multiplies the multiplicand and the multiplier.
     */
    multiplication,
    /**
     * This multiplies the multiplicand and the multiplier.
     */
    multiply: multiplication,
    /**
     * This divides the dividend by the divisor.
     */
    division,
    /**
     * This divides the dividend by the divisor.
     */
    divide: division,
  };

  /**
   * This checks if the inputs are valid
   * (if they are strings).
   */
  function checkInput(nums: string[]) {
    nums.forEach((s) => {
      if (typeof s !== 'string') {
        throw new Error(
          `${s} is not a string, please pass numbers as strings.`,
        );
      }
    });
  }
}

type ManualCalculatorOptions = {
  /**
   * This is a boolean that determines if the numbers should be
   * formatted with a thousands separator.
   *
   * If this is set to false, the result will not be formatted.
   */
  useHumanReadableNumbers?: boolean;
  /**
   * This is the number of digits after the decimal point.
   *
   * This applies only for the division operation.
   *
   * It defaults to 10 digits.
   */
  divisionDigits?: number;
};

export = ManualCalculator;
