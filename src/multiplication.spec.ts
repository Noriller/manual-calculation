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
});