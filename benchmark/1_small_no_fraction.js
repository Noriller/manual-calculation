const { ManualCalculator } = require('../dist/index');

const calculator = ManualCalculator({
  useHumanReadableNumbers: false,
  divisionDigits: 50,
});

console.log('Using small numbers, no fractions:');

console.time('default implementation');

console.log(`5 + 5 = ${5 + 5}`);
console.log(`5 - 5 = ${5 - 5}`);
console.log(`5 * 5 = ${5 * 5}`);
console.log(`5 / 5 = ${5 / 5}`);

console.timeEnd('default implementation');


console.log('\nUsing the same numbers with ManualCalculator:');

console.time('manualCalculator');

console.log(`5 + 5 = ${calculator.sum('5', '5')}`);
console.log(`5 - 5 = ${calculator.subtraction('5', '5')}`);
console.log(`5 * 5 = ${calculator.multiplication('5', '5')}`);
console.log(`5 / 5 = ${calculator.division('5', '5')}`);

console.timeEnd('manualCalculator');


console.log('\nDoing it all again to check for hot/cold start:');

console.time('default implementation');

console.log(`6 + 6 = ${6 + 6}`);
console.log(`6 - 6 = ${6 - 6}`);
console.log(`6 * 6 = ${6 * 6}`);
console.log(`6 / 6 = ${6 / 6}`);

console.timeEnd('default implementation');


console.log('\nUsing the same numbers with ManualCalculator:');

console.time('manualCalculator');

console.log(`6 + 6 = ${calculator.sum('6', '6')}`);
console.log(`6 - 6 = ${calculator.subtraction('6', '6')}`);
console.log(`6 * 6 = ${calculator.multiplication('6', '6')}`);
console.log(`6 / 6 = ${calculator.division('6', '6')}`);

console.timeEnd('manualCalculator');
