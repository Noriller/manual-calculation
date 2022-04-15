# Manual Calculation

This is a calculator that works as we make calculations on pen and paper, in other words, it's a base 10 calculator.

- The biggest advantage of this is that we are not constrained by the number wrapping and binary rounding errors.
- The biggest disavantage is, of course, performance. (See the [Performance](#performance) section for more information.)

So, if you need to be sure that `0.1 + 0.2 == 0.3`, you can use this calculator. And of course, if you want to use numbers beyond what JS can handle, including with BigInt and especially with decimals, you can use this calculator.

## The API

Use your choice of package manager:

```bash
npm install @noriller/manual-calculator
```

```bash
yarn add @noriller/manual-calculator
```

Then import it with the syntax of your choice

```js
import ManualCalculator from '@noriller/manual-calculator'
```

```js
const ManualCalculator = require('@noriller/manual-calculator')
```

Finally, to actually use it:

```js
  const calculator = ManualCalculator();

  // with this syntax
  calculator.add('5', '5');
  calculator.subtract('5', '5');
  calculator.multiply('5', '5');
  calculator.divide('5', '5');

  // or this syntax
  calculator.sum('5', '5');
  calculator.subtraction('5', '5');
  calculator.multiplication('5', '5');
  calculator.division('5', '5');
```

Remember to always pass a string or else you'll get an error!

### Options

There's two options available:

```js
const calculator = ManualCalculator({
  // This is a boolean that determines if the numbers should be
  // formatted with a thousands separator (a underscore "_").
  // If this is set to false, the result will not be formatted.
  useHumanReadableNumbers: false; // default: false
  // This is the number of digits after the decimal point.
  // This applies only for the division operation.
  divisionDigits: 10; // default: 10
});
```

## Performance

If you want to use, then you probably want to know about the performance... well, I have bad news for you.

I've run tests using small numbers, BigInts and numbers beyond that with and without fractions.

The tests are in the `benchmark` folder and five runs are in the `benchmark/results` folder.

As you might expect, it's hard to have anything closer to binary implementation of a language. But if you keep running calculations on the same object, then you will see that the performance will get better than the first couple of runs, but still nowhere close to the performance of JS.

### Tests and infinite division

All the tests, except the infinite division one:

- 0.61s
- 0.56s
- 0.54s
- 0.54s
- 0.57s

Meanwhile, the infinite division tests:

- Infinite division with 500 digits

  - cold run: 125.314ms
  - warm run: 106.914ms

- Infinite division with 1000 digits

  - cold run: 441.896ms
  - warm run: 428.010ms

- Infinite division with 5k digits

  - cold run: 9.268s
  - warm run: 9.561s

- Infinite division with 10k digits

  - cold run: 39.165s
  - warm run: 42.506s

- Infinite division with 50k digits

  - cold run: 17m 14s 934ms
  - warm run: 19m 38s 936ms

Apparently there's some exponential growth in the division, but that should only be a bigger problem if you really need thousands of digits.

## There's a problem or it could be better

Either if you're encountered a problem: 😢 or if you're have an idea to make it better: 🤩

Feel free to contribute, to open issues, bug reports or just to say hello! 🤜🤛

In case of bugs or errors, if possible, send an example of the problem and what it should return.

I believe it should as precise as you can be with pen and paper, but then again, I couldn't test with all possible combinations.

Also, I'm not a matemathician... if you know a way to improve the performance, let me know!

## Work with me

<https://www.linkedin.com/in/noriller/>

### Hit me up at Discord

<https://discord.gg/XtNPk7HeCa>

### Or Donate

- [$5 Nice job! Keep it up.](https://www.paypal.com/donate/?business=VWNG7KZD9SS4S&no_recurring=0&currency_code=USD&amount=5)
- [$10 I really liked that, thank you!](https://www.paypal.com/donate/?business=VWNG7KZD9SS4S&no_recurring=0&currency_code=USD&amount=10)
- [$42 This is exactly what I was looking for.](https://www.paypal.com/donate/?business=VWNG7KZD9SS4S&no_recurring=0&currency_code=USD&amount=42)
- [$1K WOW. Did not know javascript could do that!](https://www.paypal.com/donate/?business=VWNG7KZD9SS4S&no_recurring=0&currency_code=USD&amount=1000)
- [$5K I need something done ASAP! Can you do it for yesterday?](https://www.paypal.com/donate/?business=VWNG7KZD9SS4S&no_recurring=0&currency_code=USD&amount=5000)
- [$10K Please consider this: quit your job and work with me!](https://www.paypal.com/donate/?business=VWNG7KZD9SS4S&no_recurring=0&currency_code=USD&amount=10000)
- [$??? Shut up and take my money!](https://www.paypal.com/donate/?business=VWNG7KZD9SS4S&no_recurring=0&currency_code=USD)

## That’s it! 👏
