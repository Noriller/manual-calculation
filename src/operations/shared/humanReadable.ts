/**
 * This adds a underscore ('_') as a thousands separator to the integer part of the number string.
 */
export function humanReadable(number: string) {
  const [integer, decimal] = number.split('.');
  return integer
    .replace(/\B(?=(\d{3})+(?!\d))/g, '_')
    .concat('.')
    .concat(decimal);
}
