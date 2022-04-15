import { ManualCalculator } from './';

describe('ManualCalculator', () => {
  it('should add two numbers', () => {
    const calculator = ManualCalculator();
    expect(calculator.sum('1', '2')).toBe('3');
  });

  it('should subtract a subtrahend from the minuend', () => {
    const calculator = ManualCalculator();
    expect(calculator.subtraction('10', '5')).toBe('5');
  });

  it('should multiply two numbers', () => {
    const calculator = ManualCalculator();
    expect(calculator.multiplication('2', '3')).toBe('6');
  });

  it('should divide a dividend by a divisor', () => {
    const calculator = ManualCalculator();
    expect(calculator.division('10', '2')).toBe('5');
  });

  it('should use human readable numbers', () => {
    const calculator = ManualCalculator({ useHumanReadableNumbers: true });
    expect(calculator.sum('1_000', '2')).toBe('1_002');
    expect(calculator.subtraction('10_000', '5')).toBe('9_995');
    expect(calculator.multiplication('2_000', '3')).toBe('6_000');
    expect(calculator.division('10_000', '2')).toBe('5_000');
  });

  it('should not use human readable numbers', () => {
    const calculator = ManualCalculator({ useHumanReadableNumbers: false });
    expect(calculator.sum('1_000', '2')).toBe('1002');
    expect(calculator.subtraction('10_000', '5')).toBe('9995');
    expect(calculator.multiplication('2_000', '3')).toBe('6000');
    expect(calculator.division('10_000', '2')).toBe('5000');
  });

  it('should use default division digits', () => {
    const calculator = ManualCalculator();
    expect(calculator.division('2', '3')).toBe('0.6666666667');
  });

  it('should use custom division digits', () => {
    const calculator = ManualCalculator({ divisionDigits: 2 });
    expect(calculator.division('2', '3')).toBe('0.67');
  });

  it('should use human readable and decimals', () => {
    const calculator = ManualCalculator({
      useHumanReadableNumbers: true,
      divisionDigits: 2,
    });
    expect(calculator.division('20_000', '30_000')).toBe('0.67');
  });

  it('should throw an error if the inputs are not valid', () => {
    const calculator = ManualCalculator();
    // @ts-expect-error checking for invalid input
    expect(() => calculator.sum('1', 2)).toThrowError(
      '2 is not a string, please pass numbers as strings.',
    );
    // @ts-expect-error checking for invalid input
    expect(() => calculator.subtraction('1', 2)).toThrowError(
      '2 is not a string, please pass numbers as strings.',
    );
    // @ts-expect-error checking for invalid input
    expect(() => calculator.multiplication('1', 2)).toThrowError(
      '2 is not a string, please pass numbers as strings.',
    );
    // @ts-expect-error checking for invalid input
    expect(() => calculator.division('1', 2)).toThrowError(
      '2 is not a string, please pass numbers as strings.',
    );
  });
});
