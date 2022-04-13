import { Multiplication } from './multiplication';

describe('multiplication', () => {
  it('should multiply two numbers', () => {
    expect(Multiplication('2', '2')).toBe('4');
  });

  it('should multiply 11 * 2 = 22', () => {
    expect(Multiplication('11', '2')).toBe('22');
  });

  it('should multiply 11 * 11 = 121', () => {
    expect(Multiplication('11', '11')).toBe('121');
  });

  it('should multiply 123456789 * 5 = 1851851835', () => {
    expect(Multiplication('123456789', '5')).toBe('617283945');
  });

  it('should multiply 123456789 * 15 = 1851851835', () => {
    expect(Multiplication('123456789', '15')).toBe('1851851835');
  });

  it('should multiply 123456789 * 123456789 = 15241578750190521', () => {
    expect(Multiplication('123456789', '123456789')).toBe('15241578750190521');
  });

  it('should multiply 0.1 * 10 = 1', () => {
    expect(Multiplication('0.1', '10')).toBe('1');
  });

  it('should multiply 10 * 1.0 = 10', () => {
    expect(Multiplication('10', '1.0')).toBe('10');
  });

  it('should multiply 10 * 0.5 = 5', () => {
    expect(Multiplication('10', '0.5')).toBe('5');
  });

  it('should multiply 0.2 * 0.2 = 0.04', () => {
    expect(Multiplication('0.2', '0.2')).toBe('0.04');
  });

  it('should multiply 0.02 * 0.2 = 0.004', () => {
    expect(Multiplication('0.02', '0.2')).toBe('0.004');
  });

  it('should multiply 0.200 * 0.200 = 0.04', () => {
    expect(Multiplication('0.200', '0.200')).toBe('0.04');
  });
});
