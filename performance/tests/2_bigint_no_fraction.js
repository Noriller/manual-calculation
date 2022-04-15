const ManualCalculator = require('../../dist/index');

const calculator = ManualCalculator({
  useHumanReadableNumbers: false,
  divisionDigits: 50,
});

console.log('\n\n\nUsing BigInt numbers, still no fractions:');

console.time('default implementation');

console.log(`BigInt(555555555555555) + BigInt(555555555555555) = ${BigInt(555555555555555) + BigInt(555555555555555)}`);
console.log(`BigInt(555555555555555) - BigInt(555555555555555) = ${BigInt(555555555555555) - BigInt(555555555555555)}`);
console.log(`BigInt(555555555555555) * BigInt(555555555555555) = ${BigInt(555555555555555) * BigInt(555555555555555)}`);
console.log(`BigInt(555555555555555) / BigInt(555555555555555) = ${BigInt(555555555555555) / BigInt(555555555555555)}`);

console.timeEnd('default implementation');

console.log('\nUsing the same numbers with ManualCalculator:');

console.time('manualCalculator');

console.log(`555555555555555 + 555555555555555 = ${calculator.sum('555555555555555', '555555555555555')}`);
console.log(`555555555555555 - 555555555555555 = ${calculator.subtraction('555555555555555', '555555555555555')}`);
console.log(`555555555555555 * 555555555555555 = ${calculator.multiplication('555555555555555', '555555555555555')}`);
console.log(`555555555555555 / 555555555555555 = ${calculator.division('555555555555555', '555555555555555')}`);

console.timeEnd('manualCalculator');

console.log('\nDoing it all again to check for hot/cold start:');

console.time('default implementation');

console.log(`BigInt(666666666666666) + BigInt(666666666666666) = ${BigInt(666666666666666) + BigInt(666666666666666)}`);
console.log(`BigInt(666666666666666) - BigInt(666666666666666) = ${BigInt(666666666666666) - BigInt(666666666666666)}`);
console.log(`BigInt(666666666666666) * BigInt(666666666666666) = ${BigInt(666666666666666) * BigInt(666666666666666)}`);
console.log(`BigInt(666666666666666) / BigInt(666666666666666) = ${BigInt(666666666666666) / BigInt(666666666666666)}`);

console.timeEnd('default implementation');

console.log('\nUsing the same numbers with ManualCalculator:');

console.time('manualCalculator');

console.log(`666666666666666 + 666666666666666 = ${calculator.sum('666666666666666', '666666666666666')}`);
console.log(`666666666666666 - 666666666666666 = ${calculator.subtraction('666666666666666', '666666666666666')}`);
console.log(`666666666666666 * 666666666666666 = ${calculator.multiplication('666666666666666', '666666666666666')}`);
console.log(`666666666666666 / 666666666666666 = ${calculator.division('666666666666666', '666666666666666')}`);

console.timeEnd('manualCalculator');