// 0123456789;
// --------15;
// 0617283945;
// 1234567890;
// ----------;
// 1851851835;
// 1851851835;

import { Sum } from './operations/sum/sum';

export function Multiplication(a: string, b: string): string {
  const toSum = [];

  for (let i = 0; i < b.length; i++) {
    const { current, carry } = a.split('')
      .reduceRight((acc, curr) => {
        const currentDigit = (
          (Number(curr) * Number(b[i])) + acc.carry
        ).toString().split(''); ///?

        acc.current = currentDigit.pop().concat(acc.current); ///?
        acc.carry = Number(currentDigit.join('')); ///?

        return acc;
      }, {
        current: '',
        carry: 0
      });

    const rightToLeftIndex = b.length - 1 - i; ///?
    const carryLeft = carry === 0 ? '' : carry.toString(); ///?
    const paddedValue = carryLeft.concat(
      current.concat('0'.repeat(rightToLeftIndex))
    ); ///?
    toSum.push(paddedValue);
  }

  console.log(toSum);
  return Sum(...toSum);
}

/*

          123456789
          123465789
          ---------
        01111111101
        09876543120
        86419752300
      0740740734000
      6172839450000
    049382715600000
    370370367000000
  02469135780000000
  12345678900000000
-------------------
  16141578750190521
*/

//'12345678900000000'
// '2469135780000000'
//  '370370367000000'
//   '49382715600000'
//    '6172839450000'
//     '740740734000'
//      '86419752300'
//       '9876543120'
//        '111111101'

// Sum(
//        '01111111101', '09876543120', '86419752300', '0740740734000', '6172839450000', '049382715600000', '370370367000000', '02469135780000000', '12345678900000000'
//     ); //?   