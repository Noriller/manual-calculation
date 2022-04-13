/**
 * Return true only if left is bigger than right
 */
export function leftIsBigger(left: string, right: string): boolean {
  if (left.length > right.length) {
    return true;
  } else if (left.length < right.length) {
    return false;
  } else {
    for (let i = 0; i < left.length; i++) {
      if (left[i] > right[i]) {
        return true;
      } else if (left[i] < right[i]) {
        return false;
      }
    }
  }
  return false;
}
/**
 * Return false only if left is bigger than right
 */
export function rightIsBigger(left: string, right: string): boolean {
  return !leftIsBigger(left, right);
}
