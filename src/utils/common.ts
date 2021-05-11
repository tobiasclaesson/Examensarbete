import { IOption } from './types';

export function checkArrayForDuplicates(arr: IOption[]): boolean {
  const array: string[] = [];
  arr.forEach((a) => {
    array.push(a.title);
  });
  console.log(new Set(array).size !== array.length);

  return new Set(array).size !== array.length;
}
