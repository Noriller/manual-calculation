const { ManualCalculator } = require('../../dist/index');

const calculator = ManualCalculator({
  useHumanReadableNumbers: false,
  divisionDigits: 1000,
});

console.log('\n\n\nInfinite division 1k digits:');

console.time('default implementation');

console.log(`245850922 / 78256779 = ${245850922 / 78256779}`);

console.timeEnd('default implementation');

console.time('bigint');

console.log(`245850922 / 78256779 = ${245850922 / 78256779}`);

console.timeEnd('bigint');

console.time('manualCalculator');

console.log(
  `245850922 / 78256779 = ${calculator.division('245850922', '78256779')}`,
);

console.timeEnd('manualCalculator');

console.log('\nDoing it all again to check for hot/cold start:');

console.time('default implementation');

console.log(`245850922 / 78256779 = ${245850922 / 78256779}`);

console.timeEnd('default implementation');

console.time('bigint');

console.log(`245850922 / 78256779 = ${245850922 / 78256779}`);

console.timeEnd('bigint');

console.time('manualCalculator');

console.log(
  `245850922 / 78256779 = ${calculator.division('245850922', '78256779')}`,
);

console.timeEnd('manualCalculator');
