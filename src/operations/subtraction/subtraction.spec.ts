import { Subtraction } from './subtraction';

describe('sum', () => {
  it('subtracts 2 - 1 to equal 1', () => {
    expect(Subtraction('2', '1')).toStrictEqual('1');
  });

  it('subtracts 2 - 2 to equal 2', () => {
    expect(Subtraction('2', '2')).toStrictEqual('0');
  });

  it('subtracts 2 - 2 to equal 2', () => {
    expect(Subtraction('2', '2')).toStrictEqual('0');
  });

  it('subtracts 10 - 2 to equal 8', () => {
    expect(Subtraction('10', '2')).toStrictEqual('8');
  });

  it('subtracts 100 - 2 to equal 98', () => {
    expect(Subtraction('100', '2')).toStrictEqual('98');
  });

  it('subtracts 1000 - 2 to equal 998', () => {
    expect(Subtraction('1000', '2')).toStrictEqual('998');
  });

  it('subtracts 1 - 0.1 to equal 0.9', () => {
    expect(Subtraction('1', '0.1')).toStrictEqual('0.9');
  });

  it('subtracts 0.1 - 0.1 to equal 0', () => {
    expect(Subtraction('0.1', '0.1')).toStrictEqual('0');
  });

  it('subtracts 0.01 - 0.001 to equal 0.011', () => {
    expect(Subtraction('0.01', '0.001')).toStrictEqual('0.009');
  });

  it('subtracts 123456789.132456789 - 0.000000001 to equal 123456789132456790', () => {
    expect(Subtraction('123456789.132456789', '0.000000001')).toStrictEqual('123456789.132456788');
  });

  it('subtracts 0000001 - 0000000002 to equal 3', () => {
    expect(Subtraction('0000002', '0000000001')).toStrictEqual('1');
  });

  it('subtracts 2.000000 - 1.000000000 to equal 1', () => {
    expect(Subtraction('2.000000', '1.000000000')).toStrictEqual('1');
  });

  it('subtracts 2_000_000 - 1_000_000 to equal 1000000', () => {
    expect(Subtraction('2_000_000', '1_000_000')).toStrictEqual('1000000');
  });
});