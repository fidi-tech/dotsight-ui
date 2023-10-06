export const modifyArrayLength = (array: any[], n: number, value: any) => {
  if (n < array.length) {
    return array.slice(0, n);
  } else if (n === array.length) {
    return array;
  } else {
    return [...array, ...(new Array(n - array.length)).fill(value)];
  }
}