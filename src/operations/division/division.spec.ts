import { Division } from './division';

describe('division', () => {
  it('should divide 1 / 0 = Error', () => {
    expect(() => {
      Division('1', '0');
    }).toThrowError('Division by zero');
  });

  it('should divide 0 / 1 = Error', () => {
    expect(() => {
      Division('0', '1');
    }).toThrowError('Division of zero');
  });

  it('should divide 1 / 1 = 1', () => {
    expect(Division('1', '1')).toEqual('1');
  });

  it('should divide 9 / 1 = 1', () => {
    expect(Division('9', '1')).toEqual('9');
  });

  it('should divide 10 / 2 = 5', () => {
    expect(Division('10', '2')).toEqual('5');
  });

  it('should divide -10 / 2 = 5', () => {
    expect(Division('-10', '2')).toEqual('-5');
  });

  it('should divide 10 / -2 = 5', () => {
    expect(Division('10', '-2')).toEqual('-5');
  });

  it('should divide -10 / -2 = 5', () => {
    expect(Division('-10', '-2')).toEqual('5');
  });

  it('should divide 1 / 2 = 0.5', () => {
    expect(Division('1', '2')).toEqual('0.5');
  });

  it('should divide 100 / 25 = 4', () => {
    expect(Division('100', '25')).toEqual('4');
  });

  it('should divide 10 / 2.5 = 4', () => {
    expect(Division('10', '2.5')).toEqual('4');
  });

  it('should divide 1.8 / 2 = 0.9', () => {
    expect(Division('1.8', '2')).toEqual('0.9');
  });

  it('should divide 8.25 / 1.5 = 5.5', () => {
    expect(Division('8.25', '1.5')).toEqual('5.5');
  });

  it('should divide 9 / 2 = 4.5', () => {
    expect(Division('9', '2')).toEqual('4.5');
  });

  it('should divide 9.9 / 1.1 = 9', () => {
    expect(Division('9.9', '1.1')).toEqual('9');
  });

  it('should divide 1 / 100 = 0.01', () => {
    expect(Division('1', '100')).toEqual('0.01');
  });

  it('should divide 1 / 1000 = 0.001', () => {
    expect(Division('1', '1000')).toEqual('0.001');
  });

  it('should divide 1 / 1000000 = 0.000001', () => {
    expect(Division('1', '1000000')).toEqual('0.000001');
  });

  it('should divide 1 / 1000000000000000000000 = 0 ("digit overflow")', () => {
    expect(Division('1', '1000000000000000000000')).toEqual('0');
  });

  it('should divide 1 / 1000000000000000000000 = 0.000000000000000000001', () => {
    expect(Division('1', '1000000000000000000000', 100)).toEqual(
      '0.000000000000000000001',
    );
  });

  it('should divide 245850922 / 78256779 = 3.1415926535', () => {
    expect(Division('245850922', '78256779')).toEqual('3.1415926535');
  });
});
