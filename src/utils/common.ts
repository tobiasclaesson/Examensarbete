import { IOption } from './types';

export function checkArrayForDuplicates(arr: IOption[]): boolean {
  return new Set(arr).size !== arr.length;
}
