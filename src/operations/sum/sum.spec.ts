import { Sum } from './sum';

describe('sum', () => {
  it('should add no numbers', () => {
    expect(Sum()).toBe('0');
  });

  it('should add one number', () => {
    expect(Sum('2')).toBe('2');
  })

  it('adds 1 + 2 to equal 3', () => {
    expect(Sum('1', '2')).toStrictEqual('3');
  });

  it('adds 10 + 2 to equal 12', () => {
    expect(Sum('10', '2')).toStrictEqual('12');
  });

  /**
   * 123456789132456789 already overflows the number of digits in JavaScript
   */
  it('adds 123456789132456789 + 1 to equal 123456789132456790', () => {
    expect(Sum('123456789132456789', '1')).toStrictEqual('123456789132456790');
  });

  it('adds 1 + 123456789132456789 to equal 123456789132456790', () => {
    expect(Sum('1', '123456789132456789')).toStrictEqual('123456789132456790');
  });

  it('adds 1 + 1++ 1 to equal 3', () => {
    expect(Sum('1', '1', '1')).toStrictEqual('3');
  });

  it('adds 0.1 + 1 to equal 1.1', () => {
    expect(Sum('0.1', '1')).toStrictEqual('1.1');
  });

  it('adds 0.1 + 0.1 to equal 0.2', () => {
    expect(Sum('0.1', '0.1')).toStrictEqual('0.2');
  });

  it('adds 0.01 + 0.001 to equal 0.011', () => {
    expect(Sum('0.01', '0.001')).toStrictEqual('0.011');
  });

  it('adds 100.001 + 10.01 + 1.1 to equal 111.111', () => {
    expect(Sum('100.001', '10.01', '1.1')).toStrictEqual('111.111');
  });

  it('adds 123456789.132456789 + 0.000000001 to equal 123456789132456790', () => {
    expect(Sum('123456789.132456789', '0.000000001')).toStrictEqual('123456789.13245679');
  });

  it('adds 123456789.132456789 + 999999999.999999999 + 987654321.987654321 to equal 2111111111.120111109', () => {
    expect(Sum('123456789.132456789', '999999999.999999999', '987654321.987654321')).toStrictEqual('2111111111.120111109');
  });

  it('adds 12345678913245678.9 + 9999999999999999.99 + 987654321987654.321 to equal 2111111111120111109', () => {
    expect(Sum('12345678913245678.9', '9999999999999999.99', '987654321987654.321')).toStrictEqual('23333333235233333.211');
  });

  it('adds 0000001 + 0000000002 to equal 3', () => {
    expect(Sum('0000001', '0000000002')).toStrictEqual('3');
  });

  it('adds 1.000000 + 2.000000000 to equal 3', () => {
    expect(Sum('1.000000', '2.000000000')).toStrictEqual('3');
  });

  it('adds 1_000_000 + 2_000_000 to equal 3000000', () => {
    expect(Sum('1_000_000', '2_000_000')).toStrictEqual('3000000');
  });
});